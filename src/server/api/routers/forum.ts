import type { ForumComment } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const forumRouter = createTRPCRouter({
  comments: createTRPCRouter({
    get: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input, ctx }) => {
        const result = await ctx.prisma.forumComment.findUnique({
          where: { id: input.id },
          include: {
            children: true,
            user: {
              select: {
                id: true,
                profileStep: {
                  select: {
                    username: true,
                    avatarSeed: true,
                  },
                },
              },
            },
          },
        });

        return result;
      }),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1).optional(),
          message: z.string().min(1),
          parentId: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const comment = await ctx.prisma.forumComment.create({
          data: {
            userId: ctx.session.user.id,
            ...input,
          },
        });

        return comment;
      }),

    getRootComments: protectedProcedure
      .input(
        z
          .object({
            forUser: z.boolean(),
          })
          .optional()
      )
      .query(async ({ ctx, input }) => {
        if (input?.forUser) {
          if (process.env.NODE_ENV === "production") {
            return [];
          }
          const comments = await ctx.prisma.$queryRaw`
          WITH RECURSIVE comment_tree AS (
              SELECT *
              FROM ForumComment
              WHERE userId = ${ctx.session.user.id}
              UNION ALL
              SELECT c1.*
              FROM ForumComment AS c1
                      JOIN comment_tree ON c1.id = comment_tree.parentId
          )
          SELECT DISTINCT *
          FROM comment_tree
          WHERE parentId IS NULL OR parentId = ''
          `;

          return comments as (ForumComment & { title: string })[];
        }
        const comments = await ctx.prisma.forumComment.findMany({
          where: {
            parentId: null,
          },
          include: {
            children: true,
            user: {
              select: {
                id: true,
                profileStep: {
                  select: {
                    username: true,
                    avatarSeed: true,
                  },
                },
              },
            },
          },
        });

        return comments;
      }),

    getRootCommentFor: protectedProcedure
      .input(z.object({ childId: z.string() }))
      .query(async ({ input, ctx }) => {
        ctx.prisma.$queryRaw`
          WITH RECURSIVE comment_tree AS (
            SELECT *
            FROM ForumComment
            WHERE id = ${input.childId}
            UNION ALL
            SELECT c1.*
            FROM ForumComment AS c1
                    JOIN comment_tree ON c1.id = comment_tree.parentId
        )
        SELECT *
        FROM comment_tree
      `;
      }),

    getChildren: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input, ctx }) => {
        const children = await ctx.prisma.forumComment.findMany({
          where: {
            parentId: input.id,
          },
          include: {
            children: false,
            user: {
              select: {
                id: true,
                profileStep: {
                  select: {
                    username: true,
                    avatarSeed: true,
                  },
                },
              },
            },
          },
        });

        return children;
      }),

    getChildrenBatch: protectedProcedure
      .input(
        z.object({
          parentId: z.string(),
          cursor: z.string().optional(),
          limit: z.number(),
          skip: z.number().optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        const { limit, skip, parentId, cursor } = input;

        const items = await ctx.prisma.forumComment.findMany({
          take: limit + 1,
          skip: skip,
          cursor: cursor ? { id: cursor } : undefined,
          orderBy: {
            createdAt: "desc",
          },
          where: {
            parentId,
          },
        });
        let nextCursor: typeof cursor | undefined = undefined;
        if (items.length > limit) {
          const nextItem = items.pop(); // return the last item from the array
          nextCursor = nextItem?.id;
        }
        return {
          items,
          nextCursor,
        };
      }),
  }),
});

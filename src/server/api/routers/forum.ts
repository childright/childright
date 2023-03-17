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
            _count: {
              select: {
                children: true,
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

    getRootComments: protectedProcedure.query(async ({ ctx }) => {
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

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

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

        if (!result?.user?.profileStep?.avatarSeed) {
          console.log("error");
          throw new TRPCError({ code: "BAD_REQUEST" });
        }

        return { ...result };
      }),
    create: protectedProcedure
      .input(
        z.object({
          message: z.string(),
          parentId: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const comment = await ctx.prisma.forumComment.create({
          data: {
            message: input.message,
            parentId: input.parentId,
            userId: ctx.session.user.id,
          },
        });

        return comment;
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
  }),
});

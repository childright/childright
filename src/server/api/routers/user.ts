import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(({ ctx }) => {
    if (!ctx.session?.user) {
      throw new Error("User not found");
    }
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input.id },
      });
    }),
});

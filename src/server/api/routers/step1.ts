import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const step1Router = createTRPCRouter({
  save: protectedProcedure
    .input(
      z
        .object({
          isParent: z.boolean(),
          birthDate: z.date().optional(),
        })
        .refine((schema) => {
          if (!schema.isParent) {
            return schema.birthDate !== undefined;
          } else {
            return true;
          }
        })
    )
    .mutation(({ input, ctx }) => {
      if (!ctx.session?.user) {
        throw new Error("User not found");
      }

      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          step1Data: {
            create: {
              isParent: input.isParent,
              birthDate: input.birthDate,
            },
          },
        },
      });
    }),
});

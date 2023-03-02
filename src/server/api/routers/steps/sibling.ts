import {
  Degree,
  EducationSituation,
  Income,
  LivingSituation,
} from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const siblingRouter = createTRPCRouter({
  save: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        birthDate: z.date(),
        address: z.string(),
        education: z.nativeEnum(EducationSituation),
        livingSituation: z.nativeEnum(LivingSituation),
        degree: z.nativeEnum(Degree),
        income: z.nativeEnum(Income),
        incomeAmount: z.number().positive(),
        avatarSeed: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { session, prisma } }) => {
      console.log(input);
      await prisma.siblingData.create({
        data: {
          ...input,
          userId: session.user.id,
        },
      });
    }),
});

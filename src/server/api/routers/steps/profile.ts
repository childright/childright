import {
  Degree,
  EducationSituation,
  FamilyState,
  Income,
  LivingSituation,
} from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const profileRouter = createTRPCRouter({
  save: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        birthDate: z.date(),
        address: z.string(),
        education: z.nativeEnum(EducationSituation),
        livingSituation: z.nativeEnum(LivingSituation),
        familyState: z.nativeEnum(FamilyState),
        degree: z.nativeEnum(Degree),
        ownIncome: z.nativeEnum(Income),
        ownIncomeAmount: z.number().min(0),
        avatarSeed: z.string(),
        coachAvatarSeed: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { session, prisma } }) => {
      console.log(input);
      await prisma.profileStepData.create({
        data: {
          ...input,
          userId: session.user.id,
        },
      });
    }),
  get: protectedProcedure.query(async ({ ctx: { session, prisma } }) => {
    const data = await prisma.profileStepData.findFirst({
      where: {
        userId: session.user.id,
      },
    });
    return data;
  }),
});

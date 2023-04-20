import { Degree, FamilyState, Income, LivingSituation } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const motherRouter = createTRPCRouter({
  save: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        birthDate: z.date(),
        address: z.string(),
        livingSituation: z.nativeEnum(LivingSituation),
        familyState: z.nativeEnum(FamilyState),
        degree: z.nativeEnum(Degree),
        income: z.nativeEnum(Income),
        incomeAmount: z.number().positive(),
        avatarSeed: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { session, prisma } }) => {
      console.log(input);
      await prisma.parentData.create({
        data: {
          ...input,
          motherOf: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
    }),
  get: protectedProcedure.query(async ({ ctx: { session, prisma } }) => {
    const data = await prisma.parentData.findFirst({
      where: {
        motherOf: {
          some: {
            id: session.user.id,
          },
        },
      },
    });
    return data;
  }),
});

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import calculatorStepResult from "../../../../shared/calculatorStepResult";

export const calculatorRouter = createTRPCRouter({
  save: protectedProcedure
    .input(
      z.object({
        parentsNetIncome: z.number().int(),
        kreditRates: z.number().int(),
        children0to5: z.number().int(),
        children6to13: z.number().int(),
        children14to17: z.number().int(),
        childrenAbove18: z.number().int(),
      })
    )
    .mutation(async ({ input, ctx: { session, prisma } }) => {
      console.log(input);
      await prisma.calculatorStepData.create({
        data: {
          ...input,
          claimAmountResult: calculatorStepResult(input),
          userId: session.user.id,
        },
      });
    }),
  get: protectedProcedure.query(async ({ ctx: { session, prisma } }) => {
    const data = await prisma.calculatorStepData.findFirst({
      where: {
        userId: session.user.id,
      },
    });
    return data;
  }),
});

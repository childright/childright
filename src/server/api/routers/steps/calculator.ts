import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import calculatorStepResult from "../../../../shared/calculatorStepResult";

export const calculatorRouter = createTRPCRouter({
  save: protectedProcedure
    .input(
      z.object({
        parentsNetIncome: z.number().positive().int(),
        kreditRates: z.number().positive().int(),
        children0to5: z.number().positive().int(),
        children6to13: z.number().positive().int(),
        children14to17: z.number().positive().int(),
        childrenAbove18: z.number().positive().int(),
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
});

import { appRouter } from "../../../root";
import { expect, test } from "vitest";
import { prisma } from "../../../../db";
import type { Session } from "next-auth";

test("calculator step validation", async () => {
  const mockSession: Session = {
    expires: new Date().toISOString(),
    user: { id: "test-user-id", name: "Test User" },
  };

  const caller = appRouter.createCaller({
    session: mockSession,
    prisma: prisma,
  });

  const promise = caller.steps.calculator.save({
    parentsNetIncome: 1,
    kreditRates: 1,
    children0to5: 1,
    children6to13: 1,
    children14to17: 1,
    childrenAbove18: 1.5,
  });

  expect(promise).rejects.toThrow();
});

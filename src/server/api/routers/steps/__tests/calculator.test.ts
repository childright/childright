import { appRouter } from "../../../root";
import { beforeEach, expect, test } from "vitest";
import type { Session } from "next-auth";
import type { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "vitest-mock-extended";

const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});

// Arrange
test("calculator step validation", async () => {
  const mockSession: Session = {
    expires: new Date().toISOString(),
    user: { id: "test-user-id", name: "Test User" },
  };

  const caller = appRouter.createCaller({
    session: mockSession,
    prisma: prismaMock,
  });

  // Act
  const promise = caller.steps.calculator.save({
    parentsNetIncome: 1,
    kreditRates: 1,
    children0to5: 1,
    children6to13: 1,
    children14to17: 1,
    childrenAbove18: 1.6,
  });

  // Assert
  await expect(promise).rejects.toThrowError(/invalid_type/);
});

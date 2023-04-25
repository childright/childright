import { appRouter } from "../../../root";
import { beforeEach, expect, test } from "vitest";
import type { Session } from "next-auth";
import type { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { LivingSituation, FamilyState, Degree, Income } from "@prisma/client";
import LoggerPublisher from "../../../../../utils/logging/LoggerPublisher";
import { s3 } from "../../../../s3";

const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});

// Arrange
test("father step validation", async () => {
  const mockSession: Session = {
    expires: new Date().toISOString(),
    user: { id: "test-user-id", name: "Test User" },
  };

  const caller = appRouter.createCaller({
    session: mockSession,
    prisma: prismaMock,
    s3: s3,
    loggerPublisher: new LoggerPublisher(),
  });

  // Act
  const promise = caller.steps.father.save({
    name: "Test User",
    birthDate: new Date(),
    address: "Test Address",
    livingSituation: LivingSituation.alone,
    familyState: FamilyState.married,
    degree: Degree.none,
    income: Income.none,
    incomeAmount: -1,
    avatarSeed: "Test Avatar Seed",
  });

  // Assert
  await expect(promise).rejects.toThrowError(/too_small/);
});

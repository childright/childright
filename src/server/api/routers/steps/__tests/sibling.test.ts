import { appRouter } from "../../../root";
import { beforeEach, expect, test } from "vitest";
import type { Session } from "next-auth";
import type { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "vitest-mock-extended";
import {
  LivingSituation,
  EducationSituation,
  Degree,
  Income,
} from "@prisma/client";
import { s3 } from "../../../../s3";
import LoggerPublisher from "../../../../../utils/logging/LoggerPublisher";

const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});

// Arrange
test("sibling step validation", async () => {
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
  const promise = caller.steps.sibling.save({
    name: "Test User",
    birthDate: new Date(),
    address: "Test Address",
    education: EducationSituation.studying,
    livingSituation: LivingSituation.withParents,
    degree: Degree.master,
    income: Income.none,
    incomeAmount: -1,
    avatarSeed: "Test Avatar Seed",
  });

  // Assert
  await expect(promise).rejects.toThrowError(/too_small/);
});

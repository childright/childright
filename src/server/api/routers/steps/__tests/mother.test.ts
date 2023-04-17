import { appRouter } from "../../../root";
import { beforeEach, expect, test } from "vitest";
import type { Session } from "next-auth";
import type { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { LivingSituation, FamilyState, Degree, Income } from "@prisma/client";

const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});

// Arrange
test("Mother step validation", async () => {
  const mockSession: Session = {
    expires: new Date().toISOString(),
    user: { id: "test-user-id", name: "Test User" },
  };

  const caller = appRouter.createCaller({
    session: mockSession,
    prisma: prismaMock,
  });

  // Act
  const promise = caller.steps.mother.save({
    name: "Test User",
    birthDate: new Date(),
    address: "Test Address",
    livingSituation: LivingSituation.withPartner,
    familyState: FamilyState.single,
    degree: Degree.hauptschule,
    income: Income.work,
    incomeAmount: -1,
    avatarSeed: "Test Avatar Seed",
  });

  // Assert
  await expect(promise).rejects.toThrowError(/too_small/);
});

import { appRouter } from "../../../root";
import { beforeEach, expect, test } from "vitest";
import type { Session } from "next-auth";
import type { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "vitest-mock-extended";
import {
  LivingSituation,
  FamilyState,
  Degree,
  Income,
  EducationSituation,
} from "@prisma/client";

const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});

// Arrange
test("Profile step validation", async () => {
  const mockSession: Session = {
    expires: new Date().toISOString(),
    user: { id: "test-user-id", name: "Test User" },
  };

  const caller = appRouter.createCaller({
    session: mockSession,
    prisma: prismaMock,
  });

  // Act
  const promise = caller.steps.profile.save({
    name: "Test User",
    username: "Test User",
    birthDate: new Date(),
    address: "Test Address",
    education: EducationSituation.searching,
    livingSituation: LivingSituation.withChildren,
    familyState: FamilyState.divorced,
    degree: Degree.realschule,
    ownIncome: Income.other,
    ownIncomeAmount: 0,
    avatarSeed: "Test Avatar Seed",
    coachAvatarSeed: "Test Avatar Seed",
  });

  // Assert
  await expect(promise).rejects.toThrowError(/too_small/);
});

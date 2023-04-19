import { expect, test, beforeEach } from "vitest";
import { appRouter } from "../../../root";
import { Session } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "vitest-mock-extended";

const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});

test("forumRouter handles error for invalid comment id when retrieving a comment", async () => {
  // Arrange
  const mockSession: Session = {
    expires: new Date().toISOString(),
    user: undefined,
  };

  const caller = appRouter.createCaller({
    session: mockSession,
    prisma: prismaMock,
  });

  // Act
  const promise = caller.forum.comments.get({ id: "invalid-comment-id" });

  // Assert
  await expect(promise).rejects.toThrowError();
});

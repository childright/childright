import { expect, test, beforeEach } from "vitest";
import { appRouter } from "../../../root";
import type { Session } from "next-auth";
import type { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "vitest-mock-extended";
import LoggerPublisher from "../../../../../utils/logging/LoggerPublisher";
import { s3 } from "../../../../s3";

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
    s3: s3,
    loggerPublisher: new LoggerPublisher(),
  });

  // Act
  const promise = caller.forum.comments.get({ id: "invalid-comment-id" });

  // Assert
  await expect(promise).rejects.toThrowError();
});

import { appRouter } from "../../../root";
import { expect, test, beforeEach } from "vitest";
import type { Session } from "next-auth";
import { mockDeep, mockReset } from "vitest-mock-extended";
import type { PrismaClient } from "@prisma/client";
import LoggerPublisher from "../../../../../utils/logging/LoggerPublisher";
import { s3 } from "../../../../s3";

const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});

// Arrange
test("forumRouter getRootComments returns expected result", async () => {
  const mockSession: Session = {
    expires: new Date().toISOString(),
    user: { id: "test-user-id", name: "Test User" },
  };

  const mockOutput = [
    {
      id: "test-comment-id",
      title: "Test Comment title",
      message: "Test Comment message",
      text: "Test Comment",
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "test-user-id",
      upvotes: 0,
      userId: "test-user-id",
      parentId: null,
    },
  ];

  prismaMock.forumComment.findMany.mockResolvedValue(mockOutput);

  const caller = appRouter.createCaller({
    session: mockSession,
    prisma: prismaMock,
    s3: s3,
    loggerPublisher: new LoggerPublisher(),
  });

  // Act
  const result = await caller.forum.comments["getRootComments"]();

  // Assert
  expect(result).toEqual(mockOutput);
});

import { Session } from "next-auth";
import { expect, test, beforeEach } from "vitest";
import { appRouter } from "../../../root";
import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { s3 } from "../../../../s3";
import LoggerPublisher from "../../../../../utils/logging/LoggerPublisher";

const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});

test("forumRouter gets comment and returns valid result", async () => {
  // Arange
  const mockSession: Session = {
    expires: new Date().toISOString(),
    user: { id: "test-user-id", name: "Test User" },
  };

  const mockForumComment = {
    id: "test-comment-id",
    text: "test comment text",
    title: "test-title",
    message: "test-message",
    createdAt: "",
    upvotes: "",
    updatedAt: "",
    userId: "",
    parentId: "",
    children: [],
    user: {
      id: "test-user-id",
      profileStep: {
        username: "test-username",
        avatarSeed: "test-avatar-seed",
      },
    },
  };

  const caller = appRouter.createCaller({
    session: mockSession,
    prisma: prismaMock,
    s3: s3,
    loggerPublisher: new LoggerPublisher(),
  });

  prismaMock.forumComment.findUnique.mockResolvedValueOnce(mockForumComment);

  // Act
  const result = await caller.forum.comments.get({ id: "test-comment-id" });

  console.log(result);

  // Assert
  expect(result).toEqual(mockForumComment);
});

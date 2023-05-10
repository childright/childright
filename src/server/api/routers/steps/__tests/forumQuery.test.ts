import { ForumComment, PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { expect, test, beforeEach } from "vitest";
import { appRouter } from "../../../root";
import { Query, QueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";

const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  prismaMock.forumComment.findUnique.mockReset();
});

const mockSession: Session = {
  expires: new Date().toISOString(),
  user: { id: "test-user-id", name: "Test User" },
};

test("queryComment retrieves comment and related data from database", async () => {
  // Arrange
  const expectedComment: ForumComment = {
    id: "test-comment-id",
    title: "Test comment",
    message: "Test message",
    upvotes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "test-user-id",
    parentId: "test-parent-id",
  };

  prismaMock.forumComment.findUnique.mockResolvedValueOnce(expectedComment);

  // Act
  const caller = appRouter.createCaller({
    session: mockSession,
    prisma: prismaMock,
    s3: null as any,
    loggerPublisher: null as any,
  });

  const result = await caller.forum.comments.get({ id: "test-comment-id" });

  // Assert
  expect(result).toEqual(expectedComment);
  expect(prismaMock.forumComment.findUnique).toHaveBeenLastCalledWith({
    where: { id: "test-comment-id" },
    include: {
      children: true,
      user: {
        select: {
          id: true,
          profileStep: {
            select: {
              avatarSeed: true,
              username: true,
            },
          },
        },
      },
    },
  });
});

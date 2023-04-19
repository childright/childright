import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { expect, test, beforeEach } from "vitest";
import { appRouter } from "../../../root";

const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  prismaMock.comment.findUnique.mockReset();
});

test("queryComment retrieves comment and related data from database", async () => {
  // Arrange
  const expectedComment = {
    id: "test-comment-id",
    text: "Test Comment",
    author: { id: "test-user-id", name: "Test User" },
    post: { id: "test-post-id", title: "Test post" },
  };

  prismaMock.comment.findUnique.mockResolvedValueOnce(expectedComment);

  // Act
  const result = await queryComment("test-comment-id", prismaMock);

  // Assert
  expect(result).toEqual(expectedComment);
  expect(prismaMock.comment.findUnique).toHaveBeenLastCalledWith({
    where: { id: "test-comment-id" },
    include: { author: true, post: true },
  });
});

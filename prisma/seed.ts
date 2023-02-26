import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seed = async () => {
  await seedForum();
};

const seedForum = async () => {
  const exampleUser = await prisma.user.create({
    data: {
      name: "Example User",
      email: "example@user.de",
    },
  });

  const comment = await prisma.forumComment.create({
    data: {
      message: "This is a comment",
      userId: exampleUser.id,
    },
  });

  await prisma.forumComment.create({
    data: {
      message: "This is a subcomment",
      userId: exampleUser.id,
      parentId: comment.id,
    },
  });
};

void seed();

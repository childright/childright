import type { ChatMessage } from "@prisma/client";
import { z } from "zod";
import { pusherServerClient } from "../../pusher";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import superjson from "superjson";

const channel = (fromId: string, toId: string) =>
  `chat-from-${fromId}-to-${toId}`;

export const chatRouter = createTRPCRouter({
  getMessagesWithUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const messages = await ctx.prisma.chatMessage.findMany({
        where: {
          OR: [
            { fromId: ctx.session?.user?.id, toId: input.userId },
            { fromId: input.userId, toId: ctx.session?.user?.id },
          ],
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return messages;
    }),
  getChats: protectedProcedure.query(async ({ ctx }) => {
    const chats = await ctx.prisma.$queryRaw`
    SELECT cm1.*, u1.name as fromName, u2.name as toName
    FROM ChatMessage cm1
            INNER JOIN (
        SELECT MAX(createdAt) AS latest_createdAt,
            CASE
                WHEN fromId < toId THEN CONCAT(fromId, '-', toId)
                ELSE CONCAT(toId, '-', fromId)
                END AS chat_id
        FROM ChatMessage
        WHERE fromId = ${ctx.session.user.id} OR toId = ${ctx.session.user.id}
        GROUP BY chat_id
    ) cm2 ON cm1.createdAt = cm2.latest_createdAt
        AND CASE
                WHEN cm1.fromId < cm1.toId THEN CONCAT(cm1.fromId, '-', cm1.toId)
                ELSE CONCAT(cm1.toId, '-', cm1.fromId)
                END = cm2.chat_id
            LEFT JOIN User u1 ON cm1.fromId = u1.id
            LEFT JOIN User u2 ON cm1.toId = u2.id;
  `;

    return chats as (ChatMessage & { fromName: string; toName: string })[];
  }),
  sendMessage: protectedProcedure
    .input(z.object({ toId: z.string(), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const message = await ctx.prisma.chatMessage.create({
        data: {
          fromId: ctx.session.user.id,
          toId: input.toId,
          content: input.content,
        },
      });

      const stringified = superjson.stringify(message);
      console.log(stringified);

      pusherServerClient.sendToUser(input.toId, "newMessage", stringified);
    }),
});

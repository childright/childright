import { NextLink } from "@mantine/next";
import type { inferRouterOutputs } from "@trpc/server";
import { useSession } from "next-auth/react";
import type { AppRouter } from "../server/api/root";

type Props = {
  chat: inferRouterOutputs<AppRouter>["chat"]["getChats"][0];
};

const ChatPreview = ({ chat }: Props) => {
  const session = useSession();

  return (
    <div
      key={chat.id}
      className="mb-1 rounded border border-solid border-purple-300 p-1"
    >
      <h3 className="my-0">
        <NextLink
          legacyBehavior
          href={`/chat/${
            chat.fromId === session.data?.user?.id ? chat.toId : chat.fromId
          }`}
        >
          {chat.fromId === session.data?.user?.id ? chat.toName : chat.fromName}
        </NextLink>
      </h3>
      <span>
        {chat.fromId === session.data?.user?.id ? "You" : chat.fromName} wrote
      </span>
      <span>
        <b> {chat.content}</b>
      </span>
      <span> at {chat.createdAt.toLocaleString()} </span>
    </div>
  );
};

export default ChatPreview;

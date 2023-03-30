import { type NextPage } from "next";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../server/api/root";
import { NextLink } from "@mantine/next";

const ChatIndexPage: NextPage = () => {
  const getChatsQuery = api.chat.getChats.useQuery();
  return (
    <div>
      {getChatsQuery.data?.map((chat) => (
        <ChatPreview key={chat.id} chat={chat} />
      ))}
    </div>
  );
};

type Props = {
  chat: inferRouterOutputs<AppRouter>["chat"]["getChats"][0];
};

const ChatPreview = ({ chat }: Props) => {
  const session = useSession();

  return (
    <div key={chat.id}>
      <h3>
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

export default ChatIndexPage;

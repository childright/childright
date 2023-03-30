import { type NextPage } from "next";
import { api } from "../utils/api";
import Message from "../components/Message";
import { useSession } from "next-auth/react";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "../server/api/root";

const ChatPage: NextPage = () => {
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
        {chat.fromId === session.data?.user?.id ? chat.toName : chat.fromName}
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

export default ChatPage;

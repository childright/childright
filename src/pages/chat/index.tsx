import { type NextPage } from "next";
import { api } from "../../utils/api";
import ChatPreview from "../../ui/ChatPreview";

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

export default ChatIndexPage;

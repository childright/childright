import { type NextPage } from "next";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Message from "../../components/Message";
import ChatBox from "../../components/ChatBox";
import { useEffect } from "react";
import { pusherClient } from "../../utils/pusher";
import type { ChatMessage } from "@prisma/client";
import superjson from "superjson";

const ChatPage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  if (typeof userId !== "string") {
    return <div>Invalid userId</div>;
  }

  return <Chat userId={userId} />;
};

type Props = {
  userId: string;
};

const Chat = ({ userId }: Props) => {
  const utils = api.useContext();
  const session = useSession();

  const getMessagesQuery = api.chat.getMessagesWithUser.useQuery({ userId });

  const sendMessageMutation = api.chat.sendMessage.useMutation({
    onSuccess: () => utils.chat.getMessagesWithUser.invalidate({ userId }),
  });

  useEffect(() => {
    pusherClient.user.bind("newMessage", (newMessage: string) => {
      console.log(newMessage);
      const parsed = superjson.parse<ChatMessage>(JSON.stringify(newMessage));
      console.log({ parsed });
      utils.chat.getMessagesWithUser.setData({ userId }, (data) =>
        data ? [...data, parsed] : [parsed]
      );
    });
    return () => {
      pusherClient.user.unbind("newMessage");
    };
  });

  if (!session.data?.user?.id) {
    return <div>Not logged in</div>;
  }

  const handleSubmit = async (message: string) => {
    await sendMessageMutation.mutateAsync({
      content: message,
      toId: userId,
    });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="mb-6">
        {getMessagesQuery.data?.map((message) => (
          <Message
            key={message.id}
            message={message}
            own={message.fromId === session.data.user?.id}
          />
        ))}
      </div>

      <ChatBox onSubmit={handleSubmit} />
    </div>
  );
};

export default ChatPage;

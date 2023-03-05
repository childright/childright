import { Button, Loader, Textarea } from "@mantine/core";
import type { NextPage } from "next";
import type { FC } from "react";
import { useState } from "react";
import { api } from "../utils/api";

const ChatbotPage: NextPage = () => {
  return <ChatBot />;
};

const ChatBot: FC = () => {
  const [question, setQuestion] = useState("");
  const query = api.chatbot.respond.useQuery({ question }, { enabled: false });

  return (
    <div className="flex flex-col md:w-1/4">
      <Textarea
        autosize
        minRows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Button onClick={() => query.refetch()} type="button">
        Send
      </Button>
      {query.isFetching ? <Loader /> : <p>{query.data}</p>}
    </div>
  );
};

export default ChatbotPage;

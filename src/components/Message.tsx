import type { ChatMessage } from "@prisma/client";
import React from "react";

type Props = {
  message: ChatMessage;
  own: boolean;
};

const Message = ({ message, own }: Props) => {
  return (
    <div
      key={message.id}
      className={`my-1 flex w-full ${own ? "justify-end" : "justify-start"} `}
    >
      <div
        className={` rounded-full px-4 ${
          own ? " align-self-end  bg-blue-400 text-right" : "bg-green-400"
        }`}
      >
        <div>{message.content}</div>
        <div>{message.createdAt.toLocaleDateString()}</div>
      </div>
    </div>
  );
};

export default Message;

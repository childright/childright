import type { ChatMessage } from "@prisma/client";
import React from "react";

type Props = {
  message: ChatMessage;
};

const Message = ({ message }: Props) => {
  return (
    <div key={message.id}>
      <div>{message.content}</div>
      <div>{message.createdAt.toLocaleDateString()}</div>
    </div>
  );
};

export default Message;

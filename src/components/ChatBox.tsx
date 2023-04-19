import { Button, TextInput } from "@mantine/core";
import React, { useState } from "react";

type Props = {
  onSubmit: (message: string) => void;
};

const ChatBox = ({ onSubmit }: Props) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    onSubmit(message);
    setMessage("");
  };

  return (
    <div className="fixed left-0 bottom-0 flex w-full bg-white px-5">
      <TextInput
        className="flex-1"
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <Button onClick={handleSubmit}>Send</Button>
    </div>
  );
};

export default ChatBox;

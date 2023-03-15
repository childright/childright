import { Button, Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useState } from "react";

type Props = {
  title: string;
  subtitle: string;
  content: string;
  footer?: string;
};

const MessageTemplateCard = ({ title, content, subtitle }: Props) => {
  const [modalOpen, setModalOpened] = useState(false);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(
      () => {
        showNotification({
          title: "Erfolg",
          message: "Der Vorlagentext wurde in deine Zwischenablage kopiert",
        });
      },
      () => {
        showNotification({
          title: "Fehler",
          message:
            "Der Vorlagentext konnte nicht kopiert werden. Bitte überprüfe deine Browser-Einstellungen.",
        });
      }
    );
  };

  return (
    <>
      <div
        className="block h-full w-full max-w-sm cursor-pointer gap-10 text-ellipsis break-words rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100"
        onClick={() => setModalOpened(true)}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <h5 className="mb-2 text-base font-bold tracking-tight text-gray-500">
          {subtitle}
        </h5>
        <p className=" text-base text-gray-700 line-clamp-4 dark:text-gray-400">
          {content}
        </p>
      </div>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpened(false)}
        title={title}
      >
        {content}
        <Button onClick={() => copyToClipboard(content)}>Kopieren</Button>
      </Modal>
    </>
  );
};

export default MessageTemplateCard;

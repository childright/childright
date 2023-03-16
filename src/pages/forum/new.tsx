import { Button, Textarea, TextInput, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import type { NextPage } from "next";
import React from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

const NewPostPage: NextPage = () => {
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");

  const submitMutation = api.forum.comments.create.useMutation();

  const router = useRouter();

  return (
    <div className="mb-4 flex py-2 px-4">
      <div className="flex-1">
        <Title order={3} className="mb-2">
          Neuer Beitrag
        </Title>
        <TextInput
          label="Titel"
          placeholder="Meine Erfahrung mit ChildRight..."
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          className="mb-1"
        />
        <Textarea
          id="comment"
          rows={6}
          className="mb-4"
          label="Message"
          placeholder="Schreibe einen neuen Beitrag.."
          required
          withAsterisk={false}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
        <Button
          disabled={message.length === 0}
          onClick={() => {
            submitMutation.mutateAsync(
              { title, message },
              {
                onSuccess: (data) => {
                  showNotification({
                    title: "Erfolg",
                    color: "green",
                    message:
                      "Dein Beitrag wurde erfolgreich erstellt. Du kannst ihn nun im Forum finden.",
                  });
                  router.push(`/forum/${data.id}`);
                },
                onError: () => {
                  showNotification({
                    title: "Fehler",
                    color: "red",
                    message:
                      "Dein Beitrag konnte nicht erstellt werden. Bitte versuche es später erneut.",
                  });
                },
              }
            );
          }}
        >
          Abschicken
        </Button>
      </div>
    </div>
  );
};

export default NewPostPage;

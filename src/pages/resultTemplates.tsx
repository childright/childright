import { Button, Modal } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { type NextPage } from "next";

import StepperLayout from "../ui/StepperLayout";
import MessageTemplateCard from "../components/MessageTemplateCard";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const sampleData = [
  {
    title: "Vorlage 1: ",
    subtitle: "Für das persönliche Gespräch mit deinen Eltern",
    content:
      "Hallo, ich bin der Text der Vorlage 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl.",
  },
  {
    title: "Vorlage 2: ",
    subtitle:
      "Schriftliche Vorlage, wenn du das persönlich Gespräch mit deiner Mutter vermeiden möchtest",
    content:
      "Hallo, ich bin der Text der Vorlage 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl.",
  },
  {
    title: "Vorlage 3: ",
    subtitle:
      "Schriftliche Vorlage, wenn du das persönlich Gespräch mit deinem Vater vermeiden möchtest",
    content:
      "Hallo, ich bin der Text der Vorlage 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl.",
  },
  {
    title: "Vorlage 4: ",
    subtitle:
      "Schriftliche Vorlage, wenn du deine Geschwister informieren möchtest",
    content:
      "Hallo, ich bin der Text der Vorlage 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl.",
  },
];

const TemplatesPage: NextPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  if (sessionStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <>
      <StepperLayout>
        <h1 className="text-2xl font-bold">Nutze diese Vorlagen als Hilfe!</h1>
        <div className="grid grid-cols-1 place-items-center gap-4 lg:grid-cols-2">
          {sampleData.map((data) => (
            <MessageTemplateCard key={data.title} {...data} />
          ))}
        </div>
        <Button className="mt-2" onClick={open}>
          Weiter
        </Button>
      </StepperLayout>

      <Modal opened={opened} onClose={close} title="Authentication" centered>
        <div className="flex flex-col gap-2">
          <Button component={NextLink} href="/noReaction" legacyBehavior>
            Keine Reaktion
          </Button>
          <Button component={NextLink} href="/positiveReaction" legacyBehavior>
            Positive Reaktion
          </Button>
          <Button component={NextLink} href="/negativeReaction" legacyBehavior>
            Negative Reaktion
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default TemplatesPage;

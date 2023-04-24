import { type NextPage } from "next";
import StepperLayout from "../ui/StepperLayout";
import MessageTemplateCard from "../components/MessageTemplateCard";
import { useDisclosure } from "@mantine/hooks";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import ZuCommunity from "../ui/ZurCommunity";
import WizardComment from "../ui/WizardComment";
import { Button } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useRedirectUnauthenticated from "../hooks/useAuth";

const sampleData = [
  {
    title: "Vorlage",
    subtitle: "Für eine Termin vereinbarung und Unterhaltszahlung",
    content:
      "Schriftliche Vorlage, den Unterhaötspflichtigen aufzufordern zum Jugendamt tu gehen und die Unterhaltsverpflichtung beurkunden zu lassen",
    footer: "Bitte überweise mir den Betrag XY€ auf das folgende Konto:",
  },
];

const PositiveReactionPage: NextPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  useRedirectUnauthenticated();

  return (
    <>
      <StepperLayout>
        <h1 className="mb-4 text-center">
          Nutze diese Vorlage um deinen Anspruch einzufordern!
        </h1>
        <div className="flex flex-1 justify-center">
          {sampleData.map((data) => (
            <MessageTemplateCard key={data.title} {...data} />
          ))}
          <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
          {""}
        </div>
        <div className="mt-20 grid grid-cols-2 gap-10">
          {" "}
          <ZuCommunity />
          <WizardComment text="Schreibe eine Nachricht um deinen theoretischen Anpsruch einzuholen" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignContent: "flex-end",
          }}
        >
          <Button component={NextLink} href="/longTermBinding" legacyBehavior>
            Weiter
          </Button>
        </div>
      </StepperLayout>
    </>
  );
};

export default PositiveReactionPage;

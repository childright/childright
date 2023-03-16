import { type NextPage } from "next";
import StepperLayout from "../ui/StepperLayout";
import MessageTemplateCard from "../components/MessageTemplateCard";
import { useDisclosure } from "@mantine/hooks";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import ZuCommunity from "../ui/ZurCommunity";
import WizardComment from "../ui/WizardComment";

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

  return (
    <>
      <StepperLayout>
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
          <WizardComment text="Positiv" />
        </div>
      </StepperLayout>
      ;
    </>
  );
};

export default PositiveReactionPage;

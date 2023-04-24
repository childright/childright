import { type NextPage } from "next";
import StepperLayout from "../ui/StepperLayout";
import MessageTemplateCard from "../components/MessageTemplateCard";
import { useDisclosure } from "@mantine/hooks";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import ZuCommunity from "../ui/ZurCommunity";
import WizardComment from "../ui/WizardComment";
import { Button } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

const sampleData = [
  {
    title: "Vorlage",
    subtitle: "Bleib im Kontakt + Bedankung",
    content:
      "Hallo, ich bin der Text der Vorlage 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquet nisl, eu aliquam nisl nunc sit amet nisl.",
  },
];

const LongTermBinding: NextPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  useAuth();

  return (
    <>
      <StepperLayout>
        <h1 className="mb-4 text-center">Langzeit Bindung nach Erfolg</h1>
        <div className="grid grid-flow-col grid-cols-2 grid-rows-4">
          <div className="">
            <h4>
              Kindergeld Updates {""}
              <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
            </h4>
          </div>
          <div>
            <h4>
              Düsseldorfer Tabelle Updates {""}
              <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
            </h4>
          </div>
          <div>
            <h4>
              Eigene Lebenssituation Updates
              <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
            </h4>
          </div>
          <div>
            <h4>
              Zahlungsaussfälle Updates
              <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
            </h4>
          </div>
          <div className="">
            {sampleData.map((data) => (
              <MessageTemplateCard key={data.title} {...data} />
            ))}
            <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
            {""}
          </div>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-10">
          {" "}
          <ZuCommunity />
          <WizardComment text="Bleibe auf dem laufenden und schaue regelmäßig in dein E-Mail Postfach!" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignContent: "flex-end",
          }}
        >
          <Button>
            <a href="mailto:markwittauto@childrigh.eu">Send Email</a>
          </Button>
        </div>
      </StepperLayout>
    </>
  );
};

export default LongTermBinding;

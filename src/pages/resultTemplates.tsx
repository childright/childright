import { Button } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { type NextPage } from "next";

import StepperLayout from "../ui/StepperLayout";
import MessageTemplateCard from "../components/MessageTemplateCard";

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
  return (
    <StepperLayout>
      <div className="grid grid-cols-1 place-items-center gap-4 lg:grid-cols-2">
        {sampleData.map((data) => (
          <MessageTemplateCard key={data.title} {...data} />
        ))}
      </div>
      <Button
        component={NextLink}
        href="/resultTemplates"
        legacyBehavior
        className="mt-2"
      >
        Weiter
      </Button>
    </StepperLayout>
  );
};

export default TemplatesPage;

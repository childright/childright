import { type NextPage } from "next";
import StepperLayout from "../ui/StepperLayout";
import WizardComment from "../ui/WizardComment";
import ZuCommunity from "../ui/ZurCommunity";
import {
  ArrowUpIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Dropzone } from "@mantine/dropzone";
import { Button, FileButton } from "@mantine/core";
import { useState } from "react";

const positivereaktion: NextPage = () => {
  return (
    <StepperLayout>
      <DocumentUploadSection />
    </StepperLayout>
  );
};

export default positivereaktion;

const DocumentUploadSection = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <h1 className="mb-4 text-center">Auskunft Positiv</h1>
      <h3>Schritt 1 Entnahme des Haushaltsnettoeinkommen:</h3>
      <h5>Einkommensnachweise hochladen + Betrag eingeben</h5>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4>
            Dokumente hochladen{" "}
            <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => (
                <Button
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                  leftIcon={<ArrowUpIcon stroke="black" width={20} />}
                  {...props}
                >
                  Upload
                </Button>
              )}
            </FileButton>
          </h4>
        </div>
        <div></div>
      </div>
      <div className="mt-20 grid grid-cols-2 gap-10">
        {" "}
        <ZuCommunity />
        <WizardComment />
      </div>
    </>
  );
};

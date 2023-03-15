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
      <h3 className="">Schritt 1 Entnahme des Haushaltsnettoeinkommen:</h3>
      <h5>Einkommensnachweise hochladen + Betrag eingeben</h5>
      <div className="grid grid-cols-2 gap-10">
        <div className="relative inset-x-0 top-0 h-16 justify-start">
          <p>
            Dokumente hochladen{" "}
            <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
          </p>
          <FileButton onChange={setFile} accept="image/pdf,image/jpeg">
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
        </div>
        <div className="w-1/2 flex-auto justify-end">
          <h3>Schritt 2 Kalkulation:</h3>
          {/* TODO: Add dynamic data from calculate to dislpay Result */}
        </div>
      </div>
      <div className="mt-20 grid grid-cols-2 gap-10">
        {" "}
        <ZuCommunity />
        <WizardComment text="Positiv" />
      </div>
    </>
  );
};

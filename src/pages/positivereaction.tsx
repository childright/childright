import { type NextPage } from "next";
import StepperLayout from "../ui/StepperLayout";
import WizardComment from "../ui/WizardComment";
import ZuCommunity from "../ui/ZurCommunity";
import {
  ArrowUpIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

import { api } from "../utils/api";
import axios from "axios";
import { useState } from "react";
import { Button, FileButton, Group } from "@mantine/core";

const PositiveReaction: NextPage = () => {
  return (
    <StepperLayout>
      <DocumentUploadSection />
    </StepperLayout>
  );
};

export default PositiveReaction;

const DocumentUploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const [presignedUrl, setPresignedUrl] = useState<string | null>(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { mutateAsync: fetchPresignedUrls } =
    api.s3.getStandardUploadPresignedUrl.useMutation();
  const apiUtils = api.useContext();
  const [uploadFinished, setUploadFinished] = useState(false);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
    setSubmitDisabled(true);
  };

  const handleSubmit = useCallback(async () => {
    if (!!file && presignedUrl !== null) {
      await axios
        .put(presignedUrl, file, {
          headers: { "Content-Type": file.type },
        })
        .then((response) => {
          console.log(response);
          console.log("Successfully uploaded ", file.name);
          setUploadFinished(true);
        })
        .catch((err) => console.error(err));

      await apiUtils.s3.getObjects.invalidate();
    }
  }, [file, apiUtils.s3.getObjects, presignedUrl]);

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

          {uploadFinished ? (
            <p className="text-green-500">Upload erfolgreich</p>
          ) : (
            <Group position="center">
              <FileButton
                resetRef={resetRef}
                onChange={async (newFile) => {
                  if (!newFile) return;
                  const url = await fetchPresignedUrls({
                    key: newFile.name,
                  });
                  setFile(newFile);
                  setPresignedUrl(url);
                  setSubmitDisabled(false);
                }}
                accept="application/pdf"
              >
                {(props) => (
                  <Button
                    variant="gradient"
                    gradient={{ from: "indigo", to: "cyan" }}
                    leftIcon={<ArrowUpIcon stroke="black" width={20} />}
                    {...props}
                  >
                    Choose File
                  </Button>
                )}
              </FileButton>
              <Button disabled={!file} color="red" onClick={clearFile}>
                Reset
              </Button>
              <Button disabled={submitDisabled} onClick={handleSubmit}>
                Upload
              </Button>
            </Group>
          )}

          {file && (
            <Text size="sm" align="center" mt="sm">
              Picked file: {file.name}
            </Text>
          )}
        </div>
        <div className="w-1/2 flex-auto justify-end">
          <h3>Schritt 2 Kalkulation:</h3>
          {/* TODO: Add dynamic data from calculate to dislpay Result */}
        </div>
      </div>
      <div className="mt-20 grid grid-cols-2 gap-10">
        {" "}
        <ZuCommunity />
        <WizardComment text="Super, du hast die Auskunft von deinen Eltern bekommen, jetzt kommt der nächste Schritt!" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignContent: "flex-end",
        }}
      >
        <Button
          component={NextLink}
          href="/positiveReactionTemplate"
          legacyBehavior
        >
          Weiter
        </Button>
      </div>
    </>
  );
};

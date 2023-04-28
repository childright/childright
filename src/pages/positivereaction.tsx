import { type NextPage } from "next";
import StepperLayout from "../ui/StepperLayout";
import WizardComment from "../ui/WizardComment";
import ZuCommunity from "../ui/ZurCommunity";
import {
  DocumentIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

import { api } from "../utils/api";
import axios from "axios";
import { useState } from "react";
import { Button, FileButton, Group, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { NextLink } from "@mantine/next";
import Link from "next/link";
import useRedirectUnauthenticated from "../hooks/useAuth";

const PositiveReaction: NextPage = () => {
  useRedirectUnauthenticated();

  return (
    <StepperLayout>
      <h1 className="mb-4 text-center">Auskunft Positiv</h1>
      <h3 className="">Schritt 1 Entnahme des Haushaltsnettoeinkommen:</h3>
      <h5>Einkommensnachweise hochladen + Betrag eingeben</h5>
      <div className="grid grid-cols-2 gap-10">
        <div className="relative inset-x-0 top-0 h-16 justify-start">
          <DocumentUploadSection />
          <p>
            Dokumente hochladen{" "}
            <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
          </p>
        </div>
        <div className="w-1/2 flex-auto justify-end">
          <h3>Schritt 2 Kalkulation:</h3>
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
    </StepperLayout>
  );
};

export default PositiveReaction;

const DocumentUploadSection = () => {
  const [file, setFile] = useState<File | null>(null);

  const fileOnServer = api.s3.hasFile.useQuery();
  const getPresignedUrl = api.s3.getStandardUploadPresignedUrl.useMutation();

  const uploadFile = async (file: File) => {
    const presignedUrl = await getPresignedUrl.mutateAsync();

    const response = await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": "application/pdf",
      },
    });

    if (response.status === 200) {
      showNotification({
        title: "File uploaded",
        message: `File ${file.name} has been uploaded`,
        color: "teal",
      });

      fileOnServer.refetch();
    } else {
      showNotification({
        title: "File upload failed",
        message: `File ${file.name} has not been uploaded`,
        color: "red",
      });
    }
  };

  if (fileOnServer.data) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Link href="/api/s3Download">
          <DocumentIcon /> Download file
        </Link>
      </div>
    );
  }

  return (
    <>
      <Group position="center">
        <FileButton onChange={setFile} accept="application/pdf">
          {(props) => <Button {...props}>Select File</Button>}
        </FileButton>
      </Group>

      {file && (
        <>
          <Text size="sm" align="center" mt="sm">
            Picked file: {file.name}
          </Text>

          <Button onClick={() => uploadFile(file)}>Upload</Button>
        </>
      )}
    </>
  );
};

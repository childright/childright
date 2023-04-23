import { type NextPage } from "next";
import { Formik, Form } from "formik";
import StepperLayout from "../ui/StepperLayout";
import * as Yup from "yup";
import { useRouter } from "next/router";
import WizardComment from "../ui/WizardComment";
import ZuCommunity from "../ui/ZurCommunity";
import { Button } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useSession } from "next-auth/react";

const FamilyCourt: NextPage = () => {
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
    <StepperLayout>
      <>
        <h1 className="mb-4 text-center">
          Vorbereitung der Klage (Ratgeber, Infos)
        </h1>
        <div className="grid grid-cols-2 gap-x-5">
          <div>
            <h4>
              Ratgeber Infos: Was passiert vor dem Familiengericht
              (Weiterführende Links)
            </h4>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-10">
          {" "}
          <ZuCommunity />
          <WizardComment text="placeholder" />
          {/* add prop to wizard component - no message on this page */}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button component={NextLink} href="/lawsuitResult" legacyBehavior>
            Weiter
          </Button>
        </div>
      </>
    </StepperLayout>
  );
};

export default FamilyCourt;

import { type NextPage } from "next";
import StepperLayout from "../ui/StepperLayout";
import WizardComment from "../ui/WizardComment";
import ZuCommunity from "../ui/ZurCommunity";
import { Button } from "@mantine/core";
import { NextLink } from "@mantine/next";
import useRedirectUnauthenticated from "../hooks/useAuth";

const LegalProcess: NextPage = () => {
  useRedirectUnauthenticated();

  return (
    <StepperLayout>
      <>
        <h1 className="mb-4 text-center">Rechtsweg - Unterhalt einklagen</h1>
        <div className="grid grid-cols-2 gap-x-5">
          <div>
            <h4>Option 1: Jugentamt stellt Anwalt</h4>
            <h4>Option 2: Selbst Anwalt wählen</h4>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-10">
          {" "}
          <ZuCommunity />
          <WizardComment text="Keine Sorge, es stehen dir viele Möglichkeiten noch offen - kein Grund aufzugeben!" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button component={NextLink} href="/legalActions" legacyBehavior>
            Weiter
          </Button>
        </div>
      </>
    </StepperLayout>
  );
};

export default LegalProcess;

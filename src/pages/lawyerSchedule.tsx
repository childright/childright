import { type NextPage } from "next";
import StepperLayout from "../ui/StepperLayout";
import WizardComment from "../ui/WizardComment";
import ZuCommunity from "../ui/ZurCommunity";
import { Button } from "@mantine/core";
import { NextLink } from "@mantine/next";
import useRedirectUnauthenticated from "../hooks/useAuth";

const LawyerSchedule: NextPage = () => {
  useRedirectUnauthenticated();

  return (
    <StepperLayout>
      <>
        <h1 className="mb-4 text-center">Jugendamt - Anwalt Termin</h1>
        <div className="grid grid-cols-2 gap-x-5">
          <div>
            <h4>
              Jugendamt / Anwalt setzt ein Schreiben auf an
              Unterhaltspflichtigen, um zu zahlen.
            </h4>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-10">
          {" "}
          <ZuCommunity />
          <WizardComment text="Placeholder" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button component={NextLink} href="/legalProcess" legacyBehavior>
            Weiter
          </Button>
        </div>
      </>
    </StepperLayout>
  );
};

export default LawyerSchedule;

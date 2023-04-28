import { type NextPage } from "next";
import StepperLayout from "../ui/StepperLayout";
import WizardComment from "../ui/WizardComment";
import ZuCommunity from "../ui/ZurCommunity";
import { Button } from "@mantine/core";
import { NextLink } from "@mantine/next";
import useRedirectUnauthenticated from "../hooks/useAuth";

const LawsuitResult: NextPage = () => {
  useRedirectUnauthenticated();

  return (
    <StepperLayout>
      <>
        <h1 className="mb-4 text-center">
          Ergebnisse der Klage (Ratgeber, Infos)
        </h1>
        <div className="grid grid-cols-2 gap-x-5">
          <div>
            <h4>
              Dokumente hochladen -{">"} Ergebnis (Der Titel des Gerichts kann
              in eigene Library hochgeladen werden)
            </h4>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-10">
          <ZuCommunity />
          <WizardComment text="placeholder" />
          {/* add prop to wizard component - no message on this page */}
        </div>
        <div className="mt-5 flex justify-end">
          <Button component={NextLink} href="/dashboard" legacyBehavior>
            Weiter
          </Button>
        </div>
      </>
    </StepperLayout>
  );
};

export default LawsuitResult;

import { type NextPage } from "next";
import StepperLayout from "../ui/StepperLayout";
import WizardComment from "../ui/WizardComment";
import ZuCommunity from "../ui/ZurCommunity";
import Map from "../ui/Map";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import useRedirectUnauthenticated from "../hooks/useAuth";

const NegativeReaction: NextPage = () => {
  useRedirectUnauthenticated();

  return (
    <StepperLayout>
      <>
        <h1 className="mb-4 text-center">Negative Reaktion</h1>
        <h3>Was kann ich jetzt tun?</h3>
        <h5>Suche das Gespräch mit externen Helfern!</h5>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4>
              Hilfe vom Jugendamt{" "}
              <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
            </h4>
          </div>

          <div>
            <h4>
              Empfohlene Anwälte{" "}
              <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
            </h4>
          </div>
        </div>
        <Map />

        <div className="mt-20 grid grid-cols-2 gap-10">
          <ZuCommunity />
          <WizardComment text="Keine Sorge, es stehen dir noch viele weiter Möglichkeiten zur Verfügung - kein Grund aufzugeben!" />
        </div>
      </>
    </StepperLayout>
  );
};

export default NegativeReaction;

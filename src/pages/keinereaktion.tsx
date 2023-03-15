import { type NextPage } from "next";
import StepperLayout from "../ui/StepperLayout";
import WizardComment from "../ui/WizardComment";
import ZuCommunity from "../ui/ZurCommunity";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Map from "../ui/Map";

const keinereaktion: NextPage = () => {
  return (
    <StepperLayout>
      <>
        <h1 className="mb-4 text-center">Keine Reaktion</h1>
        <h3>Was kann ich jetzt tun?</h3>
        <h5>Prio 1</h5>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4>
              Hilfe vom Jugendam{" "}
              <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
            </h4>
          </div>

          <div>
            <h4>
              Empfohlene Anwälte{" "}
              <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
            </h4>
          </div>
          <div>
            <h4>
              Psychologen{" "}
              <QuestionMarkCircleIcon className=" h-6 w-6 cursor-pointer" />
            </h4>
          </div>
          <div className="">
            <div className="inline-flex">
              <h4>
                Familien- Beratungsstellen{" "}
                <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
              </h4>
            </div>
          </div>
        </div>
        <Map />

        <div className="mt-20 grid grid-cols-2 gap-10">
          <ZuCommunity />
          <WizardComment />
        </div>
      </>
    </StepperLayout>
  );
};

export default keinereaktion;

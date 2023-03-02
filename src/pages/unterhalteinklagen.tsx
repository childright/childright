import { type NextPage } from "next";
import { Formik, Form } from "formik";
import StepperLayout from "../ui/StepperLayout";
import * as Yup from "yup";
import { useRouter } from "next/router";
import WizardComment from "../ui/WizardComment";
import ZuCommunity from "../ui/ZurCommunity";
import { Button } from "@mantine/core";


const unterhaltEinklagen: NextPage = () => {
  return (
    <StepperLayout>
      <>
        <h1 className="mb-4 text-center">Geld vorhanden für einen eigenen Anwalt
 - Unterhalt einklagen</h1>
        <div className="grid grid-cols-2 gap-x-5">
          <div>
            <h4>Option 1: Jugentamt stellt Anwalt</h4>
            <h4>Option 2: Selbst Anwalt wählen</h4>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-10"> 
           {" "}
          <ZuCommunity />
          <WizardComment /> 
          {/* wizard comment here is different - add prop to component to show specific message */}
        </div>
      </>
    </StepperLayout>
  );
};

export default unterhaltEinklagen;

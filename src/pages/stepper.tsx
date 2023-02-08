import { type NextPage } from "next";

import { api } from "../utils/api";
import { RadioGroup } from "@headlessui/react";
import { FC, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import Button from "../ui/Button";
import CalculatorStep from "../components/steps/CalculatorStep";
import StepperLayout from "../ui/StepperLayout";

const StepperPage: NextPage = () => (
  <StepperLayout>
    <Content />
  </StepperLayout>
);
const Content: FC = () => {
  const currentStep = api.user.getCurrentStep.useQuery();

  switch (currentStep.status) {
    case "loading":
      return <p>loading...</p>;
    case "error":
      return <p>error</p>;
    case "success":
      if (currentStep.data === "step1") return <CalculatorStep />;
      return <p>STEP 2 coming soon</p>;
  }
};

export default StepperPage;

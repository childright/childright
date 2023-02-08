import { type NextPage } from "next";

import { api } from "../utils/api";
import type { FC } from "react";
import CalculatorStep from "../components/steps/CalculatorStep";
import StepperLayout from "../ui/StepperLayout";
import Spinner from "../ui/Spinner";

const StepperPage: NextPage = () => (
  <StepperLayout>
    <Content />
  </StepperLayout>
);
const Content: FC = () => {
  const currentStep = api.user.getCurrentStep.useQuery();

  switch (currentStep.status) {
    case "loading":
      return <Spinner />;
    case "error":
      return <p>error</p>;
    case "success":
      if (currentStep.data === "step1") return <CalculatorStep />;
      return <p>STEP 2 coming soon</p>;
  }
};

export default StepperPage;

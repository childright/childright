import { type NextPage } from "next";
import { Formik, Form } from "formik";

import StepperLayout from "../ui/StepperLayout";
import NumberInputField from "../ui/NumberInputField";
import * as Yup from "yup";
import calculatorStepResult from "../shared/calculatorStepResult";
import { api } from "../utils/api";
import { useRouter } from "next/router";

type FormData = {};

const CalculatePage: NextPage = () => {
  return (
    <StepperLayout>
      <h1 className="mb-4">Unterhaltsrechner</h1>
    </StepperLayout>
  );
};

export default CalculatePage;

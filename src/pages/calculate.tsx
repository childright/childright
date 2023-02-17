import { type NextPage } from "next";
import { Formik, Form } from "formik";

import StepperLayout from "../ui/StepperLayout";
import NumberInputField from "../ui/NumberInputField";
import * as Yup from "yup";
import calculatorStepResult from "../shared/calculatorStepResult";
import { api } from "../utils/api";
import { useRouter } from "next/router";

type FormData = {
  parentsNetIncome?: number;
  kreditRates?: number;
  children0to5?: number;
  children6to13?: number;
  children14to17?: number;
  childrenAbove18?: number;
};

const initialValues: FormData = {};

const validationSchema = Yup.object().shape({
  parentsNetIncome: Yup.number()
    .required()
    .test(
      "more-than-1000",
      "Nettoeinkommen muss über 1000€ liegen",
      (value) => value > 1000
    )
    .required(),
  kreditRates: Yup.number().required(),
  children0to5: Yup.number().required(),
  children6to13: Yup.number().required(),
  children14to17: Yup.number().required(),
  childrenAbove18: Yup.number().required(),
});

const CalculatePage: NextPage = () => {
  const saveMutation = api.steps.calculator.save.useMutation();
  const router = useRouter();

  return (
    <StepperLayout>
      <h1 className="mb-4">Unterhaltsrechner</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await saveMutation.mutateAsync(values as Required<FormData>);
          void router.push("/profile");
        }}
      >
        {({ values }) => (
          <Form className="h-full">
            <div className="grid grid-cols-2">
              <NumberInputField
                name="parentsNetIncome"
                label="monatliches Nettoeinkommen der Eltern (in Euro)"
                min={0}
              />
              <NumberInputField
                name="kreditRates"
                label="Kreditraten (in Euro)"
                min={0}
              />
              <NumberInputField
                name="children0to5"
                label="Kinder 0 bis 5 Jahre"
                min={0}
              />
              <NumberInputField
                name="children6to13"
                label="Kinder 6 bis 13 Jahre"
                min={0}
              />
              <NumberInputField
                name="children14to17"
                label="Kinder 14 bis 17 Jahre"
                min={0}
              />
              <NumberInputField
                name="childrenAbove18"
                label="Kinder über 18 Jahre"
                min={0}
              />
            </div>

            <p>Ergebnis: {calculatorStepResult(values)}</p>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </StepperLayout>
  );
};

export default CalculatePage;

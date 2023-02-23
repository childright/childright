import { type NextPage } from "next";
import { Formik, Form } from "formik";

import StepperLayout from "../ui/StepperLayout";
import NumberInputField from "../ui/NumberInputField";
import * as Yup from "yup";
import calculatorStepResult from "../shared/calculatorStepResult";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { Button, Text } from "@mantine/core";

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
  parentsNetIncome: Yup.number().required(),
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
        validateOnMount
        onSubmit={async (values) => {
          await saveMutation.mutateAsync(values as Required<FormData>);
          void router.push("/profile");
        }}
      >
        {({ values, isValid }) => (
          <Form>
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

            <Text>Ergebnis: {calculatorStepResult(values)}</Text>
            <Button type="submit" disabled={!isValid}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </StepperLayout>
  );
};

export default CalculatePage;

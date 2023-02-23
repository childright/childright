import { type NextPage } from "next";
import { Formik, Form } from "formik";

import StepperLayout from "../ui/StepperLayout";
import * as Yup from "yup";
import { useRouter } from "next/router";
import TextInputField from "../ui/TextInputField";
import {
  Degree,
  EducationSituation,
  FamilyState,
  Income,
  LivingSituation,
  ParentData,
} from "@prisma/client";
import type { ProfileStepData } from "@prisma/client";
import { Select } from "formik-mantine";
import NumberInputField from "../ui/NumberInputField";
import DatePickerField from "../ui/DatePickerField";
import { Button } from "@mantine/core";
import { api } from "../utils/api";

type FormData = Partial<Omit<ParentData, "id" | "userId">>;

const initialValues: FormData = {
  name: "",
  birthDate: undefined,
  address: "",
  livingSituation: undefined,
  familyState: undefined,
  degree: undefined,
  income: undefined,
  incomeAmount: undefined,
  avatarSeed: "TODO: AVATAR",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  birthDate: Yup.date().required(),
  address: Yup.string().required(),
  livingSituation: Yup.string()
    .oneOf(Object.values(LivingSituation))
    .required(),
  familyState: Yup.string().oneOf(Object.values(FamilyState)).required(),
  degree: Yup.string().oneOf(Object.values(Degree)).required(),
  ownIncome: Yup.string().oneOf(Object.values(Income)).required(),
  ownIncomeAmount: Yup.number().required(),
  avatarSeed: Yup.string().required(),
  coachAvatarSeed: Yup.string().required(),
});

const MotherPage: NextPage = () => {
  return (
    <StepperLayout>
      <h1 className="mb-4">Mutter Profil erstellen</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {(formikProps) => (
          <Form>
            <TextInputField name="name" label="Name der Mutter" />
            <DatePickerField name="birthDate" label="Geburtsdatum" />
            <TextInputField name="address" label="Adresse der Mutter" />
            <Select
              name="livingSituation"
              label="Wohnsituation der Mutter"
              data={[
                { label: "Wohnung", value: LivingSituation.APARTMENT },
                { label: "Haus", value: LivingSituation.HOUSE },
                { label: "Andere", value: LivingSituation.OTHER },
              ]}
            />
            <Button disabled={!formikProps.isValid} type="submit">
              Weiter
            </Button>
          </Form>
        )}
      </Formik>
    </StepperLayout>
  );
};

export default MotherPage;

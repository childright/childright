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
} from "@prisma/client";
import type { ProfileStepData } from "@prisma/client";
import NumberInputField from "../ui/NumberInputField";
import DatePickerField from "../ui/DatePickerField";
import { Button } from "@mantine/core";
import { api } from "../utils/api";
import SelectField from "../ui/SelectField";
import { withFormikDevtools } from "formik-devtools-extension";
import useRedirectUnauthenticated from "../hooks/useAuth";
import { NextLink } from "@mantine/next";
import AnimatedFormik from "../utils/AnimatedFormik";

type FormData = Partial<Omit<ProfileStepData, "user" | "userId">>;

const initialValues: FormData = {
  name: "",
  username: "",
  birthDate: undefined,
  address: "",
  education: undefined,
  livingSituation: undefined,
  familyState: undefined,
  degree: undefined,
  ownIncome: undefined,
  ownIncomeAmount: undefined,
  avatarSeed: "TODO: AVATAR",
  coachAvatarSeed: "TODO: COACH AVATAR",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  username: Yup.string().required(),
  birthDate: Yup.date().required(),
  address: Yup.string().required(),
  education: Yup.string().oneOf(Object.values(EducationSituation)).required(),
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

const CalculatePage: NextPage = () => {
  const saveMutation = api.steps.profile.save.useMutation();
  const router = useRouter();
  useRedirectUnauthenticated();

  return (
    <StepperLayout>
      <h1 className="mb-4">Erstelle dein Profil</h1>
      <AnimatedFormik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={async (values) => {
          await saveMutation.mutateAsync(values as Required<FormData>);
          void router.push("/mother");
        }}
      >
        {(formikProps) => {
          withFormikDevtools(formikProps);

          return (
            <Form>
              <TextInputField name="name" label="Dein Name" />
              <TextInputField name="username" label="Dein Username" />
              <DatePickerField name="birthDate" label="Geburtsdatum" />
              <TextInputField name="address" label="Deine Adresse" />
              <SelectField
                name="education"
                label="Aktuelle Bildungssituation"
                data={[
                  { value: "searching", label: "auf der Suche" },
                  { value: "studying", label: "Studium" },
                  { value: "formation", label: "Ausbildung" },
                  { value: "none", label: "nichts der genannten" },
                ]}
              />
              <SelectField
                name="livingSituation"
                label="Aktuelle Wohnsituation"
                data={[
                  { value: "alone", label: "alleine" },
                  { value: "withPartner", label: "mit Partner" },
                  { value: "withChildren", label: "mit Kindern" },
                  { value: "withParents", label: "mit Eltern" },
                  { value: "withOther", label: "andere" },
                ]}
              />
              <SelectField
                name="familyState"
                label="Familienstand"
                data={[
                  { value: "single", label: "ledig" },
                  { value: "married", label: "verheiratet" },
                  { value: "divorced", label: "geschieden" },
                  { value: "widowed", label: "verwitwet" },
                ]}
              />
              <SelectField
                name="degree"
                label="Höchster Bildungsabschluss"
                data={[
                  { value: "none", label: "kein Abschluss" },
                  { value: "hauptschule", label: "Hauptschulabschluss" },
                  { value: "realschule", label: "Realschulabschluss" },
                  { value: "abitur", label: "Abitur" },
                  { value: "studying", label: "im Studium" },
                  { value: "bachelor", label: "Bachelor" },
                  { value: "master", label: "Master" },
                ]}
              />
              <SelectField
                name="ownIncome"
                label="Eigene Einkünfte"
                data={[
                  { value: "none", label: "keine" },
                  { value: "work", label: "Arbeit" },
                  { value: "other", label: "anderes" },
                ]}
              />
              <NumberInputField
                name="ownIncomeAmount"
                label="Summe der (monatlichen) Einkünfte"
              />

              <Button disabled={!formikProps.isValid} type="submit">
                Weiter
              </Button>
            </Form>
          );
        }}
      </AnimatedFormik>
    </StepperLayout>
  );
};

export default CalculatePage;

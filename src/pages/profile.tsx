import { type NextPage } from "next";
import { Formik, Form, Field } from "formik";

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
import { Select } from "formik-mantine";
import NumberInputField from "../ui/NumberInputField";
import DatePickerField from "../ui/DatePickerField";
import { Button } from "@mantine/core";

type FormData = Partial<Omit<ProfileStepData, "user" | "userId">>;

const initialValues: FormData = {
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
  const router = useRouter();
  return (
    <StepperLayout>
      <h1 className="mb-4">Erstelle dein Profil</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("AAA");
          alert(JSON.stringify(values, null, 2));
          void router.push("/mother");
        }}
      >
        <Form>
          <TextInputField name="name" label="Dein Name" />
          <TextInputField name="username" label="Dein Username" />
          <DatePickerField name="birthDate" label="Geburtsdatum" />
          <TextInputField name="address" label="Deine Adresse" />
          <Select
            name="education"
            label="Aktuelle Bildungssituation"
            data={[
              { value: "searching", label: "auf der Suche" },
              { value: "studying", label: "Studium" },
              { value: "formation", label: "Ausbildung" },
              { value: "none", label: "nichts der genannten" },
            ]}
          />
          <Select
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
          <Select
            name="familyState"
            label="Familienstand"
            data={[
              { value: "single", label: "ledig" },
              { value: "married", label: "verheiratet" },
              { value: "divorced", label: "geschieden" },
              { value: "widowed", label: "verwitwet" },
            ]}
          />
          <Select
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
          <Select
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

          <Button type="submit">Weiter</Button>
        </Form>
      </Formik>
    </StepperLayout>
  );
};

export default CalculatePage;

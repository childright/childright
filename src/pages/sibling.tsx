import { type NextPage } from "next";
import { Formik, Form } from "formik";

import StepperLayout from "../ui/StepperLayout";
import * as Yup from "yup";
import { useRouter } from "next/router";
import TextInputField from "../ui/TextInputField";
import { Degree, LivingSituation } from "@prisma/client";
import type { SiblingData } from "@prisma/client";
import NumberInputField from "../ui/NumberInputField";
import DatePickerField from "../ui/DatePickerField";
import { Button } from "@mantine/core";
import SelectField from "../ui/SelectField";
import { withFormikDevtools } from "formik-devtools-extension";
import { api } from "../utils/api";
import { NextLink } from "@mantine/next";

type FormData = Partial<Omit<SiblingData, "id" | "userId">>;

const initialValues: FormData = {
  name: "",
  birthDate: undefined,
  address: "",
  livingSituation: undefined,
  degree: undefined,
  income: undefined,
  incomeAmount: undefined,
  education: undefined,
  avatarSeed: "TODO: AVATAR",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  birthDate: Yup.date().required(),
  address: Yup.string().required(),
  livingSituation: Yup.string()
    .oneOf(Object.values(LivingSituation))
    .required(),
  degree: Yup.string().oneOf(Object.values(Degree)).required(),
  incomeAmount: Yup.number().required(),
  avatarSeed: Yup.string().required(),
});

const SiblingPage: NextPage = () => {
  const saveMutation = api.steps.sibling.save.useMutation();
  const router = useRouter();

  return (
    <StepperLayout>
      <h1 className="mb-4">Profil erstellen des Geschwisterkindes</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={async (values) => {
          await saveMutation.mutateAsync(values as Required<FormData>);
          void router.push("/resultAmount");
        }}
      >
        {(formikProps) => {
          withFormikDevtools(formikProps);
          return (
            <Form>
              <TextInputField name="name" label="Name des Geschwisterkindes" />
              <DatePickerField name="birthDate" label="Geburtsdatum" />
              <TextInputField name="address" label="Geschwister Adresse" />
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
                label="Familienstand des Geschwisterkindes"
                data={[
                  { label: "Ledig", value: "single" },
                  { label: "Verheiratet", value: "married" },
                  { label: "Geschieden", value: "divorced" },
                  { label: "Verwitwet", value: "widowed" },
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
                name="income"
                label="Einkommen des Geschwisterkindes"
                data={[
                  { value: "none", label: "kein Einkommen" },
                  { value: "work", label: "Arbeit" },
                  { value: "other", label: "anderes Einkommen" },
                ]}
              />
              <NumberInputField // TODO: Specify Brutto or Netto income?
                name="incomeAmount"
                label="Summe der (monatlichen) Einkünfte des Geschwisterkindes"
              />
              <Button disabled={!formikProps.isValid} type="submit">
                Weiter
              </Button>
            </Form>
          );
        }}
      </Formik>
    </StepperLayout>
  );
};

export default SiblingPage;

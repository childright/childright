import { type NextPage } from "next";
import { Formik, Form } from "formik";

import StepperLayout from "../ui/StepperLayout";
import * as Yup from "yup";
import { useRouter } from "next/router";
import TextInputField from "../ui/TextInputField";
import { Degree, FamilyState, Income, LivingSituation } from "@prisma/client";
import type { ParentData } from "@prisma/client";
import NumberInputField from "../ui/NumberInputField";
import DatePickerField from "../ui/DatePickerField";
import { Button } from "@mantine/core";
import SelectField from "../ui/SelectField";
import { withFormikDevtools } from "formik-devtools-extension";
import { api } from "../utils/api";
import useRedirectUnauthenticated from "../hooks/useAuth";

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
  income: Yup.string().oneOf(Object.values(Income)).required(),
  incomeAmount: Yup.number().required(),
  avatarSeed: Yup.string().required(),
});

const FatherPage: NextPage = () => {
  const saveMutation = api.steps.father.save.useMutation();
  const router = useRouter();
  useRedirectUnauthenticated();

  return (
    <StepperLayout>
      <h1 className="mb-4">Vater Profil erstellen</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={async (values) => {
          await saveMutation.mutateAsync(values as Required<FormData>);
          void router.push("/sibling");
        }}
      >
        {(formikProps) => {
          withFormikDevtools(formikProps);
          return (
            <Form>
              <TextInputField name="name" label="Name des Vaters" />
              <DatePickerField name="birthDate" label="Geburtsdatum" />
              <TextInputField name="address" label="Adresse des Vaters" />
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
                label="Familienstand des Vaters"
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
                name="income"
                label="Einkommen des Vaters"
                data={[
                  { label: "Kein Einkommen", value: "none" },
                  { label: "Arbeit", value: "work" },
                  { label: "Anderes", value: "other" },
                ]}
              />
              <NumberInputField // TODO: Specify Brutto or Netto income?
                name="incomeAmount"
                label="Summe der (monatlichen) Einkünfte des Vaters"
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

export default FatherPage;

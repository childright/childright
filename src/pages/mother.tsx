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
});

const MotherPage: NextPage = () => {
  // const saveMutation = api.steps.mother.save.useMutation();
  const router = useRouter();

  return (
    <StepperLayout>
      <h1 className="mb-4">Mutter Profil erstellen</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {
          //await saveMutation.mutateAsync(values as Required<FormData>);
          void router.push("/father");
        }}
      >
        {(formikProps) => {
          withFormikDevtools(formikProps);
          return (
            <Form>
              <TextInputField name="name" label="Name der Mutter" />
              <DatePickerField name="birthDate" label="Geburtsdatum" />
              <TextInputField name="address" label="Adresse der Mutter" />
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
                label="Familienstand der Mutter"
                data={[
                  { label: "Ledig", value: "single" },
                  { label: "Verheiratet", value: "married" },
                  { label: "Geschieden", value: "divorced" },
                  { label: "Verwitwet", value: "widowed" },
                ]}
              />
              <SelectField
                name="degree"
                label="Höchster Bildungsabschluss der Mutter"
                data={[
                  { label: "Kein Abschluss", value: "none" },
                  { label: "Hauptschulabschluss", value: "hauptschule" },
                  { label: "Realschulabschluss", value: "real" },
                  { label: "Abitur", value: "abitur" },
                  { label: "Fachhochschulreife", value: "fachhochschulreife" },
                  //{ label: "Bachelor", value: Degree.BACHELOR },
                  //{ label: "Master", value: Degree.MASTER }
                  //{ label: "Andere", value: Degree.OTHER },
                ]}
              />
              <SelectField
                name="ownIncome"
                label="Einkommen der Mutter"
                data={[
                  { label: "Kein Einkommen", value: "none" },
                  { label: "Arbeit", value: "work" },
                  { label: "Anderes", value: "other" },
                ]}
              />
              <NumberInputField // TODO: Specify Brutto or Netto income?
                name="ownIncomeAmount"
                label="Summe der (monatlichen) Einkünfte der Mutter"
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

export default MotherPage;

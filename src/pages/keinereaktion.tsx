import { type NextPage } from "next";
import { Formik, Form } from "formik";

import StepperLayout from "../ui/StepperLayout";
import * as Yup from "yup";
import { useRouter } from "next/router";
import WizardComment from "../ui/WizardComment";
import ZuCommunity from "../ui/ZuCommunity";
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

const keinereaktion: NextPage = () => {
  return (
    <StepperLayout>
      <h1 className="mb-4 text-center">Keine Reaktion</h1>
      <h3>Was kann ich jetzt tun?</h3>
      <h5>Prio 1</h5>
      <div className="grid grid-cols-2 gap-4">
        {" "}
        <h5>Hilfe vom Jugendam</h5>
        {}
        <h5>Empfohlene Anwälte</h5>
        {}
        <h5>Psychologen</h5>
        {}
        <h5>Familien- Beratungsstellen</h5>
        {}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {" "}
        <ZuCommunity />
        <WizardComment />
      </div>
    </StepperLayout>
  );
};

export default keinereaktion;

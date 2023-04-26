import { type NextPage } from "next";
import { Formik, Form } from "formik";
import StepperLayout from "../ui/StepperLayout";
import * as Yup from "yup";
import { useRouter } from "next/router";
import WizardComment from "../ui/WizardComment";
import ZuCommunity from "../ui/ZurCommunity";
import { Button, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import useAuth from "../hooks/useAuth";
import { api } from "../utils/api";
import useRedirectUnauthenticated from "../hooks/useAuth";

const Dashboard: NextPage = () => {
  useRedirectUnauthenticated();

  const profileQuery = api.steps.profile.get.useQuery();
  const motherQuery = api.steps.mother.get.useQuery();
  const fatherQuery = api.steps.father.get.useQuery();
  const siblingQuery = api.steps.sibling.get.useQuery();
  const calculatorQuery = api.steps.calculator.get.useQuery();

  const queryObjects = [
    profileQuery,
    motherQuery,
    fatherQuery,
    siblingQuery,
    calculatorQuery,
  ];

  for (const query of queryObjects) {
    if (query.isLoading) {
      return <Text>Loading...</Text>;
    }

    if (query.isError) {
      return <Text>Error: {query.error.message}</Text>;
    }
  }

  return (
    <StepperLayout>
      <>
        <h1 className="mb-4 text-center">Dashboard</h1>
        <div className="grid grid-cols-2 gap-x-5">
          <div>
            <h2>Willkommen {profileQuery.data?.username}!</h2>
            <h3>Acocunt Überblick</h3>
            <p>
              Deine zu verfügung stehende Summe:
              {calculatorQuery.data?.claimAmountResult}
            </p>
            <ul>
              <h4>Profile deiner Famielienmitglieder</h4>
              <li>
                <div>{fatherQuery.data?.name}</div>
              </li>
              <li>
                <div>{motherQuery.data?.name}</div>
              </li>
              <li>
                <div>{siblingQuery.data?.name}</div>
              </li>
              <li>
                “Progress Bar” -{">"} zeigt in welchem Abschnitt man sich
                befindet (90%)
              </li>
              <li>
                zeigen, welche Dokumente noch nachgereicht werden müssen für
                nächsten Schritten
              </li>
              <li>Community</li>
              <li>Ratgeber/FAQ </li>
              <li>Kontakt (zu uns, aber auch externe Beratung etc.)</li>
              <li>
                bei Ausländern: Aufenthaltstitel in Form einer
                Niederlassungserlaubnis bzw. Aufenthaltserlaubnis
              </li>
              <li>Aufenthaltsbescheinigungen</li>
              <li>ggbfls. Vaterschaftsanerkennung</li>
            </ul>
          </div>

          <div className="m-auto text-center">
            <h4> </h4>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-10">
          <WizardComment text="placeholder" />
        </div>
      </>
    </StepperLayout>
  );
};

export default Dashboard;

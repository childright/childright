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

  const profileData = api.steps.profile.get.useQuery();
  const motherData = api.steps.mother.get.useQuery();
  const fatherData = api.steps.father.get.useQuery();
  const siblingData = api.steps.sibling.get.useQuery();
  const calculatorData = api.steps.calculator.get.useQuery();

  if (profileData.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (motherData.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (fatherData.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (siblingData.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (calculatorData.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (profileData.isError) {
    return <Text>Error: {profileData.error.message}</Text>;
  }

  if (motherData.isError) {
    return <Text>Error: {motherData.error.message}</Text>;
  }

  if (fatherData.isError) {
    return <Text>Error: {fatherData.error.message}</Text>;
  }

  if (siblingData.isError) {
    return <Text>Error: {siblingData.error.message}</Text>;
  }

  if (calculatorData.isError) {
    return <Text>Error: {calculatorData.error.message}</Text>;
  }

  return (
    <StepperLayout>
      <>
        <h1 className="mb-4 text-center">Dashboard</h1>
        <div className="grid grid-cols-2 gap-x-5">
          <div>
            <h2>Willkommen {profileData.data?.username}!</h2>
            <h3>Acocunt Überblick</h3>
            <p>
              Deine zu verfügung stehende Summe:
              {calculatorData.data?.claimAmountResult}
            </p>
            <ul>
              <h4>Profile deiner Famielienmitglieder</h4>
              <li>
                <div>{fatherData.data?.name}</div>
              </li>
              <li>
                <div>{motherData.data?.name}</div>
              </li>
              <li>
                <div>{siblingData.data?.name}</div>
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

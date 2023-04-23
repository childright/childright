import { type NextPage } from "next";
import { Formik, Form } from "formik";
import StepperLayout from "../ui/StepperLayout";
import * as Yup from "yup";
import { useRouter } from "next/router";
import WizardComment from "../ui/WizardComment";
import ZuCommunity from "../ui/ZurCommunity";
import { Button } from "@mantine/core";
import { useSession } from "next-auth/react";
import useAuth from "../hooks/useAuth";

const Dashboard: NextPage = () => {
  useAuth();

  return (
    <StepperLayout>
      <>
        <h1 className="mb-4 text-center">Dashboard</h1>
        <div className="grid grid-cols-2 gap-x-5">
          <div>
            <h3>Must include:</h3>
            <ul>
              <li>
                Profile (eigenes Profil, Mutter, Vater, Geschwisterkinder..)
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

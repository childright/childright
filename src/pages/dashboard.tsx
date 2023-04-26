import { type NextPage } from "next";
import StepperLayout from "../ui/StepperLayout";
import WizardComment from "../ui/WizardComment";
import { Text } from "@mantine/core";
import { api } from "../utils/api";
import useRedirectUnauthenticated from "../hooks/useAuth";
import Link from "next/link";

const Dashboard: NextPage = () => {
  useRedirectUnauthenticated();

  const profileQuery = api.steps.profile.get.useQuery();
  const motherQuery = api.steps.mother.get.useQuery();
  const fatherQuery = api.steps.father.get.useQuery();
  const siblingQuery = api.steps.sibling.get.useQuery();
  const calculatorQuery = api.steps.calculator.get.useQuery();
  const forumQuery = api.forum.comments.getRootComments.useQuery({
    forUser: true,
  });

  const queryObjects = [
    profileQuery,
    motherQuery,
    fatherQuery,
    siblingQuery,
    calculatorQuery,
    forumQuery,
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
              <h4>Profile deiner Familienmitglieder</h4>
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

        <h2>Forum Discussions</h2>
        <ul>
          {forumQuery?.data?.map((comment) => (
            <li key={comment.id}>
              <Link href={`/forum/${comment.id}`}>{comment.title}</Link>
            </li>
          ))}
        </ul>
        <div className="mt-20 grid grid-cols-2 gap-10">
          <WizardComment text="placeholder" />
        </div>
      </>
    </StepperLayout>
  );
};

export default Dashboard;

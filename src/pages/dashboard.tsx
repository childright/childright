import { type NextPage } from "next";
import { Accordion, Text } from "@mantine/core";
import { api } from "../utils/api";
import useRedirectUnauthenticated from "../hooks/useAuth";
import calculateAge from "../utils/calculateAge";
import ChatPreview from "../ui/ChatPreview";
import ForumPreview from "../ui/ForumPreview";

const Dashboard: NextPage = () => {
  useRedirectUnauthenticated();

  const profileQuery = api.steps.profile.get.useQuery();
  const motherQuery = api.steps.mother.get.useQuery();
  const fatherQuery = api.steps.father.get.useQuery();
  const siblingQuery = api.steps.sibling.get.useQuery();
  const calculatorQuery = api.steps.calculator.get.useQuery();

  const chatQuery = api.chat.getChats.useQuery();
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
    chatQuery,
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
    <div>
      <h1 className="mb-4 text-center">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <Accordion multiple className="md:row-span-2">
          <Accordion.Item value="calculator">
            <Accordion.Control>
              <AccordionLabel
                label="Rechner"
                description={`Geschätztes Geld: ${calculatorQuery.data?.claimAmountResult} €`}
              />
            </Accordion.Control>
            <Accordion.Panel>
              <ul>
                <li>
                  Monatliches Nettoeinkommen der Eltern:{" "}
                  {calculatorQuery.data?.parentsNetIncome} €
                </li>
                <li>Kreditraten: {calculatorQuery.data?.kreditRates} €</li>
                <li>
                  Kinder 0 bis 5 Jahre: {calculatorQuery.data?.children0to5} €
                </li>
                <li>
                  Kinder 6 bis 13 Jahre: {calculatorQuery.data?.children6to13} €
                </li>
                <li>
                  Kinder 14 bis 17 Jahre: {calculatorQuery.data?.children14to17}{" "}
                  €
                </li>
                <li>
                  Kinder über 18 Jahren: {calculatorQuery.data?.childrenAbove18}{" "}
                  €
                </li>
              </ul>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="profile">
            <Accordion.Control>
              <AccordionLabel
                label="Profil"
                description={`${profileQuery.data?.name}, ${
                  profileQuery.data?.birthDate
                    ? `${calculateAge(profileQuery.data?.birthDate)} Jahre alt`
                    : ""
                }`}
              />
            </Accordion.Control>
            <Accordion.Panel>
              <ul>
                <li>Name: {profileQuery.data?.name}</li>
                <li>Username: {profileQuery.data?.username}</li>
                <li>
                  Geburtsdatum: {profileQuery.data?.birthDate.toDateString()}
                </li>
                <li>Adresse: {profileQuery.data?.address}</li>
                <li>
                  Aktuelle Bildungssituation: {profileQuery.data?.education}
                </li>
                <li>
                  Aktuelle Wohnsituation: {profileQuery.data?.livingSituation}
                </li>
                <li>Familienstand: {profileQuery.data?.familyState}</li>
                <li>Höchster Bildungsabschluss: {profileQuery.data?.degree}</li>
                <li>Eigene Einkünfte: {profileQuery.data?.ownIncome}</li>
                <li>
                  Summe der (monatlichen) Einkünfte:{" "}
                  {profileQuery.data?.ownIncomeAmount}
                </li>
              </ul>
            </Accordion.Panel>
          </Accordion.Item>

          {[motherQuery, fatherQuery].map((query, index) => {
            if (!query.data) {
              return null;
            }
            return (
              <Accordion.Item value={query.data.id} key={query.data.id}>
                <Accordion.Control>
                  <AccordionLabel
                    label={index === 0 ? "Mutter" : "Vater"}
                    description={`${query.data?.name}${
                      query.data?.birthDate
                        ? `, ${calculateAge(query.data?.birthDate)} Jahre alt`
                        : ""
                    }`}
                  />
                </Accordion.Control>
                <Accordion.Panel>
                  <ul>
                    <li>Name: {query.data?.name}</li>
                    <li>
                      Geburtsdatum: {query.data?.birthDate.toDateString()}
                    </li>
                    <li>Adresse: {query.data?.address}</li>
                    <li>
                      Aktuelle Wohnsituation: {query.data?.livingSituation}
                    </li>
                    <li>Familienstand: {query.data?.familyState}</li>
                    <li>Höchster Bildungsabschluss: {query.data?.degree}</li>
                    <li>Einkommen: {query.data?.income}</li>
                    <li>
                      Summe der (monatlichen) Einkünfte:{" "}
                      {query.data?.incomeAmount}
                    </li>
                  </ul>
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}

          {siblingQuery.data?.map((sibling, index) => (
            <Accordion.Item key={sibling.id} value={sibling.id}>
              <Accordion.Control>
                <AccordionLabel
                  label={`Geschwister ${index + 1}`}
                  description={`${sibling.name}${
                    sibling.birthDate
                      ? `, ${calculateAge(sibling.birthDate)} Jahre alt`
                      : ""
                  }`}
                />
              </Accordion.Control>
              <Accordion.Panel>
                <ul>
                  <li>Name: {sibling.name}</li>
                  <li>Geburtsdatum: {sibling.birthDate.toDateString()}</li>
                  <li>Adresse: {sibling.address}</li>
                  <li>Aktuelle Wohnsituation: {sibling.livingSituation}</li>
                  <li>Höchster Bildungsabschluss: {sibling.degree}</li>
                  <li>Aktuelle Bildungssituation: {sibling.education} </li>
                  <li>Einkommen: {sibling.income}</li>
                  <li>
                    Summe der (monatlichen) Einkünfte: {sibling.incomeAmount}
                  </li>
                </ul>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        <div className="m-4">
          <h2>Chats</h2>
          {chatQuery.data?.slice(0, 7).map((chat) => (
            <ChatPreview key={chat.id} chat={chat} />
          ))}
        </div>

        {forumQuery.data && (
          <div className="m-4">
            <ForumPreview forumComments={forumQuery.data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

interface AccordionLabelProps {
  label: string;
  description: string;
}

function AccordionLabel({ label, description }: AccordionLabelProps) {
  return (
    <div>
      <Text>{label}</Text>
      <Text size="sm" color="dimmed" weight={400}>
        {description}
      </Text>
    </div>
  );
}

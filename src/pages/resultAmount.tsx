import { Button, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { type NextPage } from "next";

import StepperLayout from "../ui/StepperLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useRedirectUnauthenticated from "../hooks/useAuth";

const sampleData = {
  yourClaim: 1000,
  siblingsClaims: {
    Anna: 1000,
    Maja: 850,
    Thorge: 800,
    Chris: 1200,
  },
};

const possessive = (name: string) => name + (name.endsWith("s") ? "'" : "s");

const AmountPage: NextPage = () => {
  useRedirectUnauthenticated();

  return (
    <StepperLayout>
      <h1>Deine Ergebnisse sind da!</h1>
      <Text>
        <b>Dein exakter Unterhaltsanspruch: </b> {sampleData.yourClaim}
      </Text>
      {Object.entries(sampleData.siblingsClaims).map(([name, amount]) => (
        <Text key={name}>
          <b>{possessive(name)} exakter Unterhaltsanspruch: </b> {amount}
        </Text>
      ))}

      <Button component={NextLink} href="/resultTemplates" legacyBehavior>
        Weiter
      </Button>
    </StepperLayout>
  );
};
export default AmountPage;

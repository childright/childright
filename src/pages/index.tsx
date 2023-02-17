import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { Button, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";

const Home: NextPage = () => {
  return (
    <>
      <h1>ChildRight</h1>
      <AuthShowcase />
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div>
      <Text>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </Text>
      <Button component={NextLink} href="/calculate" legacyBehavior>
        Start
      </Button>
    </div>
  );
};

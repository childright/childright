import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { Button, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import AuthButton from "../ui/AuthButton";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <h1>ChildRight</h1>
      <div>
        <Text>
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        </Text>
        {sessionData?.user ? (
          <Button component={NextLink} href="/calculate" legacyBehavior>
            Start
          </Button>
        ) : (
          <AuthButton />
        )}
      </div>
    </>
  );
};

export default Home;

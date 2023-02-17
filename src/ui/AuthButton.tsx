import { Button } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const AuthButton = () => {
  const { data: session } = useSession();

  return (
    <Button onClick={session ? () => void signOut() : () => void signIn()}>
      {session ? "Sign out" : "Sign in"}
    </Button>
  );
};

export default AuthButton;

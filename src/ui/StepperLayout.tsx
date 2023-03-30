import { Progress } from "@mantine/core";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import React from "react";

type Props = {
  children: ReactNode;
};

const stepsToProgress = {
  "/calculate": 5,
  "/profile": 15,
  "/mother": 30,
  "/father": 45,
  "/sibling": 60,
  "/resultAmount": 75,
  "/resultTemplates": 100,
};

const StepperLayout = ({ children }: Props) => {
  const { pathname } = useRouter();

  return (
    <div>
      <div className="mx-auto p-4 md:w-3/4 lg:w-1/2">{children}</div>
      <Progress
        className="fixed bottom-0 left-0 right-0"
        value={stepsToProgress[pathname as keyof typeof stepsToProgress]}
      />
    </div>
  );
};

export default StepperLayout;

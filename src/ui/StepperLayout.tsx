import { Progress } from "@mantine/core";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import React from "react";

type Props = {
  children: ReactNode;
};

const stepsToProgress = {
  "/calculate": 5,
  "/profile": 20,
  "/mother": 30,
  "/father": 40,
  "/sibling": 50,
  "/resultAmount": 60,
  "/resultTemplates": 70,
};

const StepperLayout = ({ children }: Props) => {
  const { pathname } = useRouter();

  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto md:w-3/4 lg:w-1/2">
        {children}
        {/*  <AbsoluteAnimatedCharacter /> */}
      </div>
      <Progress
        className="mt-auto mb-2"
        value={stepsToProgress[pathname as keyof typeof stepsToProgress]}
      />
    </div>
  );
};

export default StepperLayout;

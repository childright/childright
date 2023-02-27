import type { ReactNode } from "react";
import React from "react";

type Props = {
  children: ReactNode;
};

const StepperLayout = ({ children }: Props) => {
  return (
    <div className="mx-auto md:w-3/4 lg:w-1/2">
      {children}
      {/*  <AbsoluteAnimatedCharacter /> */}
    </div>
  );
};

export default StepperLayout;

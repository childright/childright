import type { ReactNode } from "react";
import React from "react";
import AnimatedCharacter from "./animations/AnimatedWizard";

type Props = {
  children: ReactNode;
};

const StepperLayout = ({ children }: Props) => {
  return (
    <div className="mx-auto md:w-3/4 lg:w-1/2">
      {children}
      <div className="absolute bottom-0 left-0 h-56 w-56">
        <AnimatedCharacter />
      </div>
    </div>
  );
};

export default StepperLayout;

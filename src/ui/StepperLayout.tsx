import type { ReactNode } from "react";
import React from "react";

type Props = {
  children: ReactNode;
};

const StepperLayout = ({ children }: Props) => {
  return <div className="mx-auto md:w-3/4 lg:w-1/2">{children}</div>;
};

export default StepperLayout;

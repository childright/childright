import type { ReactNode } from "react";
import React from "react";

type Props = {
  children: ReactNode;
};

const StepperLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default StepperLayout;

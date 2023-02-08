import type { ReactNode } from "react";
import React from "react";

type Props = {
  children: ReactNode;
};

const StepperLayout = ({ children }: Props) => {
  return (
    <main className="grid h-screen w-screen place-items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="flex min-h-[70%] min-w-[70%] flex-col justify-between rounded-2xl border border-gray-400 bg-white p-4">
        {children}
      </div>
    </main>
  );
};

export default StepperLayout;

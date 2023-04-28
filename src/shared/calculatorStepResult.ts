import type { CalculatorStepData } from "@prisma/client";

const calculatorStepResult = (
  values: Omit<Partial<CalculatorStepData>, "userId">
) =>
  Object.values(values).reduce(
    (acc, val) => acc + (typeof val == "number" ? val : 0),
    0
  );

export default calculatorStepResult;

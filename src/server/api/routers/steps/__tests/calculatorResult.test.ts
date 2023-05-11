import { test, expect } from "vitest";
import calculatorStepResult from "../../../../../shared/calculatorStepResult";

/*
    * The test verifies the behavior of this function in isolation by calling it with a set of input values.

*/

test("calculatorStepResult computes the correct result", () => {
  // Arrange
  const values = {
    parentsNetIncome: 1000,
    kreditRates: 500,
    children0to5: 200,
    children6to13: 300,
    children14to17: 150,
    childrenAbove18: 100,
  };

  // Act
  const result = calculatorStepResult(values);

  // Assert
  expect(result).toBe(2250);
});

import { it, expect } from "vitest";
import { createTRPCRouter } from "../../../trpc";
import { calculatorRouter } from "../calculator";
import { fatherRouter } from "../father";
import { motherRouter } from "../mother";
import { profileRouter } from "../profile";
import { siblingRouter } from "../sibling";

it("stepsRouter", () => {
  const stepsRouter = createTRPCRouter({
    calculator: calculatorRouter,
    profile: profileRouter,
    mother: motherRouter,
    father: fatherRouter,
    sibling: siblingRouter,
  });

  console.log(stepsRouter);
  expect(stepsRouter).toBeDefined();
  expect(calculatorRouter).toBeDefined();
  expect(profileRouter).toBeDefined();
  expect(motherRouter).toBeDefined();
  expect(fatherRouter).toBeDefined();
  expect(siblingRouter).toBeDefined();
});

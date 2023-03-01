import { createTRPCRouter } from "../../trpc";
import { calculatorRouter } from "./calculator";
import { fatherRouter } from "./father";
import { motherRouter } from "./mother";
import { profileRouter } from "./profile";
import { siblingRouter } from "./sibling";

export const stepsRouter = createTRPCRouter({
  calculator: calculatorRouter,
  profile: profileRouter,
  mother: motherRouter,
  father: fatherRouter,
  sibling: siblingRouter,
});

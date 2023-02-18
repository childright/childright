import { createTRPCRouter } from "../../trpc";
import { calculatorRouter } from "./calculator";
import { profileRouter } from "./profile";

export const stepsRouter = createTRPCRouter({
  calculator: calculatorRouter,
  profile: profileRouter,
});

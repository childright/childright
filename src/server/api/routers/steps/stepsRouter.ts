import { createTRPCRouter } from "../../trpc";
import { calculatorRouter } from "./calculator";

export const stepsRouter = createTRPCRouter({
  calculator: calculatorRouter,
});

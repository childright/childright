import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { stepsRouter } from "./routers/steps";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  steps: stepsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { stepsRouter } from "./routers/steps";
import { forumRouter } from "./routers/forum";
import { s3Router } from "./routers/s3";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  steps: stepsRouter,
  forum: forumRouter,
  s3: s3Router,
});

// export type definition of API
export type AppRouter = typeof appRouter;

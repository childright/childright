import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { stepsRouter } from "./routers/steps";
import { chatbotRouter } from "./routers/chatbot";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  steps: stepsRouter,
  chatbot: chatbotRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

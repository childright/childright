import Pusher from "pusher-js";
import { env } from "../env/client.mjs";

export const pusherClient = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
  userAuthentication: {
    endpoint: "/api/pusher/user-auth",
    transport: "ajax",
  },
});

import type { NextApiRequest, NextApiResponse } from "next";
import { pusherServerClient } from "../../../server/pusher";

export default function pusherAuthEndpoint(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { channel_name, socket_id } = req.body;
  const { user_id, nickname } = req.headers;

  if (!user_id || typeof user_id !== "string") {
    res.status(404).send("no user");
    return;
  }

  const auth = pusherServerClient.authorizeChannel(socket_id, channel_name, {
    user_id,
    user_info: {
      name: nickname,
    },
  });

  res.send(auth);
}

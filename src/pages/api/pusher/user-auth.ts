import type { NextApiRequest, NextApiResponse } from "next";
import { pusherServerClient } from "../../../server/pusher";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function pusherAuthEndpoint(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("test");
  const session = await getServerSession(req, res, authOptions);

  const { socket_id } = req.body;

  if (typeof session?.user?.id === "string") {
    const auth = pusherServerClient.authenticateUser(socket_id, {
      id: session.user.id,
    });
    return res.send(auth);
  }

  return res.status(404);
}

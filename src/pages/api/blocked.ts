//next api route
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(429).json("Blocked because of Rate Limit");
}

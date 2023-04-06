import { extension } from "mime-types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { env } from "../../env/server.mjs";
import { s3 } from "../../server/s3";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  const obj = await s3.getObject({
    Bucket: env.AWS_S3_BUCKET,
    Key: session.user.id,
  });

  if (!obj.Body) {
    return res.status(404).json({ message: "File not found." });
  }

  const ext = extension(obj.ContentType ?? "");

  res.setHeader("Content-Type", obj.ContentType ?? "");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${session.user.id}.${ext}"`
  );
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  res.setHeader("Content-Type", obj.ContentType ?? "");
  res.setHeader("Content-Disposition", `attachment; filename="Document.pdf"`);
  res.status(200).send(obj.Body);
}

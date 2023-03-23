import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";

import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.calculatorStepEmail.findMany();
  console.log(data);

  // send a a mail with nodemailer
  // https://nodemailer.com/about/

  const transporter = await nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const result = await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: "markwitt6@yahoo.de",
    subject: "Hello",
    text: "Hello world",
  });

  res.send({ result });
}

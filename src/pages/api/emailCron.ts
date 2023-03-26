import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";

import nodemailer from "nodemailer";
import type {
  CalculatorStepData,
  CalculatorStepEmail,
  User,
} from "@prisma/client";
import calculatorStepResult from "../../shared/calculatorStepResult";

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.calculatorStepEmail.findMany({
    where: {
      sent: false,
      sendDate: {
        lte: new Date(),
      },
    },
    include: {
      User: {
        include: {
          calculatorStep: true,
        },
      },
    },
  });

  const result = await Promise.all(
    data.map(async (item) => {
      const result = await sendEmail(item);
      await prisma.calculatorStepEmail.update({
        where: {
          id: item.id,
        },
        data: {
          sent: true,
        },
      });
      return result;
    })
  );

  res.status(200).json(result);
}

const sendEmail = async (
  data: CalculatorStepEmail & {
    User: User & {
      calculatorStep: CalculatorStepData | null;
    };
  }
) => {
  const amount = calculatorStepResult(
    data.User.calculatorStep as CalculatorStepData
  );
  const result = await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: data.to,
    subject: "ChildRight Reminder",
    text: `Hello ${
      data.User.name ?? data.to
    }! Your estimated child support claim is ${amount} €. Do you want to continue with your claim?`,
  });

  return result;
};

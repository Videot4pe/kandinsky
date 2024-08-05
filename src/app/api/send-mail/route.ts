import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(req: Request) {
  const body = await req.json();
  const { message, apiKey } = body;

  if (apiKey !== process.env.NEXT_PUBLIC_MAIL_API_KEY) {
    return NextResponse.error();
  }

  const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_MAIL_HOST,
    secure: true,
    port: 465,
    auth: {
      user: process.env.NEXT_PUBLIC_MAIL_EMAIL_ADDRESS,
      pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
    },
  });
  try {
    const info = await transporter.sendMail(message);
    transporter.close();
    return NextResponse.json({
      success: `Message delivered to ${info.accepted}`,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}

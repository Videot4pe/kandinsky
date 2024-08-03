import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(req: Request) {
  const body = await req.json();
  const message = {
    from: body.from,
    to: body.to,
    subject: body.subject,
    text: body.message,
    html: body.message,
  };

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_GMAIL_EMAIL_ADDRESS,
      pass: process.env.NEXT_PUBLIC_GMAIL_APP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail(message);
    return NextResponse.json({
      success: `Message delivered to ${info.accepted}`,
    });
  } catch (e) {
    return NextResponse.error();
  }
}

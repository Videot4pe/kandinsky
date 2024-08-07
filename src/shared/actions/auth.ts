"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { EmailNotVerifiedError } from "@/shared/actions/errors";
import {
  generateEmailVerificationToken,
  generatePasswordHash,
} from "@/shared/lib/crypto";
import {
  createUser,
  findUserByEmail,
  updateUserVerificationToken,
} from "@/shared/api/prisma/users-api";
import { sendEmail } from "@/shared/api/email-api";
import { IEmailMessage } from "@/shared/model/email-message";
import { emailVerificationTemplate } from "@/shared/templates/email-verification";

const sendVerificationEmail = async (email: string, token: string) => {
  const message: IEmailMessage = {
    from: `Kandinsky <${process.env.NEXT_PUBLIC_MAIL_EMAIL_ADDRESS}>`,
    to: email,
    subject: "Email Verification",
    html: emailVerificationTemplate(
      `${process.env.NEXT_PUBLIC_BASE_URL}/email/verify?email=${email}&token=${token}`
    ),
  };
  try {
    return sendEmail(message);
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const isUsersEmailVerified = async (email: string) => {
  const user = await findUserByEmail(email);
  if (!user) return true;
  if (!user.emailVerifiedAt)
    throw new EmailNotVerifiedError(`Email not verified: ${email}`);
  return true;
};

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(255),
});

export const signUp = async (
  _: any,
  formData: FormData
): Promise<{
  errors: { _form?: string[]; email?: string[]; password?: string[] };
}> => {
  const result = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const isEmailExists = await findUserByEmail(result.data.email);
  if (isEmailExists) {
    return { errors: { email: ["Email already exists"] } };
  }

  const hashedPassword = await generatePasswordHash(result.data.password);
  const verificationToken = generateEmailVerificationToken();

  try {
    await createUser(result.data.email, hashedPassword, verificationToken);
  } catch (error) {
    return { errors: { _form: [(error as { message: string }).message] } };
  }

  try {
    await sendVerificationEmail(result.data.email, verificationToken);
  } catch (e) {
    console.error(e);
  }

  redirect(`/email/verify/send?email=${result.data.email}&verification_sent=1`);
};

export const resendVerificationEmail = async (email: string) => {
  const emailVerificationToken = generateEmailVerificationToken();

  try {
    await updateUserVerificationToken(email, null, emailVerificationToken);
    await sendVerificationEmail(email, emailVerificationToken);
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

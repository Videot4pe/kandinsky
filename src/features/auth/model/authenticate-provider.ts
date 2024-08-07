"use server";

import { signIn } from "@/shared/lib/auth";
import { AuthError } from "next-auth";
import { EmailNotVerifiedError } from "@/shared/actions/errors";
import { isUsersEmailVerified } from "@/shared/actions/auth";

export const authenticateWithProvider = async (_: any, formData: FormData) => {
  try {
    const id = formData.get("id");
    if (typeof id !== "string") return "Something went wrong.";
    await signIn(id);
  } catch (error) {
    throw error;
  }
};

export const authenticateWithCredentials = async (
  _: any,
  formData: FormData
) => {
  try {
    await isUsersEmailVerified(formData.get("email") as string);
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    if (error instanceof EmailNotVerifiedError) {
      return error.message;
    }
    throw error;
  }
};

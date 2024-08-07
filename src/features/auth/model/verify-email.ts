"use server";

import {
  findUserByEmail,
  updateUserVerificationToken,
} from "@/shared/api/prisma/users-api";

export const verifyEmail = async (email: string, token: string) => {
  try {
    const user = await findUserByEmail(email);
    if (!user || token !== user.emailVerifToken) {
      throw new Error("Invalid verification token");
    }
    return updateUserVerificationToken(user.email);
  } catch (error) {
    throw error;
  }
};

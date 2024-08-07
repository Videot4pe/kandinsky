import prisma from "@/shared/lib/prisma";
import type { User } from "@prisma/client";

export function createUser(
  email: string,
  password: string,
  emailVerifToken: string
) {
  return prisma.user.create({
    data: {
      email,
      password,
      emailVerifToken,
    },
  });
}

export function updateUserVerificationToken(
  email: string,
  emailVerifiedAt: Date | null = new Date(),
  verificationToken: string | null = null
) {
  return prisma.user.update({
    where: { email },
    data: {
      emailVerifiedAt: emailVerifiedAt,
      emailVerifToken: verificationToken,
    },
  });
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  if (!email) return null;
  return prisma.user.findUnique({ where: { email } });
};

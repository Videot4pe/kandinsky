import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import YandexProvider from "next-auth/providers/yandex";
import Credentials from "@auth/core/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/shared/api/prisma/users-api";

async function getUser(
  email: string
): Promise<{ email: string; password: string } | null> {
  try {
    return await findUserByEmail(email);
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

export const authOptions = {
  trustHost: true,
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET ?? "",
    }),
    YandexProvider({
      clientId: process.env.NEXT_PUBLIC_YANDEX_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_YANDEX_SECRET ?? "",
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);

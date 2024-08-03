import GithubProvider from "next-auth/providers/github";
import YandexProvider from "next-auth/providers/yandex";
import Credentials from "@auth/core/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/shared/actions/auth";

async function getUser(
  email: string
): Promise<{ email: string; password: string } | null> {
  try {
    return await findUserByEmail(email);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const authOptions = {
  trustHost: true,
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnDashboard = nextUrl.pathname === "/";

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        const isOnAuth =
          nextUrl.pathname === "/sign-in" || nextUrl.pathname === "/sign-up";
        if (isOnAuth) return Response.redirect(new URL("/", nextUrl));
        return true;
      }
      return true;
    },
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
        // Parsing and validating incoming credentials using Zod
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          // If user exists, compare hashed passwords
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          // If passwords match, return the user
          if (passwordsMatch) return user;
        }

        // If credentials are invalid, log and return null
        console.log("Invalid credentials");
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

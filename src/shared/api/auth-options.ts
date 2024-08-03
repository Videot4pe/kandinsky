import GithubProvider from "next-auth/providers/github";
import YandexProvider from "next-auth/providers/yandex";
import Email from "next-auth/providers/email";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET ?? "",
    }),
    YandexProvider({
      clientId: process.env.NEXT_PUBLIC_YANDEX_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_YANDEX_SECRET ?? "",
    }),
    // Email({
    //   server: process.env.NEXT_PUBLIC_EMAIL_SERVER,
    //   from: process.env.NEXT_PUBLIC_EMAIL_FROM,
    // }),
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};

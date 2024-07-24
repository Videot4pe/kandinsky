import GithubProvider from "next-auth/providers/github";
import YandexProvider from "next-auth/providers/yandex";

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
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  // theme: {
  //   colorScheme: 'light',
  // },
  secret: process.env.NEXT_PUBLIC_SECRET,
};

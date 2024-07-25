import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/shared/lib/utils";
import Providers from "@/app/providers";

export const metadata: Metadata = {
  title: "Kandinsky",
  description: "Kandinsky app",
  icons: {
    icon: "/favicon.ico",
  },
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

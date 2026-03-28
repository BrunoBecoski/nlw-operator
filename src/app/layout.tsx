import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { TRPCReactProvider } from "@/trpc/client";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "devroast | paste your code. get roasted.",
  description:
    "Drop your code below and we'll rate it — brutally honest or full roast mode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${spaceMono.variable} antialiased bg-radiation-pattern text-text-primary min-h-screen`}
      >
        <TRPCReactProvider>
          <Navbar />
          <main>{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

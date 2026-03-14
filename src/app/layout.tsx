import type { Metadata } from "next";
import { IBM_Plex_Mono, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono-secondary",
  weight: ["400", "500", "600"],
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
      <body
        className={`${jetbrainsMono.variable} ${ibmPlexMono.variable} antialiased font-sans bg-bg-page text-text-primary min-h-screen`}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ByWay",
  description: "Your Travel Partner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <link rel="icon" href="/assets/logo" sizes="any"></link>
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}
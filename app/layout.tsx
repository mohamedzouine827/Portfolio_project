import type { Metadata } from "next";

import "./globals.css";

import { Plus_Jakarta_Sans } from "next/font/google";
export const metadata: Metadata = {
  title: "MOHAMED ZOUINE",
  description: "Portfolio for mohamed zouine to showacase some work and skills",
};

const poppins = Plus_Jakarta_Sans({
  subsets: ["latin"],

});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

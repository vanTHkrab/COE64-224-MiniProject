import type { Metadata } from "next";
import {Geist, Geist_Mono, Madimi_One, Dangrek} from "next/font/google";
import "./globals.css";
import {SessionProvider } from "next-auth/react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const madimiOne = Madimi_One({
  variable: "--font-madimi-one",
  subsets: ["latin"],
  weight: "400",
});

const dangrek = Dangrek({
  variable: "--font-dangrek",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${madimiOne.className} antialiased`}
      >
        <SessionProvider>
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}

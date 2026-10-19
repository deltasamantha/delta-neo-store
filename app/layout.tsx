import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Blog",
  description: "A minimal blog explaining Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <div className=" min-h-dvh bg-zinc-200 text-zinc-950">
        <div className=" mx-auto flex min-h-dvh w-full max-w-[1100px] flex-"></div>
      <body className="min-h-full flex flex-col">{children}</body>
      </div>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuth from "@/provider/NextAuth";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LINK NEST",
  description: "A collection of all social media links in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <NextAuth>
          {children}
          <Toaster />
        </NextAuth>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const cabin = Cabin({
  weight: "400", // Next.js allows 100-900
  style: "normal",
  subsets: ["latin"],
  variable: "--font-cabin", // optional CSS variable
});

export const metadata: Metadata = {
  title: "prodo.",
  description: "Be your best version",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${cabin.variable} antialiased`}>
          <header className="border-b">
            <Navbar />
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

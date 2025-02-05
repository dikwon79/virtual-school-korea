"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${
          geistMono.variable
        } antialiased fullscreen-bg  ${
          isHomePage
            ? "bg-[url('/images/main1.png')]  bg-cover h-screen"
            : "bg-[#111827] bg-cover h-screen"
        }`}
      >
        <AuthProvider>
          <Header />
          <div className="w-full">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

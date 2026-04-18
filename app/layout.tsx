import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/app/(auth)/context/AuthContext";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import LayoutShell from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: "엄마표 영어 · 원어민 만들기",
  description: "7살 이전, 집에서 시작하는 영어 노출 프로그램",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen">
        <StyledComponentsRegistry>
          <AuthProvider>
            <LayoutShell>{children}</LayoutShell>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

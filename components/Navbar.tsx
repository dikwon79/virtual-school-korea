"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/app/(auth)/context/AuthContext";
import { usePathname } from "next/navigation";
import Image from "next/image";

export async function logOut() {
  const response = await fetch("/api/logout", { method: "POST" });
  if (response.redirected) {
    window.location.href = response.url;
  }
}

const NAV_ITEMS = [
  { label: "프로그램", href: "/courses" },
  { label: "커리큘럼", href: "/#curriculum" },
  { label: "후기", href: "/#stories" },
  { label: "자주 묻는 질문", href: "/#faq" },
];

export default function Header() {
  const { user, loading } = useAuth();
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {}, [pathname]);

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 bg-[color:var(--bg)]/85 backdrop-blur-md border-b hairline">
      <nav className="container-wide">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 no-underline"
          >
            <Image
              src="/logo.svg"
              alt="Virtual School"
              width={28}
              height={28}
              priority
            />
            <span className="text-base font-semibold ink tracking-tight">
              Virtual School
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm body-text hover:ink transition-colors no-underline"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user?.username ? (
              <div className="relative">
                <button
                  onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
                  className="flex items-center gap-2"
                >
                  <Image
                    className="h-8 w-8 rounded-full"
                    src="/images/members/default-avatar.jpeg"
                    alt="User avatar"
                    width={32}
                    height={32}
                  />
                </button>
                {isAvatarMenuOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-12 w-44 bg-white border hairline shadow-sm"
                  >
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2.5 text-sm body-text hover:bg-[color:var(--bg)] no-underline"
                    >
                      대시보드
                    </Link>
                    <button
                      onClick={logOut}
                      className="block w-full text-left px-4 py-2.5 text-sm body-text hover:bg-[color:var(--bg)]"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm body-text hover:ink no-underline hidden sm:inline"
                >
                  로그인
                </Link>
                <Link
                  href="/join"
                  className="text-sm font-medium text-white bg-[color:var(--ink)] px-4 py-2 no-underline hover:opacity-90 transition-opacity"
                >
                  시작하기
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

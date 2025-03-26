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
export default function Header() {
  const { user, loading } = useAuth();

  const [hasScrolled, setHasScrolled] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname(); // ✅ 페이지 변경 감지
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 64) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log("router", user);
  }, [user, pathname]); // ✅ URL이 변경될 때도 실행되도록 설정

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <header
      className={`z-[100] w-full fixed top-0 transition-colors duration-300 ${
        hasScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <nav>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 justify-between">
            {/* Logo */}
            <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <Image
                    className="block h-8 w-auto lg:hidden"
                    src="/m.svg"
                    alt="Logo"
                    width={32} // 너비 설정 (h-8 = 32px)
                    height={32} // 높이 설정
                    priority // 중요한 이미지라면 추가
                  />

                  <Image
                    className="hidden h-8 w-auto lg:block"
                    src="/m.svg"
                    alt="Logo"
                    width={32}
                    height={32}
                    priority
                  />
                </Link>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:flex sm:ml-6 sm:space-x-8 sm:items-center sm:h-full">
              {[
                "Courses",
                "Quiz",
                "Reviews",
                "Community",
                "FAQ",
                "Roadmap",
              ].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Login / Profile */}
            <div className="ml-auto flex items-center">
              {user?.username ? (
                <div className="relative flex items-center">
                  <button
                    onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
                  >
                    <Image
                      className="h-8 w-8 rounded-full"
                      src="/images/members/default-avatar.jpeg"
                      alt="User avatar"
                      width={32} // h-8 (8 * 4px = 32px)
                      height={32} // w-8 (8 * 4px = 32px)
                      priority // 중요한 이미지라면 추가
                    />
                  </button>
                  {isAvatarMenuOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 top-12 z-50 mt-2 w-48 bg-white shadow-lg"
                    >
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={logOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="mr-8 text-gray-500 hover:text-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    href="/join"
                    className="bg-blue-600 px-8 py-2 text-white rounded-md hover:bg-blue-500"
                  >
                    Join
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

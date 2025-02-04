import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false); // New state to track if it's client-side

  useEffect(() => {
    setIsClient(true); // Mark that we're on the client side
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Only render on the client side to avoid hydration mismatch
  if (!isClient) {
    return null; // Or you could return a loading spinner or placeholder
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
            {/* Mobile Hamburger Icon */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center rounded-md p-2
                  text-gray-400 transition duration-150 ease-in-out
                  hover:bg-gray-100
                  hover:text-gray-500
                  focus:bg-gray-100
                  focus:text-gray-500 focus:outline-none
                  dark:hover:bg-gray-600
                  dark:hover:text-gray-400
                  dark:focus:bg-gray-600
                  dark:focus:text-gray-400"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={`inline-flex ${isMenuOpen ? "hidden" : "block"}`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={`inline-flex ${isMenuOpen ? "block" : "hidden"}`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <a href="/">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="/m.svg"
                    alt="Logo"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="/m.svg"
                    alt="Logo"
                  />
                </a>
              </div>
            </div>

            {/* Desktop Menu Links */}
            <div className="hidden sm:flex sm:ml-6 sm:space-x-8 sm:items-center sm:h-full">
              <Link
                href="/courses"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Courses
              </Link>
              <Link
                href="/quiz"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                QuizQuiz
              </Link>
              <Link
                href="/reviews"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Reviews 🔥
              </Link>
              <Link
                href="/community"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Community
              </Link>
              <Link
                href="/faq"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                FAQ
              </Link>
              <Link
                href="/roadmap"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Roadmap
              </Link>
            </div>

            {/* Login and Join buttons aligned to the right */}
            <div className="flex items-center ml-auto">
              <a
                className="mr-8 hidden items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:text-gray-700 focus:outline-none sm:block dark:text-gray-400 dark:hover:text-gray-200"
                href="/login"
              >
                Login
              </a>
              <div className="flex-shrink-0">
                <a
                  className="relative inline-flex items-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium leading-5 text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-500 focus:border-blue-700 focus:outline-none focus:ring focus:ring-blue-400 active:bg-blue-700 dark:border dark:border-white dark:bg-white dark:text-gray-700 dark:hover:bg-transparent dark:hover:text-white"
                  href="/join"
                >
                  <span>Join</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu Links */}
          {isMenuOpen && (
            <div className="sm:hidden">
              <div className="space-y-1 pb-4 pt-2">
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                >
                  Login
                </Link>
                <Link
                  href="/courses"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                >
                  Courses
                </Link>
                <Link
                  href="/challenges"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                >
                  Challenges
                </Link>
                <Link
                  href="/reviews"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                >
                  Reviews 🔥
                </Link>
                <Link
                  href="/community"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                >
                  Community
                </Link>
                <Link
                  href="/faq"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                >
                  FAQ
                </Link>
                <Link
                  href="/roadmap"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                >
                  Roadmap
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

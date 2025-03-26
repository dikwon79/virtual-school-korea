import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // 서버 렌더링 중에는 아무것도 렌더링하지 않음
  return (
    <footer className="bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* 로고 및 슬로건 */}
          <div className="mt-8 flex flex-col items-center xl:mt-0">
            <Image
              src="/m-gray.svg"
              alt="Virtual School Korea Logo"
              width={56} // w-14 (14 * 4px = 56px)
              height={56} // 높이를 명시적으로 지정
              className="mb-8"
              priority // 중요한 이미지라면 페이지 로딩 시 우선 로드
            />
            <span className="text-gray-400">
              Speak louder! That is the way to master Korean.
            </span>
          </div>

          {/* 회사 정보 */}
          <div className="grid gap-14 lg:grid-cols-2 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="col-span-2 text-xs text-gray-500 dark:text-gray-400">
                <h4 className="mb-4 text-sm font-semibold uppercase leading-5 tracking-wider text-gray-400 md:text-gray-300">
                  원샷 원킬
                </h4>
                유한회사 버츄얼스쿨코리아 <br />
                대표: 김승현 <br />
                개인정보책임관리자: 권동일 <br />
                사업자번호: 000-00-0000 <br />
                주소: 청주시 흥덕구 <br />
                - <br />
                원격평생교육원: 충북시 충북교육지원청(제2024-00호)
                <br />
                통신판매업 신고번호: 2024-충북흥덕-2000
                <br />
                이메일: help [@] vsk.com
                <br />
                전화번호: 010-0000-0000
              </div>
            </div>

            {/* 네비게이션 메뉴 */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-semibold uppercase leading-5 tracking-wider text-gray-400 md:text-gray-300">
                  Navigation
                </h4>
                <ul className="mt-4">
                  <li className="mt-4">
                    <Link
                      className="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                      href="/courses"
                    >
                      Courses
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                      href="/quiz"
                    >
                      QuizQuiz
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                      href="/reviews"
                    >
                      Reviews
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                      href="/community"
                    >
                      Community
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                      href="/faq"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                      href="/roadmap"
                    >
                      Roadmap
                    </Link>
                  </li>
                </ul>
              </div>

              {/* 법적 정보 */}
              <div>
                <h4 className="text-sm font-semibold uppercase leading-5 tracking-wider text-gray-400 dark:text-gray-300">
                  Legal
                </h4>
                <ul className="mt-4">
                  <li>
                    <Link
                      className="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                      href="/policies/terms-and-conditions"
                    >
                      이용약관
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                      href="/policies/privacy-policy"
                    >
                      개인정보취급방침
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                      href="/policies/refund-policy"
                    >
                      취소 및 환불정책
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 연락처 및 SNS */}
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-400 md:flex md:items-center md:justify-between">
          <div className="flex flex-col items-center md:order-2 md:flex-row">
            <div className="order-1 grid grid-cols-4 gap-5 md:order-2">
              <Link
                rel="noreferrer"
                href="https://www.instagram.com/"
                target="_blank"
                className="block h-6 w-6 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M13.028 2c1.125.003 1.696.009 2.189.023l.194.007c.224.008.445.018.712.03c1.064.05 1.79.218 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.012.266.022.487.03.712l.006.194c.015.492.021 1.063.023 2.188l.001.746v1.31a79 79 0 0 1-.023 2.188l-.006.194c-.008.225-.018.446-.03.712c-.05 1.065-.22 1.79-.466 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465l-.712.03l-.194.006c-.493.014-1.064.021-2.189.023l-.746.001h-1.309a78 78 0 0 1-2.189-.023l-.194-.006a63 63 0 0 1-.712-.031c-1.064-.05-1.79-.218-2.428-.465a4.9 4.9 0 0 1-1.771-1.153a4.9 4.9 0 0 1-1.154-1.772c-.247-.637-.415-1.363-.465-2.428l-.03-.712l-.005-.194A79 79 0 0 1 2 13.028v-2.056a79 79 0 0 1 .022-2.188l.007-.194c.008-.225.018-.446.03-.712c.05-1.065.218-1.79.465-2.428A4.9 4.9 0 0 1 3.68 3.678a4.9 4.9 0 0 1 1.77-1.153c.638-.247 1.363-.415 2.428-.465c.266-.012.488-.022.712-.03l.194-.006a79 79 0 0 1 2.188-.023zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2a3 3 0 1 1 .001 6a3 3 0 0 1 0-6m5.25-3.5a1.25 1.25 0 0 0 0 2.5a1.25 1.25 0 0 0 0-2.5"
                  ></path>
                </svg>
              </Link>
              {/* YouTube, Facebook, GitHub 등 링크 추가 가능 */}
            </div>
          </div>
          <p className="mt-8 text-center text-base leading-6 text-gray-400 md:order-1 md:mt-0 md:text-left">
            © 2025 Virtual School Korea. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

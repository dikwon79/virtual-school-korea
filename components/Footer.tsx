import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-24 border-t hairline bg-[color:var(--bg)]">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <Image
                src="/logo.svg"
                alt="Virtual School"
                width={32}
                height={32}
              />
              <span className="text-base font-semibold ink tracking-tight">
                Virtual School
              </span>
            </Link>
            <p className="mt-5 body-text text-sm leading-relaxed max-w-sm">
              아이의 영어는 사교육이 아니라 일상의 시간으로 자랍니다.
              <br />
              7살 이전, 집에서 만드는 원어민 영어 환경.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="kicker">Program</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                ["프로그램", "/courses"],
                ["커리큘럼", "/#curriculum"],
                ["후기", "/#stories"],
                ["자주 묻는 질문", "/#faq"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm body-text hover:ink transition-colors no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="kicker">회사 정보</h4>
            <div className="mt-4 text-xs body-text leading-relaxed">
              <p className="font-medium ink">유한회사 버츄얼스쿨코리아</p>
              <p className="mt-1">대표 김승현 · 사업자번호 000-00-0000</p>
              <p className="mt-1">청주시 흥덕구</p>
              <p className="mt-1">
                통신판매업 신고번호 2024-충북흥덕-2000
              </p>
              <p className="mt-2">help [@] vsk.com · 010-0000-0000</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t hairline flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="text-xs text-[color:var(--muted)]">
            © 2025 Virtual School Korea. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <Link
              href="/policies/terms-and-conditions"
              className="body-text hover:ink no-underline"
            >
              이용약관
            </Link>
            <Link
              href="/policies/privacy-policy"
              className="body-text hover:ink no-underline"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/policies/refund-policy"
              className="body-text hover:ink no-underline"
            >
              환불정책
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

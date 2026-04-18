import Link from "next/link";
import FeatureGrid from "@/components/FeaturesGrid";
import CourseList from "@/components/CourseList";
import BookStack from "@/components/BookStack";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="container-wide pt-16 md:pt-28 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="kicker">엄마표 영어 · 원어민 만들기</div>

            <h1 className="mt-8 text-4xl md:text-6xl lg:text-7xl font-bold ink tracking-tight leading-[1.1]">
              아이의 영어는
              <br />
              엄마의{" "}
              <span className="relative inline-block">
                <span className="relative z-10">시간</span>
                <span className="absolute left-0 right-0 bottom-1 h-3 bg-[color:var(--accent-soft)] -z-0" />
              </span>
              으로
              <br />
              자랍니다.
            </h1>

            <p className="mt-10 max-w-xl body-text text-lg md:text-xl leading-relaxed">
              학원도, 원어민 과외도 아닙니다. 아이가 매일 듣고, 보고, 만나는
              시간의 총량. 7살 이전의 3,000시간이 평생의 영어를 결정합니다.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/courses"
                className="inline-block text-base font-medium text-white bg-[color:var(--ink)] px-7 py-3.5 no-underline hover:opacity-90 transition-opacity"
              >
                프로그램 살펴보기
              </Link>
              <Link
                href="#curriculum"
                className="text-base font-medium ink border-b pb-1 no-underline transition-colors"
                style={{ borderColor: "var(--accent)" }}
              >
                커리큘럼 먼저 보기 →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative bg-[color:var(--bg-cream)] p-8 md:p-12">
              <BookStack className="w-full h-auto" />
              <div className="absolute top-6 right-6 text-[11px] font-medium tracking-[0.18em] text-[color:var(--ink)]/60 uppercase">
                A Shelf for 7 Years
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why — methodology (cream block) */}
      <section className="bg-[color:var(--bg-cream-soft)] border-y hairline">
        <div className="container-prose py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-4">
              <div className="kicker">왜 엄마표 영어인가</div>
              <div className="mt-6 w-10 h-px bg-[color:var(--accent)]" />
            </div>
            <div className="md:col-span-8">
              <h2 className="text-3xl md:text-5xl font-bold ink tracking-tight leading-tight">
                학원이 아이에게
                <br />
                줄 수 없는 것.
                <br />
                <span className="text-[color:var(--accent)]">
                  시간, 일상, 그리고 엄마.
                </span>
              </h2>
            </div>
          </div>

          <FeatureGrid />
        </div>
      </section>

      {/* Curriculum roadmap */}
      <section id="curriculum" className="container-prose py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
          <div className="md:col-span-4">
            <div className="kicker">연령별 로드맵</div>
            <div className="mt-6 w-10 h-px bg-[color:var(--accent)]" />
          </div>
          <div className="md:col-span-8">
            <h2 className="text-3xl md:text-5xl font-bold ink tracking-tight leading-tight">
              7년의 여정,
              <br />
              단계마다 다른 호흡.
            </h2>
            <p className="mt-6 body-text text-lg leading-relaxed max-w-2xl">
              같은 책, 같은 속도는 없습니다. 아이의 발달과 관심에 맞춰
              듣기 · 읽기 · 발화의 비중을 달리합니다.
            </p>
          </div>
        </div>

        <CourseList />
      </section>

      {/* Pull quote — deep background */}
      <section
        id="stories"
        className="bg-[color:var(--bg-deep)] text-[color:var(--bg)]"
      >
        <div className="container-prose py-20 md:py-28">
          <div className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase opacity-50 mb-10">
            엄마들의 기록
          </div>
          <blockquote className="text-2xl md:text-4xl font-medium leading-[1.4] tracking-tight max-w-4xl">
            <span
              className="text-6xl leading-none align-top mr-2"
              style={{ color: "var(--accent-soft)" }}
            >
              &ldquo;
            </span>
            처음엔 저부터 영어가 두려웠어요. 그런데 아이와 함께 하루 20분씩
            읽다 보니, 2년이 지난 지금 아이는 ORT 5단계를 혼자 읽습니다.
            대단한 비법이 아니라, 매일이 쌓였을 뿐이에요.
          </blockquote>
          <div className="mt-10 flex items-center gap-4 text-sm opacity-70">
            <div
              className="w-10 h-10 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <div>
              <div className="font-medium text-[color:var(--bg)]">
                6살 아이 엄마
              </div>
              <div className="opacity-80">프로그램 24개월 차</div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing — cream */}
      <section className="bg-[color:var(--bg-cream)]">
        <div className="container-prose py-24 md:py-32 text-center">
          <div className="kicker mb-10">Start Tonight</div>
          <h2 className="text-3xl md:text-5xl font-bold ink tracking-tight leading-tight">
            오늘 저녁,
            <br />
            <span style={{ color: "var(--accent)" }}>책 한 권</span>부터.
          </h2>
          <p className="mt-8 body-text text-lg leading-relaxed max-w-xl mx-auto">
            거창한 시작은 필요하지 않습니다. 커리큘럼을 보고, 첫 책을
            골라보세요. 나머지는 매일의 20분이 해냅니다.
          </p>
          <div className="mt-12">
            <Link
              href="/courses"
              className="inline-block text-base font-medium text-white bg-[color:var(--ink)] px-8 py-4 no-underline hover:opacity-90 transition-opacity"
            >
              프로그램 살펴보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

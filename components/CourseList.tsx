import Link from "next/link";

const stages = [
  {
    age: "0—3세",
    stage: "듣기 환경",
    goal: "소리로 영어에 익숙해지는 시기",
    color: "var(--accent)",
    activities: [
      "영어 동요·마더구스 매일 1시간",
      "보드북·터치북으로 엄마와 읽기",
      "영상 노출은 최소, 소리 중심",
    ],
  },
  {
    age: "4—5세",
    stage: "반응기",
    goal: "문장 단위로 반응하고 따라하는 시기",
    color: "var(--sage)",
    activities: [
      "JYP·ORT 1-2단계 함께 읽기",
      "흘려듣기 2시간 · 집중듣기 30분",
      "생활 속 짧은 영어 대화 시작",
    ],
  },
  {
    age: "6—7세",
    stage: "발화 확장",
    goal: "자기 말로 영어를 꺼내는 시기",
    color: "var(--mustard)",
    activities: [
      "ORT 3-6단계, 챕터북 진입",
      "영어 영상·게임으로 자발적 몰입",
      "쓰기 시작, 워크북 주 2회",
    ],
  },
];

export default function CourseList() {
  return (
    <div className="border-t hairline">
      {stages.map((s, idx) => (
        <div
          key={s.age}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-12 border-b hairline items-start"
        >
          <div className="md:col-span-3 flex items-start gap-4">
            <div
              className="w-2 h-16 mt-2 flex-shrink-0"
              style={{ background: s.color }}
            />
            <div>
              <div className="font-mono text-sm text-[color:var(--muted)]">
                단계 {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="mt-2 text-4xl md:text-5xl font-bold ink tracking-tight">
                {s.age}
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <h3 className="text-2xl md:text-3xl font-bold ink">{s.stage}</h3>
            <p className="mt-3 body-text text-[15px] leading-relaxed">
              {s.goal}
            </p>
          </div>

          <div className="md:col-span-4">
            <ul className="space-y-2.5">
              {s.activities.map((a) => (
                <li key={a} className="flex gap-3 text-[15px] body-text">
                  <span
                    className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                    style={{ background: s.color }}
                  />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="py-12 flex justify-center">
        <Link
          href="/courses"
          className="text-sm font-medium ink border-b pb-1 no-underline transition-colors"
          style={{ borderColor: "var(--accent)" }}
        >
          전체 프로그램 보기 →
        </Link>
      </div>
    </div>
  );
}

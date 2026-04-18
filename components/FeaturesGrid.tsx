const principles = [
  {
    number: "01",
    color: "var(--accent)",
    title: "노출의 총량이 실력을 만듭니다",
    body: "원어민이 평생 듣는 영어 시간은 약 3,000시간. 학원 한두 시간으로는 닿을 수 없습니다. 집에서, 매일, 조금씩 쌓아가는 것만이 유일한 길입니다.",
  },
  {
    number: "02",
    color: "var(--sage)",
    title: "교재가 아닌 책으로 배웁니다",
    body: "문법책에는 아이가 살아갈 삶의 언어가 없습니다. 영어 원서는 아이에게 영어가 공부가 아닌 세계임을 느끼게 합니다.",
  },
  {
    number: "03",
    color: "var(--mustard)",
    title: "완성이 아닌 시작을 7살 이전에",
    body: "언어 결정적 시기의 마지막 문이 7살입니다. 이 시기의 한 시간은 이후 열 시간의 가치를 가집니다.",
  },
];

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x hairline">
      {principles.map((p) => (
        <article
          key={p.number}
          className="md:px-10 first:md:pl-0 last:md:pr-0"
        >
          <div
            className="font-mono text-2xl font-bold"
            style={{ color: p.color }}
          >
            {p.number}
          </div>
          <h3 className="mt-4 text-xl md:text-2xl font-bold ink leading-snug">
            {p.title}
          </h3>
          <p className="mt-4 text-[15px] body-text leading-relaxed">
            {p.body}
          </p>
        </article>
      ))}
    </div>
  );
}

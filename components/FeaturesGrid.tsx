import Image from "next/image";

const features = [
  { title: "4주 완성", imgSrc: "/_next/static/media/calendar.8f9c600f.png" },
  { title: "쓰기 과제", imgSrc: "/_next/static/media/web-dev.eadc8c2d.png" },
  {
    title: "디스코드채널",
    imgSrc: "/_next/static/media/chat-bubble.78ee581a.png",
  },
  { title: "보너스 강의", imgSrc: "/_next/static/media/coupon.6ad50aad.png" },
];

export default function FeatureGrid() {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-16 mt-16 grid w-full max-w-lg grid-cols-2 gap-10 md:grid-cols-4">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-gray-700">
              <Image
                src={feature.imgSrc}
                alt={feature.title}
                width={64}
                height={64}
              />
            </div>
            <span className="mt-2.5 font-medium  text-white">
              {feature.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

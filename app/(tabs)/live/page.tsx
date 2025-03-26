import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface VideoMeta {
  name: string;
}

interface VideoPlayback {
  hls: string;
}

interface Video {
  uid: string;
  meta: VideoMeta;
  playback: VideoPlayback;
  thumbnail: string;
  status: string | object; // status가 object일 수 있음을 반영
}

// 서버 측에서 필요한 환경 변수 - TypeScript에서 컴파일 에러 방지용
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID ?? "";
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_KEY ?? "";

// 동영상 데이터를 Cloudflare Stream API로부터 가져오는 함수
async function getStreamVideo(): Promise<Video[]> {
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    throw new Error("Cloudflare account ID or token is not set.");
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching videos: ${response.statusText}`);
    }

    const data = await response.json();

    // Cloudflare API에서 받아온 데이터의 `result`가 동영상 배열이어야 한다고 가정
    return data.result as Video[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Live() {
  const videos = await getStreamVideo();

  return (
    <div className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
        Stream
      </h1>
      <Link
        href="/streams/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {videos.map(
          (video) => (
            <iframe
              key={video.uid}
              src={`https://${process.env.CLOUDFLARE_DOMAIN}/${video.uid}/iframe`}
              className="border: none"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              id="stream-player"
            ></iframe>
          )
          //   video.thumbnail ? ( // `thumbnail` 존재 여부 조건부 렌더링
          //     <img
          //       key={video.uid} // React는 반복 요소에 고유한 key가 필요
          //       src={video.thumbnail}
          //       alt={`Thumbnail for video ${video.uid}`} // 접근성 향상
          //       className="rounded-lg shadow-lg" // Tailwind 스타일 추가 가능
          //     />
          //   ) : (
          //     <div
          //       key={video.uid}
          //       className="w-full h-56 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center"
          //     >
          //       <span className="text-sm text-gray-600 dark:text-gray-400">
          //         No Thumbnail Available
          //       </span>
          //     </div>
          //   )
        )}
      </div>
    </div>
  );
}

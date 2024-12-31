import Link from "next/link";
import "@/lib/db";

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen p-6">
      <div className="flex flex-col items-start gap-4 ml-10 mt-48">
        <h1 className="text-8xl">Virtual School</h1>
        <h2 className="text-4xl mt-6">버츄얼 스쿨에 어서오세요!</h2>
      </div>
    </div>
  );
}

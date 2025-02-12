"use client";
import Link from "next/link";
import { useAuth } from "../../(auth)/context/AuthContext";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Profile() {
  const { user, loading } = useAuth(); // 사용자 정보와 로딩 상태를 가져옴

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      {/* Hero Section (배경 이미지) */}
      <div className="w-full h-[91vh] flex flex-col justify-center items-center bg-cover bg-center text-white text-center px-10">
        <h2 className="text-4xl mt-6">
          Dashboard: {user?.username || "Guest"}
        </h2>
      </div>
      <div>
        <Link
          href="/courses/add"
          className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
        >
          <PlusIcon className="size-10" />
        </Link>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { useAuth } from "../../(auth)/context/AuthContext";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  const createChatRoom = async () => {
    const res = await fetch("/api/chatRoom/create", {
      method: "POST",
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/whip/${data.roomId}`);
    } else {
      console.error("Failed to create chat room");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="w-full h-[91vh] flex flex-col justify-center items-center bg-cover bg-center text-white text-center px-10">
        <h2 className="text-4xl mt-6">
          Dashboard: {user?.username || "Guest"}
        </h2>
      </div>
      <button
        onClick={createChatRoom}
        className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
      >
        방송하기
      </button>
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

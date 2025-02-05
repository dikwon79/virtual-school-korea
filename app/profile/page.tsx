"use client";
import { useAuth } from "../context/AuthContext";

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
        <h2 className="text-4xl mt-6">Profile: {user?.username || "Guest"}</h2>
      </div>
    </div>
  );
}

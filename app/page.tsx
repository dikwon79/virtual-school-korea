"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GetStartedButton from "@/components/mbutton";
import FeatureGrid from "@/components/FeaturesGrid";
import CourseList from "@/components/CourseList";
import Image from "next/image";

interface LectureType {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function Home() {
  const [lectures, setLectures] = useState<LectureType[]>([]);

  useEffect(() => {
    async function fetchLectures() {
      try {
        const res = await fetch("/api/lectures");
        if (!res.ok) throw new Error("Failed to fetch lectures");
        const data = await res.json();
        setLectures(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLectures();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      {/* Hero Section (배경 이미지) */}
      <div className="w-full h-[91vh] flex flex-col justify-center items-center bg-cover bg-center text-white text-center px-10">
        <h1 className="text-8xl font-bold">Virtual School</h1>
        <h2 className="text-4xl mt-6">버츄얼 스쿨에 어서오세요!</h2>
        <div className="w-44 mt-4">
          <GetStartedButton title="Get started" href="/home" />
        </div>
      </div>

      {/* 강의 섹션 */}
      <div className="w-full bg-[#0d1217] text-white min-h-[60vh] pt-10">
        <div className="max-w-6xl mx-auto px-0">
          <h3 className="text-3xl font-semibold text-center mb-8">
            강의 살펴보기
          </h3>
          <Slider {...settings} className="w-full">
            {lectures.map((lecture) => (
              <div key={lecture.id} className="px-4">
                <div className="flex flex-col items-center bg-white shadow-lg rounded-lg h-[250px] relative">
                  {/* Image */}
                  <Image
                    src={lecture.image}
                    alt={lecture.title}
                    className="w-full h-52 object-fill"
                  />

                  {/* Link (Box over the image) */}
                  <Link
                    href={`/lecture/${lecture.id}`}
                    className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-3 font-semibold"
                  >
                    {lecture.title}
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Quiz Quiz 섹션   */}
      <div className="w-full bg-gray-700 pt-10 dark:bg-gray-900">
        <div className="mb-14 text-center text-white">
          <h3 className="text-3xl font-semibold text-center mb-8">Quiz Quiz</h3>
          <h5 className="text-xl dark:text-gray-300">
            수강률 100%를 위한 별도 프로그램
          </h5>
        </div>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <FeatureGrid />
          <CourseList />

          <div className="flex justify-center m-4">
            {/* 중앙 정렬을 위한 flex 추가 */}
            <GetStartedButton
              href="http://naver.com"
              title="자세히보기"
              className="20%"
            />{" "}
            {/* 버튼에만 고정 너비 적용 */}
          </div>
        </div>
      </div>
    </div>
  );
}

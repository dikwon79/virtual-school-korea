"use client";

import React, { useState } from "react";

import dynamic from "next/dynamic";

// "ReactPlayer"를 dynamic import합니다.
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
type Lesson = {
  id: number;
  title: string;
  videoUrl: string;
  order: number;
};

export default function LecturePlayer({
  courseTitle,
  lessons,
}: {
  courseTitle: string;
  lessons: Lesson[];
}) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(
    lessons?.[0] || { id: 0, title: "", videoUrl: "", order: 0 }
  );
  const [isSidebarVisible, setSidebarVisibility] = useState(true);

  return (
    <div className="bg-gray-700 dark:bg-gray-900 min-h-screen relative">
      <div className="grid w-full grid-cols-2 bg-gray-700 px-4 py-2 shadow-md dark:bg-gray-900 xl:grid-cols-5 xl:pr-16">
        <div className="flex items-center justify-center">
          <a href={`/courses/${lessons[0].id}/lecturehall`}>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="h-8 w-8 cursor-pointer text-gray-300"
            >
              <path
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </a>
          <span className="cur mx-auto inline-flex cursor-pointer items-center rounded-full bg-gray-500 py-1 pl-1 pr-5 text-sm text-white shadow-xl dark:bg-gray-700">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="mr-3 h-8 w-8"
            >
              <path
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            <span className="text-xs md:text-sm">Hide Sidebar</span>
          </span>
        </div>
        <div className="flex items-center justify-end pl-16 md:justify-between xl:col-span-4">
          <button className="mr-3 hidden cursor-pointer items-center rounded-full bg-gray-500 px-5 py-1 text-sm text-white shadow-xl dark:bg-gray-700 sm:pl-1 sm:pr-5 md:inline-flex">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="h-8 w-8 sm:mr-3"
            >
              <path
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            <span className="hidden sm:block">
              Previous <span className="hidden lg:inline">Lecture</span>
            </span>
          </button>
          <button className="inline-flex cursor-pointer items-center rounded-full bg-green-600 px-5 py-1 text-sm text-white shadow-xl sm:pl-1 sm:pr-5">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="h-8 w-8 sm:mr-3"
            >
              <path
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            <span className="hidden sm:block">
              Complete <span className="hidden lg:inline">and Continue</span>
            </span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5 min-h-screen">
        {/* Sidebar */}
        <div className="col-span-1 bg-gray-200">
          <div className="flex flex-col items-center bg-white px-4 py-3 shadow-md dark:bg-gray-700 dark:text-white h-full">
            <span className="mb-5 mt-3 block text-xl">{courseTitle}</span>
            <div className="flex w-full flex-col">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`focus:outline-none cursor-pointer px-6 py-4 text-sm font-medium leading-5 text-gray-600 dark:text-gray-400 ${
                    lesson.id === selectedLesson.id
                      ? "bg-blue-100"
                      : "bg-gray-100 dark:bg-slate-800"
                  }`}
                >
                  {`#${lesson.order} ${lesson.title}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-4 bg-gray-900 py-4 px-8 flex flex-col space-y-6">
          {/* Video Section */}
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {selectedLesson.title}
            </h1>
            <div
              className="w-full h-full"
              style={{
                position: "relative",
                paddingTop: "56.25%" /* 16:9 Aspect Ratio */,
              }}
            >
              <ReactPlayer
                className="absolute top-0 left-0 w-full h-full"
                controls
                url={`https://www.youtube-nocookie.com/embed/${selectedLesson.videoUrl}`}
                title={selectedLesson.title}
                width="100%"
                height="100%"
              />
            </div>
          </div>

          {/* Bottom Section (Extra Info) */}
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-4">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
              강의 정보
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              강의 순서: #{selectedLesson.order}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              강의 제목: {selectedLesson.title}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              URL: {selectedLesson.videoUrl}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

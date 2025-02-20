"use client";

import React, { useState } from "react";
import ReactPlayer from "react-player";

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
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(lessons[0]); // 첫번째 강의 기본 선택
  const [isSidebarVisible, setSidebarVisibility] = useState(true);

  return (
    <div className="bg-gray-700 dark:bg-gray-900 min-h-screen relative">
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
            <div className="mt-4">
              <ReactPlayer
                className="w-full max-w-3xl rounded-md shadow-md"
                controls
                url={selectedLesson.videoUrl}
                title={selectedLesson.title}
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

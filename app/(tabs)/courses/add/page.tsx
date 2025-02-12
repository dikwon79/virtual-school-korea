"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useActionState, useState } from "react";
import { getUploadUrl, uploadProduct } from "./action";

export default function AddCourse() {
  const [preview, setPreview] = useState("");
  const [lessons, setLessons] = useState([{ id: 1, title: "", videoUrl: "" }]);

  const [uploadUrl, setUploadUrl] = useState("");
  const [photoId, setphotoId] = useState("");

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    const { success, result } = await getUploadUrl();

    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setphotoId(id);
    }
  };

  // 📌 새 레슨 추가
  const handleAddLesson = () => {
    setLessons([
      ...lessons,
      { id: lessons.length + 1, title: "", videoUrl: "" },
    ]);
  };

  // 📌 특정 레슨 삭제
  const handleRemoveLesson = (id: number) => {
    setLessons(lessons.filter((lesson) => lesson.id !== id));
  };

  // 📌 레슨 제목 또는 동영상 URL 업데이트
  const handleLessonChange = (
    id: number,
    field: "title" | "videoUrl",
    value: string
  ) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === id ? { ...lesson, [field]: value } : lesson
      )
    );
  };

  const interceptAction = async (_: any, formData: FormData) => {
    //upload image to cloudFlare

    const file = formData.get("photo");
    if (!file) {
      return;
    }
    const cloudFlareForm = new FormData();
    cloudFlareForm.append("file", file);
    const response = await fetch(uploadUrl, {
      method: "post",
      body: cloudFlareForm,
    });
    if (response.status != 200) {
      return;
    }
    //replace photo in formData

    const photoUrl = `https://imagedelivery.net/2gtCuGfa22HmLSsViP25ew/${photoId}`;
    formData.set("photo", photoUrl);
    return uploadProduct(_, formData);
    //call upload product.
  };

  const [state, action] = useActionState(interceptAction, null);
  return (
    <div className="flex flex-col lg:flex-row gap-10 py-20 px-2 max-w-7xl mx-auto bg-black-50 rounded-lg shadow-lg">
      <form action={action} className="w-full flex flex-col lg:flex-row gap-10">
        {/* 🔹 왼쪽: 이미지 & 코스 입력 */}
        <div className="w-full lg:w-2/5 flex flex-col gap-5">
          {/* 🔹 이미지 업로드 */}
          <label
            htmlFor="photo"
            className="border-2 aspect-square flex items-center justify-center flex-col
             text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
            style={{ backgroundImage: `url(${preview})` }}
          >
            {preview === "" ? (
              <>
                <PhotoIcon className="w-20" />
                <div className="text-neutral-400 text-sm">
                  강의 홍보 사진을 추가해주세요.
                </div>
              </>
            ) : null}
          </label>
          <input
            onChange={onImageChange}
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            className="hidden"
          />

          {/* 🔹 코스 입력 */}
          <Input
            name="title"
            required
            placeholder="제목"
            type="text"
            errors={state?.fieldErrors.title}
          />
          <Input
            name="price"
            type="number"
            required
            placeholder="가격"
            errors={state?.fieldErrors.price}
          />
          <Input
            name="description"
            type="text"
            required
            placeholder="자세한 설명"
            errors={state?.fieldErrors.description}
          />
          <Input
            name="level"
            type="text"
            required
            placeholder="수준"
            errors={state?.fieldErrors.level}
          />
        </div>

        {/* 🔹 오른쪽: 레슨 목록 */}
        <div className="w-full lg:w-2/5 flex flex-col border-l border-gray-300 pl-6 *:text-white">
          <h3 className="text-lg font-semibold text-white">레슨 목록</h3>

          {/* 🔹 총 레슨 개수를 서버로 전송하기 위한 hidden input */}
          <input type="hidden" name="lessonCount" value={lessons.length} />

          {lessons.map((lesson, index) => (
            <div key={lesson.id} className="flex items-center gap-3 mt-3">
              <span className="text-gray-500">#{index + 1}</span>

              {/* 🔹 제목 입력 */}
              <Input
                type="text"
                placeholder="레슨 제목"
                value={lesson.title}
                onChange={(e) =>
                  handleLessonChange(lesson.id, "title", e.target.value)
                }
                name={`lessonTitle-${lesson.id}`}
              />

              {/* 🔹 동영상 링크 입력 */}
              <Input
                type="text"
                placeholder="동영상 링크"
                value={lesson.videoUrl}
                onChange={(e) =>
                  handleLessonChange(lesson.id, "videoUrl", e.target.value)
                }
                name={`lessonVideo-${lesson.id}`}
              />

              {lessons.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveLesson(lesson.id)}
                  className="text-red-500"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}

          {/* 🔹 레슨 추가 버튼 */}
          <button
            type="button"
            onClick={handleAddLesson}
            className="mt-3 px-3 py-2 bg-blue-500 text-white rounded-md text-sm"
          >
            + 레슨 추가
          </button>
        </div>

        {/* 🔹 제출 버튼 */}
        <div className="w-full lg:w-1/5 flex flex-col">
          <Button text="작성 완료" />
        </div>
      </form>
    </div>
  );
}

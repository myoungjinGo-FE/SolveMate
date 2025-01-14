"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";

interface SignUpFormData {
  username: string;
  nickname: string;
  profileImage: string | null;
  kakaoId: string | null;
}

interface SignupFormProps {
  onSubmit: (formData: SignUpFormData) => void;
}

function SignupFormContent({ onSubmit }: SignupFormProps) {
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<SignUpFormData>({
    defaultValues: {
      username: "",
      nickname: "",
      profileImage: null,
      kakaoId: null,
    },
  });

  useEffect(() => {
    const kakao_id = searchParams?.get("kakao_id");
    const username = searchParams?.get("username");
    const profile_image = searchParams?.get("profile_image");

    if (kakao_id || username || profile_image) {
      reset({
        kakaoId: kakao_id ?? null,
        username: username ?? "",
        profileImage: profile_image ?? null,
        nickname: username ?? "",
      });
    }
  }, [searchParams, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full max-w-md mx-auto p-8"
    >
      <div className="flex justify-center mb-6">
        <Image
          src={watch("profileImage") || "/images/default-profile.png"}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="username"
          className="text-sm font-semibold text-gray-600"
        >
          사용자 이름
        </label>
        <input
          id="username"
          {...register("username", {
            required: "사용자 이름을 입력해주세요",
            minLength: {
              value: 3,
              message: "사용자 이름은 최소 3자 이상이어야 합니다",
            },
            maxLength: {
              value: 50,
              message: "사용자 이름은 50자를 초과할 수 없습니다",
            },
          })}
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          placeholder="사용자 이름을 입력해주세요"
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="nickname"
          className="text-sm font-semibold text-gray-600"
        >
          닉네임
        </label>
        <input
          id="nickname"
          {...register("nickname", {
            required: "닉네임을 입력해주세요",
            minLength: {
              value: 2,
              message: "닉네임은 최소 2자 이상이어야 합니다",
            },
            maxLength: {
              value: 50,
              message: "닉네임은 50자를 초과할 수 없습니다",
            },
          })}
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          placeholder="닉네임을 입력해주세요"
        />
        {errors.nickname && (
          <p className="text-sm text-red-500">{errors.nickname.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 px-6 rounded-lg text-white font-semibold
          ${
            isSubmitting
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 transition-colors"
          }`}
      >
        {isSubmitting ? "처리중..." : "가입 완료"}
      </button>
    </form>
  );
}

function SignupFormLoading() {
  return (
    <div className="flex justify-center items-center h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
    </div>
  );
}

export function SignupForm(props: SignupFormProps) {
  return (
    <Suspense fallback={<SignupFormLoading />}>
      <SignupFormContent {...props} />
    </Suspense>
  );
}

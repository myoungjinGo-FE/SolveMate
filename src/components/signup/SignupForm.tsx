"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface SignUpFormData {
  username: string;
  nickname: string;
  profile_picture: string | null;
  kakao_id: string | null;
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
      profile_picture: null,
      kakao_id: null,
    },
  });

  useEffect(() => {
    const kakao_id = searchParams?.get("kakao_id");
    const username = searchParams?.get("username");
    const profile_picture = searchParams?.get("profile_image");

    if (kakao_id || username || profile_picture) {
      reset({
        kakao_id: kakao_id ?? null,
        username: username ?? "",
        profile_picture: profile_picture ?? null,
        nickname: username ?? "",
      });
    }
  }, [searchParams, reset]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center mb-6">
            <Image
              src={watch("profile_picture") || "/images/default-profile.png"}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">사용자 이름</Label>
            <Input
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
              placeholder="사용자 이름을 입력해주세요"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname">닉네임</Label>
            <Input
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
              placeholder="닉네임을 입력해주세요"
            />
            {errors.nickname && (
              <p className="text-sm text-red-500">{errors.nickname.message}</p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              처리중...
            </>
          ) : (
            "가입 완료"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

function SignupFormLoading() {
  return (
    <div className="flex justify-center items-center h-[400px]">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
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

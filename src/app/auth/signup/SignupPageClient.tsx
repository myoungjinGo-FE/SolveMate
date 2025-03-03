"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { toast } from "react-hot-toast";
import { SignupForm } from "@/components/signup/SignupForm";
import { SignUpFormData } from "@/lib/types/users";
import { UsersAPI } from "@/lib/api/users";

export function SignupPageClient() {
  const router = useRouter();

  const handleSignup = async (formData: SignUpFormData) => {
    try {
      const userInfo = await UsersAPI.signUp(formData);

      localStorage.setItem("access_token", userInfo.access_token);
      localStorage.setItem("refresh_token", userInfo.refresh_token);

      toast.success("회원가입이 성공적으로 완료되었습니다!");
      router.push(ROUTES.HOME);
    } catch (error) {
      console.error("회원가입 에러:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "회원가입 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <div className="min-h-screen p-12 flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-700 mb-2">회원가입</h1>
        <p className="text-base text-gray-500">
          SolveMate에 오신 것을 환영합니다!
        </p>
      </div>

      <SignupForm onSubmit={handleSignup} />
    </div>
  );
}

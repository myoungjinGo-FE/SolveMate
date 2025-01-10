"use client";

import { LoginButton } from "./LoginButton";
import { LoginFooter } from "./LoginFooter";
import { LoginHeader } from "./LoginHeader";

export const LoginContainer = () => {
  const handleKakaoLogin = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?client_id=193e87458436f2acebe89e3acee04f15&redirect_uri=http://localhost:8000/api/oauth/kakao&response_type=code";
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-50 px-6 py-12">
      <LoginHeader />
      <div className="flex flex-col items-center w-full max-w-md text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">SolveMate</h1>
        <p className="text-lg text-gray-600 mb-12">
          함께 문제를 해결하는 가장 쉬운 방법
        </p>
        <LoginButton onClick={handleKakaoLogin} />
      </div>
      <LoginFooter />
    </div>
  );
};

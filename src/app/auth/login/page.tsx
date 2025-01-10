// app/auth/login/page.tsx (서버 컴포넌트)
import type { Metadata } from "next";
import { LoginPageClient } from "./LoginPageClient";

export const metadata: Metadata = {
  title: "로그인 - SolveMate",
  description: "SolveMate에 오신 것을 환영합니다",
};

export default function LoginPage() {
  return <LoginPageClient />;
}

// app/auth/signup/page.tsx
import type { Metadata } from "next";
import { SignupPageClient } from "./SignupPageClient";

export const metadata: Metadata = {
  title: "회원가입 - SolveMate",
  description: "SolveMate 회원가입",
};

export default function SignupPage() {
  return <SignupPageClient />;
}

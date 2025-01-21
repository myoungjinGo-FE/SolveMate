import type { Metadata } from "next";
import Dashboard from "./client";

export const metadata: Metadata = {
  title: "홈 - SolveMate",
  description: "SolveMate 메인 페이지",
};

export default function HomePage() {
  return <Dashboard />;
}

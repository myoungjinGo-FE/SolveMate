import type { Metadata } from "next";
import { HomePageClient } from "./HomePageClient";

export const metadata: Metadata = {
  title: "홈 - SolveMate",
  description: "SolveMate 메인 페이지",
};

export default function HomePage() {
  return <HomePageClient />;
}

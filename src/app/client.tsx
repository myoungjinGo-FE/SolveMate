"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TodaysProblemCard } from "@/components/dashboard/TodaysProblemCard";
import { ProblemSolvingChart } from "@/components/dashboard/ProblemSolvingChart";
import { ProblemScheduleTable } from "@/components/dashboard/ProblemScheduleTable";
import { User } from "@/lib/types/users";
import { UsersAPI } from "@/lib/api/users";
import { ROUTES } from "@/constants/routes";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 토큰 처리 로직
  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    // 토큰이 URL에 있고 아직 리다이렉트하지 않은 경우에만 처리
    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      // URL에서 파라미터 제거 (현재 경로로 리다이렉트)
      const cleanUrl = window.location.pathname;
      router.replace(cleanUrl);
    }

    // 이미 리다이렉트했거나 토큰이 없는 경우에만 사용자 정보 가져오기
    if (accessToken || refreshToken) {
      fetchUserData();
    }
  }, [searchParams]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await UsersAPI.me();
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // 로그인 페이지로 리다이렉트
    setUser(null);
    router.push(ROUTES.HOME);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <DashboardHeader user={user} onLogout={handleLogout} />
      <div className="grid gap-6 md:grid-cols-2">
        <TodaysProblemCard user={user} />
        <ProblemSolvingChart user={user} />
      </div>
      <ProblemScheduleTable user={user} />
    </div>
  );
}

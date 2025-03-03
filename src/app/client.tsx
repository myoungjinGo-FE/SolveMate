"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TodaysProblemCard } from "@/components/dashboard/TodaysProblemCard";
import { ProblemSolvingChart } from "@/components/dashboard/ProblemSolvingChart";
import { ProblemScheduleTable } from "@/components/dashboard/ProblemScheduleTable";
import { User } from "@/lib/types/users";
import { UsersAPI } from "@/lib/api/users";
import { ROUTES } from "@/constants/routes";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // 서버 사이드에서 실행 방지

    const accessToken =
      searchParams.get("access_token") || localStorage.getItem("access_token");
    const refreshToken =
      searchParams.get("refresh_token") ||
      localStorage.getItem("refresh_token");

    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      // URL에서 파라미터 제거
      router.replace(window.location.pathname);
    }

    if (accessToken || refreshToken) {
      fetchUserData();
    }
  }, [searchParams]);

  const fetchUserData = async () => {
    try {
      const userData = await UsersAPI.me();
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
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

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

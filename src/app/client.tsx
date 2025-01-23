"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/userAuth";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TodaysProblemCard } from "@/components/dashboard/TodaysProblemCard";
import { ProblemSolvingChart } from "@/components/dashboard/ProblemSolvingChart";
import { ProblemScheduleTable } from "@/components/dashboard/ProblemScheduleTable";
import { User } from "@/lib/types/users";
import { UsersAPI } from "@/lib/api/users";

interface DecodedToken {
  user_id: number;
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
}

export default function Dashboard() {
  const { clearTokens } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          const decoded: DecodedToken = jwtDecode(accessToken);
          const userData = await UsersAPI.getUserInfo(decoded.user_id);
          setUser(userData);
        }
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
        toast.error("사용자 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    clearTokens();
    toast.success("로그아웃되었습니다.");
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

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

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { User } from "@/lib/types/auth";
import { authAPI } from "@/lib/api/auth";
import { useAuth } from "@/hooks/userAuth";

interface DecodedToken {
  user_id: number;
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
}

export function HomePageClient() {
  const router = useRouter();
  const { clearTokens } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          router.push(ROUTES.AUTH.LOGIN);
          return;
        }

        const decoded: DecodedToken = jwtDecode(accessToken);
        const userData = await authAPI.getUserInfo(decoded.user_id);
        setUser(userData);
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
        toast.error("사용자 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    clearTokens();
    toast.success("로그아웃되었습니다.");
    router.push(ROUTES.AUTH.LOGIN);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-12 flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-700 mb-2">
          {user ? `안녕하세요, ${user.username}님!` : "환영합니다!"}
        </h1>
        <p className="text-base text-gray-500">
          SolveMate와 함께 문제를 해결해보세요.
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        로그아웃
      </button>
    </div>
  );
}

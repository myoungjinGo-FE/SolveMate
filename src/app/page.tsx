"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface DecodedToken {
  user_id: number;
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
}

interface User {
  id: number;
  username: string;
  nickname: string;
  profile_picture: string | null;
  kakao_id: string | null;
}

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // `access_token` 가져오기
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          router.push("/login"); // login 페이지로 이동
          return;
        }

        // JWT 파싱
        const decoded: DecodedToken = jwtDecode(accessToken);
        const userId = decoded.user_id;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("사용자 정보를 가져오는데 실패했습니다.");
        }

        const userData: User = await response.json();

        // `username` 상태 업데이트
        setUsername(userData.username);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // LocalStorage에서 토큰 삭제
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    alert("로그아웃되었습니다.");
    // 홈 페이지로 이동 또는 리다이렉트 처리
    window.location.href = "/";
  };

  return (
    <>
      <div>{username ? `Hello, ${username}` : "Loading..."}</div>
      <button onClick={handleLogout} style={logoutButtonStyle}>
        로그아웃
      </button>
    </>
  );
}

const logoutButtonStyle: React.CSSProperties = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

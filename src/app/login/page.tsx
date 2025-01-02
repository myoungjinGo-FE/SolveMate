"use client";
import type { NextPage } from "next";
import Head from "next/head";
import { LoginContainer } from "../../components/login/LoginContainer";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams ? searchParams.get("access_token") : null;
    const refreshToken = searchParams
      ? searchParams.get("refresh_token")
      : null;

    if (accessToken && refreshToken) {
      // 토큰을 localStorage에 저장
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      // 루트 페이지로 이동
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [searchParams, router]);

  return (
    <>
      <Head>
        <title>로그인 - SolveMate</title>
        <meta name="description" content="SolveMate에 오신 것을 환영합니다" />
      </Head>
      <LoginContainer />
    </>
  );
};

export default LoginPage;

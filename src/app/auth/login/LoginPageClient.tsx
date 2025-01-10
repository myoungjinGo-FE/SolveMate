"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LoginContainer } from "@/components/login/LoginContainer";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/userAuth";

export function LoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTokens } = useAuth();

  useEffect(() => {
    const accessToken = searchParams?.get("access_token");
    const refreshToken = searchParams?.get("refresh_token");

    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
      router.push(ROUTES.HOME);
    }
  }, [searchParams, router, setTokens]);

  return <LoginContainer />;
}

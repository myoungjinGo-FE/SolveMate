"use client";

import { Suspense } from "react";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LoginContainer } from "@/components/login/LoginContainer";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/userAuth";

// Loading component for Suspense fallback
function LoginLoading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
    </div>
  );
}

// Component that uses useSearchParams
function LoginContent() {
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

// Main export component wrapped in Suspense
export function LoginPageClient() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}

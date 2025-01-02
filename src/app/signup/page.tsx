"use client";
import { SignupFormData, SignupForm } from "@/components/signup/SignupForm";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const SignupPage: NextPage = () => {
  const router = useRouter();

  const handleSignup = async (formData: SignupFormData) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/users/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            nickname: formData.nickname,
            profile_picture: formData.profileImage || null,
            kakao_id: formData.kakaoId || null,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "회원가입에 실패했습니다.");
      }

      alert("회원가입이 성공적으로 완료되었습니다!");
      router.push("/"); // 메인 페이지로 이동
    } catch (error: any) {
      console.error("회원가입 에러:", error);
      alert(
        error.message || "회원가입 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <>
      <Head>
        <title>회원가입 - SolveMate</title>
        <meta name="description" content="SolveMate 회원가입" />
      </Head>

      <StyledContainer>
        <StyledHeader>
          <StyledTitle>회원가입</StyledTitle>
          <StyledSubtitle>SolveMate에 오신 것을 환영합니다!</StyledSubtitle>
        </StyledHeader>

        <SignupForm onSubmit={handleSignup} />
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.div`
  min-height: 100vh;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7fafc;
`;

const StyledHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const StyledTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
`;

const StyledSubtitle = styled.p`
  font-size: 16px;
  color: #718096;
`;

export default SignupPage;

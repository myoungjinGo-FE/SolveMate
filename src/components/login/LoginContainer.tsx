import styled from "styled-components";
import { LoginButton } from "./LoginButton";
import { LoginFooter } from "./LoginFooter";
import { LoginHeader } from "./LoginHeader";

export const LoginContainer = () => {
  const handleKakaoLogin = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?client_id=193e87458436f2acebe89e3acee04f15&redirect_uri=http://localhost:8000/api/oauth/kakao&response_type=code";
  };

  return (
    <StyledLoginWrapper>
      <LoginHeader />
      <StyledContentWrapper>
        <StyledTitle>SolveMate</StyledTitle>
        <StyledSubTitle>함께 문제를 해결하는 가장 쉬운 방법</StyledSubTitle>
        <LoginButton onClick={handleKakaoLogin} />
      </StyledContentWrapper>
      <LoginFooter />
    </StyledLoginWrapper>
  );
};

const StyledLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 48px 24px;
  background-color: #f8f9fa;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 420px;
  text-align: center;
`;

const StyledTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #212529;
  margin-bottom: 16px;
`;

const StyledSubTitle = styled.p`
  font-size: 18px;
  color: #495057;
  margin-bottom: 48px;
`;

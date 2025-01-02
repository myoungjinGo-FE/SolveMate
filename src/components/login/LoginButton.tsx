import styled from "styled-components";
import Image from "next/image";

interface LoginButtonProps {
  onClick: () => void;
}

export const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      <Image src="/images/vercel.svg" alt="Kakao Logo" width={24} height={24} />
      <span>카카오로 계속하기</span>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
  gap: 12px;
  background-color: #FEE500;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #FDD835;
  }

  span {
    font-size: 16px;
    font-weight: 600;
    color: #191919;
  }
`;

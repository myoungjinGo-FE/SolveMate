import { styled } from "styled-components";

export const LoginHeader = () => {
  return (
    <StyledHeader>
      <StyledLogo src="/images/logo.svg" alt="SolveMate Logo" />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;

const StyledLogo = styled.img`
  height: 32px;
`;

import styled from "styled-components";

export const LoginFooter = () => {
  return (
    <StyledFooter>
      <StyledText>© 2024 SolveMate. All rights reserved.</StyledText>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  width: 100%;
  text-align: center;
  padding: 24px 0;
`;

const StyledText = styled.p`
  font-size: 14px;
  color: #868e96;
`;

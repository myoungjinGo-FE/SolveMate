import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";

interface SignupFormProps {
  onSubmit: (formData: SignupFormData) => void;
}

export interface SignupFormData {
  kakaoId?: string | null; // Optional 필드로 수정
  username: string;
  profileImage?: string | null; // Optional 필드로 수정
  nickname: string;
}

export const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<SignupFormData>({
    kakaoId: null,
    username: "",
    profileImage: null,
    nickname: "",
  });

  useEffect(() => {
    const kakao_id = searchParams.get("kakao_id");
    const username = searchParams.get("username");
    const profile_image = searchParams.get("profile_image");

    if (kakao_id || username || profile_image) {
      setFormData((prev) => ({
        ...prev,
        kakaoId: kakao_id || null,
        username: username || "",
        profileImage: profile_image || null,
        nickname: username || "", // 카카오 이름을 기본 닉네임으로 설정
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledImageWrapper>
        <Image
          src={formData.profileImage || "/images/default-profile.png"}
          alt="Profile"
          width={100}
          height={100}
          style={{ borderRadius: "50%" }}
        />
      </StyledImageWrapper>

      <StyledInputGroup>
        <StyledLabel>사용자 이름</StyledLabel>
        <StyledInput
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="사용자 이름을 입력해주세요"
          required
        />
      </StyledInputGroup>

      <StyledInputGroup>
        <StyledLabel>닉네임</StyledLabel>
        <StyledInput
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력해주세요"
          required
        />
      </StyledInputGroup>

      <StyledButton type="submit">가입 완료</StyledButton>
    </StyledForm>
  );
};

// 스타일 컴포넌트들은 동일하게 유지
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 32px;
`;

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3182ce;
  }
`;

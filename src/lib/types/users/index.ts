export interface User {
  id: number;
  username: string;
  nickname: string;
  profile_picture?: string;
  kakao_id?: string;
}

export interface SignUpFormData {
  username: string;
  nickname: string;
  profileImage?: string | null;
  kakaoId?: string | null;
}
//

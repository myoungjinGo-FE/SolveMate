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
  profile_picture?: string | null;
  kakao_id?: string | null;
}

export interface UserWithToken extends User {
  access_token: string;
  refresh_token: string;
}

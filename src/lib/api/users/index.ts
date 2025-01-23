import { apiClient } from "@/lib/api-client";
import { SignUpFormData, SignUpRequest, User } from "@/lib/types/users";

export const UsersAPI = {
  signUp: async (formData: SignUpFormData): Promise<User> => {
    const requestData: SignUpRequest = {
      username: formData.username,
      nickname: formData.nickname,
      profile_picture: formData.profileImage || null,
      kakao_id: formData.kakaoId || null,
    };

    const response = await apiClient.post<User>(
      "/api/users/sign-up",
      requestData
    );
    return response.data;
  },
  getUserInfo: async (userId: number): Promise<User> => {
    const response = await apiClient.get<User>(`/api/users/${userId}`);
    return response.data;
  },
};

import { apiClient } from "@/lib/api-client";
import { SignUpFormData, User, UserWithToken } from "@/lib/types/users";

export const UsersAPI = {
  signUp: async (formData: SignUpFormData): Promise<UserWithToken> => {
    const response = await apiClient.post<UserWithToken>(
      "/api/users/sign-up",
      formData
    );
    return response.data;
  },
  getUserInfo: async (userId: number): Promise<User> => {
    const response = await apiClient.get<User>(`/api/users/${userId}`);
    return response.data;
  },
  me: async (): Promise<User> => {
    const response = await apiClient.get<User>(`/api/users/me`);
    return response.data;
  },
};

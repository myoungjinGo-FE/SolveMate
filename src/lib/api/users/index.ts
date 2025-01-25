import { apiClient } from "@/lib/api-client";
import { SignUpFormData, User } from "@/lib/types/users";

export const UsersAPI = {
  signUp: async (formData: SignUpFormData): Promise<User> => {
    const response = await apiClient.post<User>("/api/users/sign-up", formData);
    return response.data;
  },
  getUserInfo: async (userId: number): Promise<User> => {
    const response = await apiClient.get<User>(`/api/users/${userId}`);
    return response.data;
  },
};

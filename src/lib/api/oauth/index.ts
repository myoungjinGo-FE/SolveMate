import { apiClient } from "../../api-client";

export const authAPI = {
  getKakaoAuthUrl: () => `${apiClient.defaults.baseURL}/oauth/kakao`,
};

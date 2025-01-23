// Axios 공통 클라이언트 설정
import axios from "axios";
import { API_BASE_URL } from "@/constants/config";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // JWT 토큰
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { data } = error.response;
      throw new Error(data.message || "요청 처리 중 오류가 발생했습니다.");
    }
    throw error;
  }
);

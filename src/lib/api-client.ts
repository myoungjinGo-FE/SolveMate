import axios from "axios";
import { API_BASE_URL } from "@/constants/config";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가 - 모든 요청에 토큰 추가
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 재시도하지 않은 요청일 경우 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 토큰 갱신 요청
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          return Promise.resolve({ data: null });
        }

        const res = await axios.post(
          `${API_BASE_URL}/api/auth/refresh`,
          { refresh_token: refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // 새 토큰 저장
        const { access_token } = res.data;
        localStorage.setItem("access_token", access_token);

        // 새 토큰으로 헤더 업데이트
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

        // 원래 요청 재시도
        return apiClient(originalRequest);
      } catch {
        // 토큰 갱신 실패 시 로그아웃 및 홈으로 리다이렉트
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // 에러를 던지지 않고 빈 응답 리턴
        return Promise.resolve({ data: null });
      }
    }

    // 기타 에러 처리
    if (error.response) {
      const { data } = error.response;
      throw new Error(data.message || "요청 처리 중 오류가 발생했습니다.");
    }
    throw error;
  }
);

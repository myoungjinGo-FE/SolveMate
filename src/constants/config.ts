export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_BACKEND_URL environment variable is not defined"
  );
}

export const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
export const KAKAO_REDIRECT_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${API_BASE_URL}/api/oauth/kakao&response_type=code`;

// src/constants/routes.ts
export const ROUTES = {
  HOME: "/",
  AUTH: {
    SIGNUP: "/auth/signup",
    KAKAO: "/auth/kakao",
  },
  CHALLENGES: {
    LIST: "/challenges",
    DETAIL: (id: string | number) => `/challenges/${id}`,
    JOIN: (id: string | number) => `/challenges/${id}/join`,
  },
  GROUPS: {
    LIST: "/groups",
    DETAIL: (id: string | number) => `/groups/${id}`,
    JOIN: (id: string | number) => `/groups/${id}/join`,
  },
} as const;

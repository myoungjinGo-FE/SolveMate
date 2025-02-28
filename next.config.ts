import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // styled-components 지원
  },
  images: {
    domains: ["img1.kakaocdn.net", "t1.kakaocdn.net", "k.kakaocdn.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img1.kakaocdn.net",
        pathname: "/thumb/**",
      },
      {
        protocol: "https",
        hostname: "t1.kakaocdn.net",
        pathname: "/account_images/**",
      },
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net",
        pathname: "/thumb/**",
      },
      {
        protocol: "http",
        hostname: "t1.kakaocdn.net",
        pathname: "/account_images/**",
      },
    ],
  },
};

export default nextConfig;

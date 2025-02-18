export type Platform = "BAEKJOON" | "PROGRAMMERS" | "LEETCODE";

export interface Problem {
  id?: number;
  title: string;
  platform: Platform;
  platform_display?: string;
  link: string;
  created_at?: string;
}

export type Platform = "BAEKJOON" | "PROGRAMMERS" | "LEETCODE";
export type Difficulty = "NONE" | "EASY" | "NORMAL" | "HARD";

export interface Problem {
  id?: number; // readOnly: true
  title: string; // required, maxLength: 200, minLength: 1
  platform: Platform; // required, enum
  difficulty: Difficulty; // optional, enum
  link: string; // required, format: uri, maxLength: 200, minLength: 1
  created_at?: string; // readOnly, format: date-time
}

import { Problem } from "../problems";

export interface ChallengeDay {
  date: string;
  problem: Problem;
  group?: number;
  author?: number;
}

import { Problem } from "../problems";
import { Solution } from "../solution";

export interface ChallengeDay {
  date: string; // required, format: date
  problem: Problem; // nested Problem object
  problem_id: number; // required
  group?: number; // readOnly: true
  author?: number; // readOnly: true
  day_solutions?: Solution[]; // readOnly: true, array of Solution
}

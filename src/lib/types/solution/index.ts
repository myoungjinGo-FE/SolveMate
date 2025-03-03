export type SolutionStatus = "SOLVED" | "FAILED" | "SKIPPED" | "IN_PROGRESS";

export interface Solution {
  id?: number; // readOnly: true
  user?: number; // readOnly: true
  challenge_day: number; // required
  status: SolutionStatus; // required, enum
  solution_link?: string | null; // optional, nullable, format: uri, maxLength: 200
  submitted_at?: string; // readOnly, format: date-time
  updated_at?: string; // readOnly, format: date-time
}

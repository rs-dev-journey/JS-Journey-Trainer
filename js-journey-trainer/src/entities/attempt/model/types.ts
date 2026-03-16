export interface Attempt {
  id: string;
  userId: string;
  testId: string;
  attemptNumber: number;

  finishedAt: number;
  durationMs: number;
  scorePercent: number;
}

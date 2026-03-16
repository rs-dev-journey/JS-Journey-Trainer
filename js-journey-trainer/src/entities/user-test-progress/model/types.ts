export type Status = 'completed' | 'notCompleted';

export interface UserTestProgress {
  userId: string;
  testId: string;
  attemptsCount: number;
  lastScorePercent: number | null;
  status: Status;
}

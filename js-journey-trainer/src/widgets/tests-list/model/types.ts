import type { Status } from '@/entities/user-test-progress';

export interface TestCardProgress {
  attemptsCount: number;
  lastScorePercent: number | null;
  status: Status;
}

export interface TestCardViewModel {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  progress: TestCardProgress;
}

export type OnOpenTest = (testId: string) => void;

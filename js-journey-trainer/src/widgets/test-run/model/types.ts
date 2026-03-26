export interface TestRunHeaderViewModel {
  progressLabel: string;
  progressPercent: number;
}

export interface ResultViewModel {
  score: string;
  correctCount: number;
  totalQuestions: number;
  duration: string;
}

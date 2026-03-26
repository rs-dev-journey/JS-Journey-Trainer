export interface Attempt {
  id: string;
  userId: string;
  testId: string;
  // attemptNumber: number;

  finishedAt: number;
  durationMs: number;
  scorePercent: number;
  status: string;
}

export interface AttemptAnswer {
  question: string;
  options: string[];
  selectedAnswerIndex: number;
}

export interface UserTestIncorrectAnswers {
  userId: string;
  testId: string;
  attemptId: string;
  attemptAnswers: AttemptAnswer[];
  score: number;
}

export type SaveIncorrectAnswersInput = UserTestIncorrectAnswers;

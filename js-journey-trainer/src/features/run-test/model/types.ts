export interface UserAnswer {
  questionIndex: number;
  selectedIndex: number;
}

export interface RunTestState {
  currentQuestionIndex: number;
  answersByQuestionIndex: Record<number, number>;
  startedAt: number | null;
  isCompleted: boolean;
}

export interface TestResult {
  id: string;
  testId: string;
  totalQuestions: number;
  correctCount: number;
  scorePercent: number;
  finishedAt: number;
  durationMs: number;
  answers: Record<number, number>;
}

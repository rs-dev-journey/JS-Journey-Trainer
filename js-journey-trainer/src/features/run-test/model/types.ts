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

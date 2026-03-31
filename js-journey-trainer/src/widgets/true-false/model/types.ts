export type TrueFalseQuestion = {
  id: number;
  statement: string;
  correct: boolean;
  explanation: string;
};

export type TrueFalseWidgetState = {
  currentIndex: number;
  score: number;
  status: 'idle' | 'answered' | 'checked' | 'finished';
  selectedAnswer: boolean | null;
};

export type TrueFalseSessionResult = {
  userId: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
};

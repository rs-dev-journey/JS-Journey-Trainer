export type TrueFalseQuestion = {
  id: number;
  statement: string;
  correct: boolean;
  explanation: string;
};

export type UserAnswer = {
  questionId: number;
  answer: boolean;
};

export type TrueFalseWidgetState = {
  status: 'idle' | 'answered' | 'checked';
  selectedAnswer: boolean | null;
};

export type TrueFalseResult = {
  questionId: number;
  selectedAnswer: boolean;
  isCorrect: boolean;
};

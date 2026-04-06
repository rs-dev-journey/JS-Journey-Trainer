export interface Question {
  id: number;
  order: number;
  type: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  questionCount: number;
  questions: Question[];
}

export type TestState = {
  currentTest: Test | null;
};

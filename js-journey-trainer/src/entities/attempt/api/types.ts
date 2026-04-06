export interface AttemptRow {
  id: string;
  user_id: string;
  test_id: string;
  finished_at: number;
  duration_ms: number;
  score_percent: number;
  status: string;
}

export interface AttemptAnswerRow {
  question: string;
  options: string[];
  selected_answer_index: number;
}

export interface UserTestIncorrectAnswersRow {
  id: string;
  user_id: string;
  test_id: string;
  attempt_id: string;
  attempt_answers: AttemptAnswerRow[];
  score: number;
}

export { mapResultToIncorrectAnswers } from './lib/map-result-to-incorrect-answers';
export { mapResultToUserProgress } from './lib/map-result-to-user-progress';
export { mapResultToAttempt } from './lib/map-result-to-attempt';

export { calculateResult } from './model/calculate-result';

export {
  getCurrentQuestion,
  getCurrentQuestionIndex,
  isLastQuestion,
  getCurrentQuestionNumber,
  getProgressPercent,
} from './model/selectors';

export {
  finishRun,
  getRunState,
  goNextQuestion,
  resetRun,
  saveAnswer,
  startRun,
} from './model/store';

export type { RunTestState, UserAnswer, TestResult } from './model/types';

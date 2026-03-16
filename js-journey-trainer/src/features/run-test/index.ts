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

export type { RunTestState, UserAnswer } from './model/types';

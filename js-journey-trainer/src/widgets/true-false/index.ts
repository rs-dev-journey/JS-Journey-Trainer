export type {
  TrueFalseQuestion,
  TrueFalseSessionResult,
  TrueFalseWidgetState,
} from './model/types';

export { trueFalseQuestion } from './model/mock';
export { isAnswerCorrect } from './lib/check-answer';
export { renderTrueFalseWidget } from './ui/render-true-false-widget';

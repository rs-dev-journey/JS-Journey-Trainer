import type { TrueFalseQuestion } from './types';
export const trueFalseQuestion: TrueFalseQuestion[] = [
  {
    id: 1,
    statement: 'In JavaScript, `null == undefined` returns true',
    correct: true,
    explanation: '`null` and `undefined` are equal only with loose equality `==`.',
  },
  {
    id: 2,
    statement: '`typeof null` returns "null".',
    correct: false,
    explanation: '`typeof null` returns "object"`. This is a known JavaScript quirk.',
  },
  {
    id: 3,
    statement: 'A const variable can be reassigned.',
    correct: false,
    explanation: '`const` prevents reassignment of the variable binding.',
  },
];

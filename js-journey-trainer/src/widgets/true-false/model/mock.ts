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
    explanation: '`typeof null` returns "object". This is a known JavaScript quirk.',
  },
  {
    id: 3,
    statement: 'A const variable can be reassigned.',
    correct: false,
    explanation: '`const` prevents reassignment of the variable binding.',
  },
  {
    id: 4,
    statement: '`===` compares both value and type.',
    correct: true,
    explanation: 'Strict equality checks values without type coercion.',
  },
  {
    id: 5,
    statement: '`Array.isArray([])` returns false.',
    correct: false,
    explanation: '`Array.isArray([])` returns true because the value is an array.',
  },
  {
    id: 6,
    statement: 'Variables declared with `let` are block-scoped.',
    correct: true,
    explanation: '`let` is limited to the block where it is declared.',
  },
  {
    id: 7,
    statement: '`setTimeout(fn, 0)` runs the function immediately before all other code.',
    correct: false,
    explanation: 'The callback is scheduled and runs after the current call stack is finished.',
  },
  {
    id: 8,
    statement: '`document.querySelector()` can return `null`.',
    correct: true,
    explanation: 'If no element matches the selector, the result is `null`.',
  },
  {
    id: 9,
    statement: 'A click event on a child element can bubble up to its parent.',
    correct: true,
    explanation: 'Events usually bubble from the target element up through its ancestors.',
  },
  {
    id: 10,
    statement: '`Number("42px")` returns 42.',
    correct: false,
    explanation: '`Number("42px")` returns `NaN` because the whole string is not a valid number.',
  },
];

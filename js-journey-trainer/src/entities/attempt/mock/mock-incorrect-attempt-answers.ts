import type { UserTestIncorrectAnswers } from '../model/types';

export const incorrectAttemptAnswersMock: UserTestIncorrectAnswers[] = [
  {
    userId: 'user-1',
    testId: 'js-basics-types',
    attemptId: 'attempt-3',
    attemptAnswers: [
      {
        question: 'What does typeof NaN return?',
        options: ['number', 'NaN', 'undefined', 'object'],
        selectedAnswerIndex: 1,
      },
    ],
    score: 90,
  },

  {
    userId: 'user-1',
    testId: 'js-scope-closures',
    attemptId: 'attempt-5',
    attemptAnswers: [
      {
        question:
          'What will the code output?\nfor (var i=0;i<3;i++) setTimeout(()=>console.log(i),0)',
        options: ['0 1 2', '1 2 3', '3 3 3', 'undefined undefined undefined'],
        selectedAnswerIndex: 0,
      },
      {
        question: 'What does hoisting mean in JS?',
        options: [
          'Moving declarations (not initializations) to the top of the scope',
          'Automatic type conversion',
          'Faster loop execution',
          'Prohibition of using var',
        ],
        selectedAnswerIndex: 2,
      },
    ],
    score: 80,
  },
];

import type { AsyncSorterTask } from '../model/types';
export const playlist: readonly AsyncSorterTask[] = [
  {
    id: 1,
    code: "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nconsole.log('3');",
    expected: ['1', '3', '2'],
    visualSteps: [
      { id: '1', label: 'log(1)', type: 'sync' },
      { id: '2', label: 'timeout(2)', type: 'macro' },
      { id: '3', label: 'log(3)', type: 'sync' },
    ],
  },
  {
    id: 2,
    code: "console.log('1');\nPromise.resolve().then(() => console.log('2'));\nconsole.log('3');",
    expected: ['1', '3', '2'],
    visualSteps: [
      { id: '1', label: 'log(1)', type: 'sync' },
      { id: '2', label: 'promise(2)', type: 'micro' },
      { id: '3', label: 'log(3)', type: 'sync' },
    ],
  },
  {
    id: 3,
    code: "setTimeout(() => console.log('1'), 0);\nPromise.resolve().then(() => console.log('2'));\nconsole.log('3');",
    expected: ['3', '2', '1'],
    visualSteps: [
      { id: '1', label: 'timeout(1)', type: 'macro' },
      { id: '2', label: 'promise(2)', type: 'micro' },
      { id: '3', label: 'log(3)', type: 'sync' },
    ],
  },
  {
    id: 4,
    code: "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');",
    expected: ['1', '4', '3', '2'],
    visualSteps: [
      { id: '1', label: 'log(1)', type: 'sync' },
      { id: '2', label: 'timeout(2)', type: 'macro' },
      { id: '3', label: 'promise(3)', type: 'micro' },
      { id: '4', label: 'log(4)', type: 'sync' },
    ],
  },
  {
    id: 5,
    code: "Promise.resolve().then(() => console.log('1'));\nqueueMicrotask(() => console.log('2'));\nsetTimeout(() => console.log('3'), 0);",
    expected: ['1', '2', '3'],
    visualSteps: [
      { id: '1', label: 'promise(1)', type: 'micro' },
      { id: '2', label: 'microtask(2)', type: 'micro' },
      { id: '3', label: 'timeout(3)', type: 'macro' },
    ],
  },
  {
    id: 6,
    code: "Promise.resolve().then(() => {\n  console.log('1');\n  setTimeout(() => console.log('2'), 0);\n});\nconsole.log('3');",
    expected: ['3', '1', '2'],
    visualSteps: [
      { id: '1', label: 'promise log(1)', type: 'micro' },
      { id: '2', label: 'inner timeout(2)', type: 'macro' },
      { id: '3', label: 'sync log(3)', type: 'sync' },
    ],
  },
  {
    id: 7,
    code: "Promise.resolve()\n  .then(() => console.log('1'))\n  .then(() => console.log('2'));\nconsole.log('3');",
    expected: ['3', '1', '2'],
    visualSteps: [
      { id: '1', label: 'then 1(1)', type: 'micro' },
      { id: '2', label: 'then 2(2)', type: 'micro' },
      { id: '3', label: 'sync log(3)', type: 'sync' },
    ],
  },
  {
    id: 8,
    code: "setTimeout(() => {\n  console.log('1');\n  Promise.resolve().then(() => console.log('2'));\n}, 0);\nconsole.log('3');",
    expected: ['3', '1', '2'],
    visualSteps: [
      { id: '1', label: 'timeout log(1)', type: 'macro' },
      { id: '2', label: 'inner promise(2)', type: 'micro' },
      { id: '3', label: 'sync log(3)', type: 'sync' },
    ],
  },
  {
    id: 9,
    code: "setTimeout(() => console.log('1'), 10);\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));",
    expected: ['3', '2', '1'],
    visualSteps: [
      { id: '1', label: 'timeout 10ms(1)', type: 'macro' },
      { id: '2', label: 'timeout 0ms(2)', type: 'macro' },
      { id: '3', label: 'promise(3)', type: 'micro' },
    ],
  },
  {
    id: 10,
    code: "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => {\n  console.log('3');\n  return Promise.resolve().then(() => console.log('4'));\n});",
    expected: ['1', '3', '4', '2'],
    visualSteps: [
      { id: '1', label: 'sync(1)', type: 'sync' },
      { id: '2', label: 'timeout(2)', type: 'macro' },
      { id: '3', label: 'promise(3)', type: 'micro' },
      { id: '4', label: 'inner promise(4)', type: 'micro' },
    ],
  },
];

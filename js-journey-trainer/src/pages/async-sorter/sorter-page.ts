import createElement from '../../shared/lib/dom/create-element';

export const createControls = () => {
  const hintButton = createElement('button', {
    classList: ['hint-button'],
    textContent: 'Show Hint',
  });
  const nextButton = createElement('button', {
    classList: ['next-button'],
    textContent: 'Next Task →',
    attributes: { disabled: true },
  });
  const container = createElement('div', {
    classList: ['controls'],
    children: [hintButton, nextButton],
  });
  return container;
};

export const renderSorterPage = (): HTMLElement => {
  return createElement('div', {
    classList: ['page-wrapper'],
    children: [
      createElement('div', {
        classList: ['engine'],
        children: [
          createContainer('stack', 'Call Stack'),
          createContainer('webapi', 'Web API'),
          createContainer('micro', 'Microtasks'),
          createContainer('macro', 'Macrotasks'),
        ],
      }),

      createElement('div', {
        classList: ['work-zone'],
        children: [
          createElement('div', { classList: ['code-window', 'code-display'] }),

          createElement('div', {
            classList: ['quiz-area'],
            children: [
              createElement('div', {
                textContent: 'Set the console.log output order:',
                classList: ['quiz-title'],
              }),
              createElement('div', { classList: ['slots', 'slots-row'] }),
              createElement('div', { classList: ['options'] }),
              createControls(),
            ],
          }),
        ],
      }),

      createElement('div', {
        classList: ['console-out'],
        attributes: { id: 'visual-console' },
        textContent: '> Terminal: waiting for input...',
      }),
    ],
  });
};

function createContainer(id: string, title: string): HTMLElement {
  return createElement('div', {
    classList: ['container'],
    attributes: { id },
    children: [createElement('h3', { textContent: title })],
  });
}

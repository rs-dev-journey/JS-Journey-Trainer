import createElement from '../../shared/lib/dom/create-element';

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
            ],
          }),
        ],
      }),

      createElement('div', {
        classList: ['console-out', 'visual-console'],

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

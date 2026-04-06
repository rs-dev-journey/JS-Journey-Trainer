import createElement from '@/shared/lib/dom/create-element';

export function createButton(text: string, className: string, disabled = false): HTMLButtonElement {
  return createElement('button', {
    classList: [className],
    textContent: text,
    attributes: {
      type: 'button',
      disabled,
    },
  });
}

export function createTextBlock(className: string, hidden = false): HTMLParagraphElement {
  return createElement('p', {
    classList: [className],
    attributes: {
      hidden,
    },
  });
}

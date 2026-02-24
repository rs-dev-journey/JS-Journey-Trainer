import type { ElementOptions } from './create-element.types';

export default function createElement<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  options: ElementOptions<T> = {},
): HTMLElementTagNameMap[T] {
  const { textContent, classList = [], attributes, children = [] } = options;

  const element = document.createElement(tag);

  if (textContent !== undefined) {
    element.textContent = textContent;
  }

  if (classList.length > 0) {
    element.classList.add(...classList);
  }

  if (attributes !== undefined) {
    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, String(value));
    }
  }

  element.append(...children);

  return element;
}

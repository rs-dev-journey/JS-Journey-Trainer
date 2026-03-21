import createElement from '@/shared/lib/dom/create-element';
import './style.css';

function createThemeButton() {
  const button = createElement('button', {
    attributes: { id: 'theme-switcher', title: 'Toggle Theme' },
    classList: ['theme-btn'],
    children: [
      createElement('span', { classList: ['sun-icon'], textContent: '☀️' }),
      createElement('span', { classList: ['moon-icon'], textContent: '🌙' }),
    ],
  });

  button.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  });

  return button;
}

export function renderHeader(parent: HTMLElement | null): void {
  if (!parent) return;

  const header = createElement('header', {
    classList: ['main-header'],
    children: [
      createElement('nav', {
        classList: ['nav-links'],
        children: [
          createElement('a', {
            classList: ['nav-item'],
            textContent: 'Practice',
            attributes: { href: '#/practice' },
          }),
        ],
      }),
      createElement('div', {
        classList: ['user-actions'],
        children: [
          createThemeButton(),
          createElement('div', {
            classList: ['user-profile'],
            children: [
              createElement('div', {
                classList: ['user-avatar'],
                children: [
                  createElement('img', {
                    attributes: { src: './camel.svg', alt: 'User icon' },
                  }),
                ],
              }),
              createElement('span', { classList: ['user-name'], textContent: 'User Name' }),
            ],
          }),
          createElement('button', { classList: ['logout-btn'], textContent: 'Logout' }),
        ],
      }),
    ],
  });

  parent.prepend(header);
}

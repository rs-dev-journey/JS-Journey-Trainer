import createElement from '@/shared/lib/dom/create-element';
import { SETTINGS_KEYS } from '../lib/constants';
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

function applySavedAvatarStyles() {
  const savedTheme = localStorage.getItem(SETTINGS_KEYS.THEME) || 'light';
  document.documentElement.dataset.theme = savedTheme;
}

function createUserDropdown(): HTMLElement {
  const menuTrigger = createElement('div', {
    classList: ['user-profile-trigger'],
    textContent: 'Explorer ▼',
  });

  const container = createElement('div', {
    classList: ['user-dropdown-container'],
    children: [menuTrigger],
  });

  return container;
}

export function renderHeader(parent: HTMLElement | null): void {
  if (!parent) return;

  applySavedAvatarStyles();

  const header = createElement('header', {
    classList: ['main-header'],
    children: [
      createElement('nav', {
        classList: ['nav-links'],
        children: [
          createElement('a', {
            classList: ['nav-logo'],
            textContent: 'JS Journey Trainer',
            attributes: { href: '#/practice' },
          }),
        ],
      }),
      createElement('div', {
        classList: ['user-actions'],
        children: [createThemeButton(), createUserDropdown()],
      }),
    ],
  });

  parent.prepend(header);
}

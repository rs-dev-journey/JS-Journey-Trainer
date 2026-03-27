import createElement from '@/shared/lib/dom/create-element';
import { SETTINGS_KEYS } from '../lib/constants';
import { AVATAR_ICONS } from '../lib/avatar-icons';
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
    const isDark = document.documentElement.dataset.theme === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem(SETTINGS_KEYS.THEME, newTheme);
    globalThis.dispatchEvent(new Event('themeChanged'));
  });

  return button;
}

function applySavedAvatarStyles() {
  const savedTheme = localStorage.getItem(SETTINGS_KEYS.THEME) || 'light';
  document.documentElement.dataset.theme = savedTheme;
}

function createAvatarElement(classList: string[] = []): HTMLElement {
  const container = createElement('div', { classList: ['user-avatar', ...classList] });
  const updateIcon = () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    container.innerHTML = isDark ? AVATAR_ICONS.JELLYFISH : AVATAR_ICONS.CAMEL;
  };
  updateIcon();
  globalThis.addEventListener('themeChanged', updateIcon);
  return container;
}

function createMenuTrigger(): HTMLElement {
  return createElement('div', {
    classList: ['user-profile-trigger'],
    children: [
      createAvatarElement(),
      createElement('span', { classList: ['user-name'], textContent: 'Explorer' }),
      createElement('span', { classList: ['dropdown-caret'], textContent: '▼' }),
    ],
  });
}

function createUserDropdown(): HTMLElement {
  const menuTrigger = createMenuTrigger();

  const dropdownMenu = createElement('div', {
    classList: ['user-dropdown-menu'],
    children: [
      createElement('a', {
        classList: ['dropdown-item'],
        textContent: 'About User',
        attributes: { href: '#/about' },
      }),
      createElement('hr', { classList: ['dropdown-divider'] }),
      createElement('button', {
        classList: ['dropdown-item', 'logout-btn'],
        textContent: 'Logout',
      }),
    ],
  });

  const container = createElement('div', {
    classList: ['user-dropdown-container'],
    children: [menuTrigger, dropdownMenu],
  });

  menuTrigger.addEventListener('click', (event) => {
    event.stopPropagation();
    container.classList.toggle('is-open');
  });

  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !container.contains(event.target)) {
      container.classList.remove('is-open');
    }
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

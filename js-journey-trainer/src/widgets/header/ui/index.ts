import createElement from '@/shared/lib/dom/create-element';
import { SETTINGS_KEYS } from '../lib/constants';
import { AVATAR_ICONS } from '../lib/avatar-icons';
import { getCurrentUserName, logout } from '@/entities/user';
import { navigate } from '@/shared/lib/router/navigate';
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

  const accent = localStorage.getItem(SETTINGS_KEYS.ACCENT);
  const bg = localStorage.getItem(SETTINGS_KEYS.BG);
  if (accent) document.documentElement.style.setProperty('--avatar-accent', accent);
  if (bg) document.documentElement.style.setProperty('--avatar-bg', bg);
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

function createColorOption(
  label: string,
  storageKey: string,
  cssVariable: string,
  defaultColor?: string,
): HTMLElement {
  const savedColor = localStorage.getItem(storageKey);

  const colorInput = createElement('input', {
    attributes: {
      type: 'color',
      value: savedColor || defaultColor,
    },
    classList: ['color-picker-input'],
  });

  colorInput.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement) {
      const newColor = event.target.value;

      document.documentElement.style.setProperty(cssVariable, newColor);
      localStorage.setItem(storageKey, newColor);
    }
  });

  return createElement('div', {
    classList: ['dropdown-item', 'color-option'],
    children: [createElement('label', { textContent: label }), colorInput],
  });
}

function createAvatarPreview(): HTMLElement {
  return createElement('div', {
    classList: ['settings-avatar-preview'],
    children: [
      createAvatarElement(['preview-size']),
      createElement('p', { classList: ['preview-label'], textContent: 'Preview' }),
    ],
  });
}

function createSoundToggle(): HTMLElement {
  const isMuted = localStorage.getItem(SETTINGS_KEYS.MUTED) === 'true';
  document.documentElement.dataset.muted = String(isMuted);

  const button = createElement('button', {
    classList: ['dropdown-item', 'sound-toggle'],
    textContent: isMuted ? 'Sound: OFF' : 'Sound: ON',
  });

  button.addEventListener('click', () => {
    const currentState = document.documentElement.dataset.muted === 'true';
    const newState = !currentState;

    document.documentElement.dataset.muted = String(newState);
    button.textContent = newState ? 'Sound: OFF' : 'Sound: ON';
    localStorage.setItem(SETTINGS_KEYS.MUTED, String(newState));
  });

  return button;
}

function openSettingsModal() {
  const modalOverlay = createElement('div', { classList: ['modal-overlay'] });

  const modalContent = createElement('div', {
    classList: ['modal-content'],
    children: [
      createElement('h2', { textContent: 'Personalization' }),
      createAvatarPreview(),
      createColorOption('Avatar Color: ', SETTINGS_KEYS.ACCENT, '--avatar-accent'),
      createColorOption('Background Color: ', SETTINGS_KEYS.BG, '--avatar-bg', '#e0f7fa'),
      createSoundToggle(),
      createElement('button', { classList: ['close-modal-btn'], textContent: 'Done' }),
    ],
  });

  modalOverlay.append(modalContent);
  document.body.append(modalOverlay);

  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) modalOverlay.remove();
  });

  modalContent.querySelector('.close-modal-btn')?.addEventListener('click', () => {
    modalOverlay.remove();
  });
}

function createMenuTrigger(): HTMLElement {
  const userName = getCurrentUserName() || 'Explorer';

  return createElement('div', {
    classList: ['user-profile-trigger'],
    children: [
      createAvatarElement(),
      createElement('span', { classList: ['user-name'], textContent: userName }),
      createElement('span', { classList: ['dropdown-caret'], textContent: '▼' }),
    ],
  });
}

const headerActions = {
  settingsButton: (() => {
    const btn: HTMLElement = createElement('button', {
      classList: ['dropdown-item'],
      textContent: 'Settings',
    });
    btn.addEventListener('click', () => openSettingsModal());
    return btn;
  })(),

  logoutButton: (() => {
    const btn: HTMLElement = createElement('button', {
      classList: ['dropdown-item', 'logout-btn'],
      textContent: 'Logout',
    });
    btn.addEventListener('click', async (): Promise<void> => {
      await logout();
      navigate('/login');
    });
    return btn;
  })(),

  aboutButton: (() => {
    const link: HTMLElement = createElement('a', {
      classList: ['dropdown-item'],
      textContent: 'About User',
    });
    link.addEventListener('click', (event: Event) => {
      event.preventDefault();
      navigate('/about');
    });
    return link;
  })(),

  logoButton: (() => {
    const link: HTMLElement = createElement('a', {
      classList: ['nav-logo'],
      textContent: 'JS Journey Trainer',
    });
    link.addEventListener('click', (event: Event) => {
      event.preventDefault();
      navigate('/practice');
    });
    return link;
  })(),
};

function createUserDropdown(): HTMLElement {
  const menuTrigger = createMenuTrigger();

  const dropdownMenu = createElement('div', {
    classList: ['user-dropdown-menu'],
    children: [
      createElement('a', {
        classList: ['dropdown-item'],
        textContent: 'About User',
        attributes: { href: '/about' },
      }),
      headerActions.settingsButton,
      createElement('hr', { classList: ['dropdown-divider'] }),
      headerActions.logoutButton,
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
        children: [headerActions.logoButton],
      }),
      createElement('div', {
        classList: ['user-actions'],
        children: [createThemeButton(), createUserDropdown()],
      }),
    ],
  });

  parent.prepend(header);
}

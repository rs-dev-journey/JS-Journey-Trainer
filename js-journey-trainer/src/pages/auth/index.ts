import './login.css';
import { createSubmitHandler } from './model';
import { createInputForm, firstLetterCapitalize } from './ui';
import createElement from '@/shared/lib/dom/create-element';

export function createLoginLayout() {
  const container = document.createElement('div');
  container.className = 'container-form';

  const authText = document.createElement('aside');
  authText.className = 'text-auth';
  authText.innerHTML = `
    <h2>Explore the World of JavaScript!</h2>
    <p>Join us to level up your skills and prepare for coding interviews.</p>`;

  const section = document.createElement('section');
  section.className = 'section-form';

  const authBlock = document.createElement('div');
  authBlock.className = 'auth-block';

  section.append(authBlock);
  container.append(authText, section);
  return { container, authBlock };
}

export function handleUsernameBlur(event: FocusEvent) {
  const input = event.currentTarget;
  if (!(input instanceof HTMLInputElement)) return;
  input.value = firstLetterCapitalize(input.value);
}

export function attachUsernameCapitalize(input: HTMLInputElement) {
  input.addEventListener('blur', handleUsernameBlur);
}

function createLoginForm() {
  const form = createElement('form', {
    classList: ['form'],
    attributes: {
      id: 'loginForm',
      novalidate: true,
    },
  });

  const serverError = createElement('p', {
    classList: ['server-error-form'],
  });

  const status = createElement('div', {
    classList: ['status-form'],
  });

  return { form, serverError, status };
}

function createAuthInputs() {
  const nameInput = createInputForm({
    labelText: 'Please, write your name',
    id: 'username',
    name: 'username',
    type: 'text',
    placeholder: 'Your name',
  });

  attachUsernameCapitalize(nameInput.input);

  const emailInput = createInputForm({
    labelText: 'Write your email',
    id: 'useremail',
    name: 'email',
    type: 'email',
    placeholder: 'E-mail',
  });

  const passwordInput = createInputForm({
    labelText: 'Enter password',
    id: 'userpassword',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  });
  return { nameInput, emailInput, passwordInput };
}

function createAuthButton() {
  const buttonSubmitForm = createElement('button', {
    classList: ['button-form'],
    textContent: 'Submit',
    attributes: {
      type: 'submit',
    },
  });
  return { buttonSubmitForm };
}

function createAuthTabs() {
  const tabSignUp = createElement('button', {
    classList: ['tab-signup', 'tab-active'],
    textContent: 'Sign Up',
    attributes: {
      type: 'button',
    },
  });

  const tabSignIn = createElement('button', {
    classList: ['tab-signin'],
    textContent: 'Sign In',
    attributes: {
      type: 'button',
    },
  });

  const tabs = createElement('div', {
    classList: ['tabs-form'],
    children: [tabSignUp, tabSignIn],
  });

  return { tabs, tabSignUp, tabSignIn };
}

export function createAuthForm() {
  const { form, serverError, status } = createLoginForm();
  const { nameInput, emailInput, passwordInput } = createAuthInputs();
  const { buttonSubmitForm } = createAuthButton();
  const { tabs, tabSignUp, tabSignIn } = createAuthTabs();

  let activeTab: 'signup' | 'signin' = 'signup';

  function setActiveTab(newTab: 'signup' | 'signin') {
    activeTab = newTab;
    tabSignUp.classList.toggle('tab-active', activeTab === 'signup');
    tabSignIn.classList.toggle('tab-active', activeTab === 'signin');

    nameInput.inputGroup.style.display = activeTab === 'signin' ? 'none' : '';
    nameInput.errorMessage.textContent = '';

    serverError.textContent = '';
    status.textContent = '';
  }

  tabSignUp.addEventListener('click', () => setActiveTab('signup'));
  tabSignIn.addEventListener('click', () => setActiveTab('signin'));

  setActiveTab('signup');

  form.append(
    tabs,
    nameInput.inputGroup,
    emailInput.inputGroup,
    passwordInput.inputGroup,
    buttonSubmitForm,
    status,
    serverError,
  );

  return {
    form,
    buttonSubmitForm,
    status,
    serverError,
    nameInput,
    emailInput,
    passwordInput,
    getActiveTab: () => activeTab,
  };
}

export function renderLoginPage(root: HTMLElement) {
  const { container, authBlock } = createLoginLayout();
  const {
    form,
    buttonSubmitForm,
    status,
    serverError,
    nameInput,
    emailInput,
    passwordInput,
    getActiveTab,
  } = createAuthForm();

  authBlock.append(form);
  root.append(container);

  const handler = createSubmitHandler(
    {
      username: nameInput.errorMessage,
      email: emailInput.errorMessage,
      password: passwordInput.errorMessage,
    },
    { submitButton: buttonSubmitForm, statusElement: status, serverErrorElement: serverError },
    getActiveTab,
  );
  form.addEventListener('submit', handler);
}

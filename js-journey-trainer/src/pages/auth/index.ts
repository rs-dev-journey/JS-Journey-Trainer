import './login.css';
import { createSubmitHandler } from './model';
import { createInputForm, firstLetterCapitalize } from './ui';

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

export function addUsernameCapitalize(input: HTMLInputElement) {
  input.addEventListener('blur', () => {
    input.value = firstLetterCapitalize(input.value);
  });
}

function createLoginForm() {
  const form = document.createElement('form');
  form.className = 'form';
  form.id = 'loginForm';
  form.noValidate = true;

  const serverError = document.createElement('p');
  serverError.className = 'server-error-form';

  const status = document.createElement('p');
  status.className = 'status-form';

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

  addUsernameCapitalize(nameInput.input);

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
  const buttonSubmitForm = document.createElement('button');
  buttonSubmitForm.className = 'button-form';
  buttonSubmitForm.textContent = 'Submit';
  buttonSubmitForm.type = 'submit';

  return { buttonSubmitForm };
}

function createAuthTabs() {
  const tabs = document.createElement('div');
  tabs.className = 'tabs-form';

  const tabSignUp = document.createElement('button');
  tabSignUp.type = 'button';
  tabSignUp.className = 'tab-signup';
  tabSignUp.textContent = 'Sign Up';
  tabSignUp.classList.add('tab-active');

  const tabSignIn = document.createElement('button');
  tabSignIn.type = 'button';
  tabSignIn.className = 'tab-signin';
  tabSignIn.textContent = 'Sign In';

  tabs.append(tabSignUp, tabSignIn);
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

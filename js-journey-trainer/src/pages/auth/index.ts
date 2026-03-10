import './login.css';
import { createSubmitHandler } from './model';
import { createInputForm, firstLetterCapitalize } from './ui';

export function createLoginLayout() {
  const container = document.createElement('div');
  container.className = 'container-form';

  const section = document.createElement('section');
  section.className = 'section-form';

  const title = document.createElement('h1');
  title.className = 'title-form';
  title.textContent = 'Authentication';

  section.append(title);
  container.append(section);
  return { container, section, title };
}

export function addUsernameCapitalize(input: HTMLInputElement) {
  input.addEventListener('blur', () => {
    input.value = firstLetterCapitalize(input.value);
  });
}

export function renderLoginPage(root: HTMLElement) {
  const { container, section } = createLoginLayout();

  const form = document.createElement('form');
  form.className = 'form';
  form.id = 'loginForm';
  form.noValidate = true;

  const error = document.createElement('p');
  error.className = 'error-form';

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

  const buttonSubmitForm = document.createElement('button');
  buttonSubmitForm.className = 'button-form';
  buttonSubmitForm.textContent = 'Submit';
  buttonSubmitForm.type = 'submit';

  form.append(
    error,
    nameInput.inputGroup,
    emailInput.inputGroup,
    passwordInput.inputGroup,
    buttonSubmitForm,
  );

  section.append(form);
  root.append(container);

  const handler = createSubmitHandler({
    username: nameInput.errorMessage,
    email: emailInput.errorMessage,
    password: passwordInput.errorMessage,
  });

  form.addEventListener('submit', handler);
}

import './login.css';
import { submitForm } from './model';
import { createInputForm } from './ui';

export function renderLoginPage(root: HTMLElement) {
  const container = document.createElement('div');
  container.className = 'container-form';

  const section = document.createElement('section');
  section.className = 'form-section';

  const title = document.createElement('h1');
  title.className = 'title-form';
  title.textContent = 'Authentication';

  const form = document.createElement('form');
  form.className = 'form';
  form.id = 'loginForm';

  const nameInput = createInputForm({
    labelText: 'Please, write your name',
    id: 'username',
    name: 'username',
    type: 'text',
    placeholder: 'Your name',
  });

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
    nameInput.inputGroup,
    emailInput.inputGroup,
    passwordInput.inputGroup,
    buttonSubmitForm,
  );
  section.append(title, form);
  container.append(section);
  root.append(container);

  submitForm(form);
}

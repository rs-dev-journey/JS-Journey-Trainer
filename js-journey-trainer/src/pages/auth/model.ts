import type { loginFormData, Errors, ErrorElement } from './types';

const USERNAME_REGEX = /^[A-Za-z0-9]{3,10}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{4,}$/;

export function createSubmitHandler(errorElements: ErrorElement) {
  return function submitHandler(event: SubmitEvent) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;

    const data = getLoginFormData(form);
    const errors = validateInputForm(data);

    renderLoginErrors(errorElements, errors);
    if (hasErrors(errors)) return;

    console.log('OK', { username: data.username, email: data.email });
  };
}

function getLoginFormData(form: HTMLFormElement): loginFormData {
  const formDate = new FormData(form);
  return {
    username: String(formDate.get('username') ?? ''),
    email: String(formDate.get('email') ?? ''),
    password: String(formDate.get('password') ?? ''),
  };
}

function renderLoginErrors(errorElements: ErrorElement, errors: Errors) {
  errorElements.username.textContent = errors.username ?? '';
  errorElements.email.textContent = errors.email ?? '';
  errorElements.password.textContent = errors.password ?? '';
}

function hasErrors(errors: Errors): boolean {
  return Boolean(errors.username || errors.email || errors.password);
}

function validateInputForm(data: loginFormData): Errors {
  const errors: Errors = {};

  const username = data.username.trim();
  const email = data.email.trim();
  const password = data.password.trim();

  if (!username) {
    errors.username = 'Name is required';
  } else if (!USERNAME_REGEX.test(username)) {
    errors.username = 'Username should be 3-10 symbols (letters,numbers 0-9)';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Invalid email format. Example@domain.com';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (!PASSWORD_REGEX.test(password)) {
    errors.password = 'Passsword must be at least 4 characters, one letter and one number';
  }
  return errors;
}

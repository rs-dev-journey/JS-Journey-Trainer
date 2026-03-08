import type { loginFormData, Errors, ErrorElement } from './types';

const USERNAME = /^[A-Za-z0-9]{3,10}$/;
const EMAIL = /^\S+@\S+\.\S+$/;
const PASSWORD = /^(?=.*[A-Za-z])(?=.*\d).{4,}$/;

export function submitForm(form: HTMLFormElement, errorElement: ErrorElement) {
  console.log('submitForm connected', form.id);
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log('SUBMIT worked');

    const formDate = new FormData(form);
    const data = {
      username: String(formDate.get('username') ?? ''),
      email: String(formDate.get('email') ?? ''),
      password: String(formDate.get('password') ?? ''),
    };

    console.log('FORM DATA:', data);

    errorElement.username.textContent = '';
    errorElement.email.textContent = '';
    errorElement.password.textContent = '';

    const errors = validateInputForm(data);

    if (errors.username) errorElement.username.textContent = errors.username;
    if (errors.email) errorElement.email.textContent = errors.email;
    if (errors.password) errorElement.password.textContent = errors.password;

    if (errors.username || errors.email || errors.password) return;

    console.log('OK', { username: data.username, email: data.email });
  });
}

export function validateInputForm(data: loginFormData): Errors {
  const errors: Errors = {};

  if (!data.username.trim()) {
    errors.username = 'Name is required';
  } else if (!USERNAME.test(data.username)) {
    errors.username = 'Username should be 3-10 symbols (letters,numbers 0-9)';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL.test(data.email)) {
    errors.email = 'Invalid email format. Example@domain.com';
  }

  if (!data.password.trim()) {
    errors.password = 'Password is required';
  } else if (!PASSWORD.test(data.password)) {
    errors.password = 'Passsword must be at least 4 characters, one letter and one number';
  }
  return errors;
}

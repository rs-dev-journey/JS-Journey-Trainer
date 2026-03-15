import type { loginFormData, Errors } from './types';

const USERNAME_REGEX = /^[A-Za-z0-9]{3,10}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

export function validateInputForm(data: loginFormData, activeTab: 'signup' | 'signin'): Errors {
  const errors: Errors = {};

  const username = data.username.trim();
  const email = data.email.trim();
  const password = data.password.trim();

  if (activeTab === 'signup') {
    if (!username) {
      errors.username = 'Name is required';
    } else if (!USERNAME_REGEX.test(username)) {
      errors.username = 'Username should be 3-10 symbols (letters,numbers 0-9)';
    }
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Invalid email format. Example@domain.com';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (!PASSWORD_REGEX.test(password)) {
    errors.password = 'Passsword must be at least 6 characters, one letter and one number';
  }
  return errors;
}

export function getSupabaseErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return 'Something went wrong. Please try again';
  }

  const message = error.message.toLowerCase();

  if (message.includes('rate limit')) return 'Too many attempts. Try again later.';
  if (message.includes('weak password')) return 'Password is too weak, min 6 characters.';
  if (message.includes('invalid login')) return 'Invalid email or password.';
  return error.message;
}

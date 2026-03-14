import { apiSignIn, apiSignUp } from '@/shared/api/supabase/auth.api';
import type { loginFormData, Errors, ErrorElement, StatusAuth } from './types';

const USERNAME_REGEX = /^[A-Za-z0-9]{3,10}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

export function createSubmitHandler(
  errorElements: ErrorElement,
  serverAnswer: StatusAuth,
  getActiveTab: () => 'signup' | 'signin',
) {
  return async function submitHandler(event: SubmitEvent) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;

    const data = getLoginFormData(form);
    const activeTab = getActiveTab();
    const errors = validateInputForm(data, activeTab);

    const email = data.email.trim();
    const password = data.password.trim();

    renderLoginErrors(errorElements, errors);
    if (hasErrors(errors)) return;

    serverAnswer.serverErrorElement.textContent = '';
    serverAnswer.statusElement.textContent = '';

    serverAnswer.submitButton.disabled = true;
    serverAnswer.statusElement.textContent = 'Please, wait';

    try {
      if (activeTab === 'signin') {
        await apiSignIn(email, password);
        serverAnswer.statusElement.textContent = 'Logged in ';
      } else {
        await apiSignUp(email, password);
        serverAnswer.statusElement.textContent = 'Account created!';
      }
    } catch (error) {
      serverAnswer.statusElement.textContent = '';
      serverAnswer.serverErrorElement.textContent = getSupabaseErrorMessage(error);
    } finally {
      serverAnswer.submitButton.disabled = false;
    }
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

function validateInputForm(data: loginFormData, activeTab: 'signup' | 'signin'): Errors {
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

function getSupabaseErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return 'Something went wrong. Please try again';
  }

  const message = error.message.toLowerCase();

  if (message.includes('rate limit')) return 'Too many attempts. Try again later.';
  if (message.includes('weak password')) return 'Password is too weak, min 6 characters.';
  if (message.includes('invalid login')) return 'Invalid email or password.';
  return error.message;
}

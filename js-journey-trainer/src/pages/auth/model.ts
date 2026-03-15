import { apiSignIn, apiSignUp } from '@/shared/api/supabase/auth.api';
import type { loginFormData, Errors, ErrorElement, StatusAuth } from './types';
import { validateInputForm, getSupabaseErrorMessage } from './validation';

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

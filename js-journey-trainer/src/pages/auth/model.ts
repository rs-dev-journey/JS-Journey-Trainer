import { apiSignIn, apiSignUp } from '@/shared/api/supabase/auth.api';
import type { LoginFormData, Errors, ErrorElement, StatusAuth } from './types';
import { validateInputForm, getSupabaseErrorMessage } from './validation';
import { initAuth } from '@/entities/user';
import { navigate } from '@/shared/lib/router/navigate';
import { createLoader } from '@/shared/ui/loader';

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

    const username = data.username.trim();
    const email = data.email.trim();
    const password = data.password.trim();

    renderLoginErrors(errorElements, errors);
    if (hasErrors(errors)) return;

    setPendingState(serverAnswer);
    const LOADER_DELAY_MS = 2000;

    try {
      await new Promise((resolve) => setTimeout(resolve, LOADER_DELAY_MS));
      const successMessage = await submitAuth(activeTab, username, email, password);

      if (activeTab === 'signup') {
        localStorage.setItem('explorer_username', username);
      }

      setSuccessState(serverAnswer, successMessage);

      if (activeTab === 'signin') {
        await initAuth();
        navigate('/practice');
      }
    } catch (error) {
      setErrorState(serverAnswer, error);
    } finally {
      setIdleState(serverAnswer);
    }
  };
}

function getLoginFormData(form: HTMLFormElement): LoginFormData {
  const formData = new FormData(form);
  return {
    username: String(formData.get('username') ?? ''),
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
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

function setPendingState(serverAnswer: StatusAuth) {
  serverAnswer.serverErrorElement.textContent = '';
  serverAnswer.statusElement.replaceChildren(createLoader());
  /*serverAnswer.statusElement.textContent = 'Please, wait';*/
  serverAnswer.submitButton.disabled = true;
}

function setSuccessState(serverAnswer: StatusAuth, message: string) {
  serverAnswer.serverErrorElement.textContent = '';
  serverAnswer.statusElement.textContent = message;
}

function setErrorState(serverAnswer: StatusAuth, error: unknown) {
  serverAnswer.statusElement.textContent = '';
  serverAnswer.serverErrorElement.textContent = getSupabaseErrorMessage(error);
}

function setIdleState(serverAnswer: StatusAuth) {
  serverAnswer.submitButton.disabled = false;
}

async function submitAuth(
  activeTab: 'signup' | 'signin',
  username: string,
  email: string,
  password: string,
) {
  if (activeTab === 'signin') {
    await apiSignIn(email, password);
    return 'Logged in';
  }
  await apiSignUp(email, password, username);
  return 'Account created! Now sign in.';
}

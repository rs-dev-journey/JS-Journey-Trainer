import type { Session } from '@supabase/supabase-js';
import { apiGetSession, apiSignOut, subscribeAuthChanges } from '@/shared/api/supabase/auth.api';

import type { AuthListener, AuthState, AuthUser } from './types';

const authState: AuthState = {
  user: null,
  isLoading: true,
};

const subscribers = new Set<AuthListener>();

let stopSupabaseSubscription: null | (() => void) = null;

function informListeners() {
  const currentState = getAuthState();

  subscribers.forEach((subscriber) => {
    subscriber(currentState);
  });
}

function getUserFromSession(session: Session | null): AuthUser | null {
  if (!session?.user) {
    return null;
  }

  const metadataName = session.user.user_metadata?.['name'];
  const name = typeof metadataName === 'string' ? metadataName : undefined;

  return {
    id: session.user.id,
    email: session.user.email ?? '',
    name,
  };
}

export function getAuthState(): AuthState {
  return {
    user: authState.user,
    isLoading: authState.isLoading,
  };
}

export function getCurrentUserId(): string | undefined {
  return authState.user?.id;
}

export function getCurrentUserName(): string | undefined {
  return authState.user?.name;
}

export function isAuthenticated(): boolean {
  return authState.user !== null;
}

export async function initAuth() {
  authState.isLoading = true;
  informListeners();

  try {
    const session = await apiGetSession();
    authState.user = getUserFromSession(session);

    if (!stopSupabaseSubscription) {
      stopSupabaseSubscription = subscribeAuthChanges((sessionFromEvent) => {
        authState.user = getUserFromSession(sessionFromEvent);
        authState.isLoading = false;
        informListeners();
      });
    }
  } catch (error) {
    authState.user = null;
    throw error;
  } finally {
    authState.isLoading = false;
    informListeners();
  }
}

export async function logout() {
  await apiSignOut();
  authState.user = null;
  informListeners();
}

export function subscribe(listener: AuthListener) {
  subscribers.add(listener);
  listener(getAuthState());

  return () => {
    subscribers.delete(listener);
  };
}

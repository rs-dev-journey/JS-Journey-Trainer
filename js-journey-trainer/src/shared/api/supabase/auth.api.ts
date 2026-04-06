import type { Session } from '@supabase/supabase-js';
import { supabase } from './client';

export async function apiSignUp(email: string, password: string, username: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name: username } },
  });
  if (error) throw error;
  return data;
}

export async function apiSignIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function apiSignOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function apiGetSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

type OnAuthChange = (session: Session | null) => void;

export function subscribeAuthChanges(onChange: OnAuthChange) {
  const authListener = supabase.auth.onAuthStateChange((_event, session) => {
    onChange(session);
  });

  return () => {
    authListener.data.subscription.unsubscribe();
  };
}

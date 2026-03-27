import { createClient } from '@supabase/supabase-js';

function getEnvironment(name: 'VITE_SUPABASE_URL' | 'VITE_SUPABASE_ANON_KEY'): string {
  const value = import.meta.env[name];

  if (typeof value != 'string' || value.length === 0) {
    throw new Error(`Missing env: ${name}`);
  }
  return value;
}

const SUPABASE_URL = getEnvironment('VITE_SUPABASE_URL');
const SUPABASE_ANON_KEY = getEnvironment('VITE_SUPABASE_ANON_KEY');

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

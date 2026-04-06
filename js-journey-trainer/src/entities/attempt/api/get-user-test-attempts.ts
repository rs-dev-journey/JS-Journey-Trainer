import { supabase } from '@/shared/api/supabase/client';
import type { Attempt } from '../model/types';
import { isAttemptRowArray } from '../lib/is-attempt-row';
import { mapAttemptRow } from '../lib/map-attempt-row';

const ATTEMPT_COLUMNS = 'id, user_id, test_id, finished_at, duration_ms, score_percent, status';

export async function getUserTestAttempts(userId: string, testId: string): Promise<Attempt[]> {
  const { data, error } = await supabase
    .from('user_test_attempts')
    .select(ATTEMPT_COLUMNS)
    .eq('user_id', userId)
    .eq('test_id', testId)
    .order('finished_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to load attempts: ${error.message}`);
  }

  if (!data) {
    return [];
  }

  if (!isAttemptRowArray(data)) {
    throw new Error('Invalid attempts data format');
  }

  return data.map(mapAttemptRow);
}

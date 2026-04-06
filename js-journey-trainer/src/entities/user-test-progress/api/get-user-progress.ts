import { isUserTestProgressRowArray } from '../lib/is-user-test-progress';
import { mapUserProgressRow } from '../lib/map-user-progress-row';
import type { UserTestProgress } from '../model/types';
import { supabase } from '@/shared/api/supabase/client';

export async function getUserProgress(userId: string): Promise<UserTestProgress[]> {
  const { data, error } = await supabase
    .from('user_test_progress')
    .select('id, user_id, test_id, attempts_count, last_score_percent, status')
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Error loading user progress: ${error.message}`);
  }

  if (!data) {
    return [];
  }

  if (!isUserTestProgressRowArray(data)) {
    throw new Error('Invalid user progress data format');
  }

  return data.map(mapUserProgressRow);
}

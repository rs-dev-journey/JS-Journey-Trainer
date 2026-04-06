import type { Attempt } from '../model/types';
import { supabase } from '@/shared/api/supabase/client';

export function saveUserTestAttempt(attempt: Attempt): void {
  supabase
    .from('user_test_attempts')
    .insert({
      id: attempt.id,
      user_id: attempt.userId,
      test_id: attempt.testId,
      finished_at: attempt.finishedAt,
      duration_ms: attempt.durationMs,
      score_percent: attempt.scorePercent,
      status: attempt.status,
    })
    .then(({ error }) => {
      if (error) {
        throw new Error(`Failed to save attempt: ${error.message}`);
      }
    });
}

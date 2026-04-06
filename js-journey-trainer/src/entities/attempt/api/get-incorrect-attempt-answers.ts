import type { UserTestIncorrectAnswers } from '../model/types';
import { supabase } from '@/shared/api/supabase/client';
import { isUserTestIncorrectAnswersRow } from '../lib/is-user-incorrect-answers';
import { mapUserTestIncorrectAnswersRow } from '../lib/map-user-incorrect-answers';

const INCORRECT_ANSWERS_COLUMNS = 'id, user_id, test_id, attempt_id, attempt_answers, score';

export async function getIncorrectAttemptAnswers(
  userId: string,
  testId: string,
): Promise<UserTestIncorrectAnswers | undefined> {
  const { data, error } = await supabase
    .from('user_test_incorrect_answers')
    .select(INCORRECT_ANSWERS_COLUMNS)
    .eq('user_id', userId)
    .eq('test_id', testId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load attempt answers: ${error.message}`);
  }

  if (!data) {
    return;
  }

  if (!isUserTestIncorrectAnswersRow(data)) {
    throw new Error('Invalid incorrect attempt answers data format');
  }

  return mapUserTestIncorrectAnswersRow(data);
}

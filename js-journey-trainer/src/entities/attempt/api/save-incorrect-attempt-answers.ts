import { supabase } from '@/shared/api/supabase/client';
import type { SaveIncorrectAnswersInput, UserTestIncorrectAnswers } from '../model/types';
import { isUserTestIncorrectAnswersRow } from '../lib/is-user-incorrect-answers';
import { mapUserTestIncorrectAnswersRow } from '../lib/map-user-incorrect-answers';
import { mapIncorrectAnswersInputToRow } from '../lib/map-incorrect-answers-input';

const INCORRECT_ANSWERS_COLUMNS = 'id, user_id, test_id, attempt_id, attempt_answers, score';

export async function saveIncorrectAttemptAnswers(
  input: SaveIncorrectAnswersInput,
): Promise<UserTestIncorrectAnswers> {
  const row = mapIncorrectAnswersInputToRow(input);

  const { data, error } = await supabase
    .from('user_test_incorrect_answers')
    .upsert(row, {
      onConflict: 'user_id,test_id',
    })
    .select(INCORRECT_ANSWERS_COLUMNS)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to save incorrect attempt answers: ${error.message}`);
  }

  if (!data || !isUserTestIncorrectAnswersRow(data)) {
    throw new Error('Invalid saved incorrect attempt answers data format');
  }

  return mapUserTestIncorrectAnswersRow(data);
}

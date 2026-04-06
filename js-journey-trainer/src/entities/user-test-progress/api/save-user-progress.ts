import { supabase } from '@/shared/api/supabase/client';
import type { SaveUserProgressInput, UserTestProgress } from '../model/types';
import type { UserTestProgressRow } from './types';
import { mapUserProgressRow } from '../lib/map-user-progress-row';
import { isUserTestProgressRow } from '../lib/is-user-test-progress';

async function loadExistingUserProgressRow(
  input: SaveUserProgressInput,
): Promise<UserTestProgressRow | null> {
  const { data, error } = await supabase
    .from('user_test_progress')
    .select('id, user_id, test_id, attempts_count, last_score_percent, status')
    .eq('user_id', input.userId)
    .eq('test_id', input.testId)
    .maybeSingle();

  if (error) {
    throw new Error(`Error loading user progress: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  if (!isUserTestProgressRow(data)) {
    throw new Error('Invalid existing user progress data format');
  }

  return data;
}

async function updateUserProgressRow(
  row: UserTestProgressRow,
  input: SaveUserProgressInput,
): Promise<UserTestProgress> {
  const { data, error } = await supabase
    .from('user_test_progress')
    .update({
      attempts_count: row.attempts_count + 1,
      last_score_percent: input.scorePercent,
      status: 'completed',
    })
    .eq('id', row.id)
    .select('id, user_id, test_id, attempts_count, last_score_percent, status')
    .maybeSingle();

  if (error) {
    throw new Error(`Error updating user progress: ${error.message}`);
  }

  if (!data || !isUserTestProgressRow(data)) {
    throw new Error('Invalid updated user progress data format');
  }

  return mapUserProgressRow(data);
}

async function insertUserProgressRow(input: SaveUserProgressInput): Promise<UserTestProgress> {
  const { data, error } = await supabase
    .from('user_test_progress')
    .insert({
      user_id: input.userId,
      test_id: input.testId,
      attempts_count: 1,
      last_score_percent: input.scorePercent,
      status: 'completed',
    })
    .select('id, user_id, test_id, attempts_count, last_score_percent, status')
    .maybeSingle();

  if (error) {
    throw new Error(`Error creating user progress: ${error.message}`);
  }

  if (!data || !isUserTestProgressRow(data)) {
    throw new Error('Invalid inserted user progress data format');
  }

  return mapUserProgressRow(data);
}

export function saveUserProgress(input: SaveUserProgressInput) {
  loadExistingUserProgressRow(input)
    .then((existingRow) => {
      if (existingRow) {
        updateUserProgressRow(existingRow, input);
      } else {
        insertUserProgressRow(input);
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
}

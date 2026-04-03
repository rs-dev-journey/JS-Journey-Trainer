import type { Status } from '../model/types';

export interface UserTestProgressRow {
  id: string;
  user_id: string;
  test_id: string;
  attempts_count: number;
  last_score_percent: number;
  status: Status;
}

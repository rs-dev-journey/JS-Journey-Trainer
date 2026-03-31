import type { TrueFalseSessionResult } from '../model/types';

const STORAGE_KEY = 'true-false-resuly';

export function saveTrueFalseResult(result: TrueFalseSessionResult): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
}

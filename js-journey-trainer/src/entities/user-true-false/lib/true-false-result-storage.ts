import type { TrueFalseDashboardData } from '../model/types';

const STORAGE_KEY = 'true-false-result';

export function saveTrueFalseResult(data: TrueFalseDashboardData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getTrueFalseResult(): TrueFalseDashboardData | null {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'done' in parsed &&
      typeof parsed.done === 'number' &&
      'all' in parsed &&
      typeof parsed.all === 'number'
    ) {
      return {
        done: parsed.done,
        all: parsed.all,
      };
    }
    return null;
  } catch {
    return null;
  }
}

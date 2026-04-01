import type { TrueFalseSessionResult } from '../model/types';

const STORAGE_KEY = 'true-false-result';

type TrueFalseDashboardData = {
  done: number;
  all: number;
};

export function saveTrueFalseResult(result: TrueFalseSessionResult): void {
  const dashboardData: TrueFalseDashboardData = {
    done: result.correctAnswers,
    all: result.totalQuestions,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dashboardData));
}

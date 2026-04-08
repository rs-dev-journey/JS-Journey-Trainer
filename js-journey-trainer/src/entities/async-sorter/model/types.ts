export type TaskType = 'sync' | 'macro' | 'micro';

export interface VisualStep {
  readonly id: string;
  readonly label: string;
  readonly type: TaskType;
}

export interface AsyncSorterTask {
  readonly id: number;
  readonly code: string;
  readonly expected: readonly string[];
  readonly visualSteps: readonly VisualStep[];
}

export interface SorterState {
  currentTask: AsyncSorterTask;
  userOrder: (string | null)[];
  attempts: number;
  startTime: number;
  isAnimating: boolean;
}

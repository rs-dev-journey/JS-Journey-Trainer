import type { Status } from './types';

const STATUS_LABELS: Record<Status, string> = {
  completed: 'Completed',
  notCompleted: 'Not completed',
};

export function formatStatusLabel(status: Status): string {
  return STATUS_LABELS[status];
}

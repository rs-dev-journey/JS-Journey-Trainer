import type { UserTestProgress } from '@/entities/user-test-progress';

export default function buildProgressMap(
  progressList: UserTestProgress[],
): Map<string, UserTestProgress> {
  return new Map(progressList.map((progress) => [progress.testId, progress]));
}

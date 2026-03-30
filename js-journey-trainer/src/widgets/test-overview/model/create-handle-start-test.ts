import { navigate } from '@/shared/lib/router/navigate';

export function createHandleStartTest(testId: string) {
  return function handleStartTest() {
    navigate(`/tests/${testId}/run`);
  };
}

import { navigate } from '@/shared/lib/router/navigate';

export function handleOpenTest(testId: string) {
  navigate(`/tests/${testId}`);
  console.log(`Перешли на '${testId}' тест`);
}

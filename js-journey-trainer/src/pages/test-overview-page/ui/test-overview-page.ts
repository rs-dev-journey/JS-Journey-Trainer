import { createTestOverviewWidget } from '@/widgets/test-overview';
import { getAuthState } from '@/entities/user';
import { getTestIdFromUrl } from '@/shared/lib/router/get-test-id-from-url';

export function createTestOverviewPage(root: HTMLElement): void {
  const userId = getAuthState().user?.id;
  const testId = getTestIdFromUrl();

  if (!userId) {
    throw new Error('User is not authenticated');
  }

  if (!testId) {
    throw new Error('Test is not defined');
  }

  const page = createTestOverviewWidget(userId, testId);

  root.append(page);
}

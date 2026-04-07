import { DashboardService } from '@/widgets/dashboard';
import { renderErrorState } from '@/shared/ui/error-state';
export async function renderDashboardPage(root: HTMLElement) {
  root.innerHTML = '';

  try {
    await DashboardService.init(root);
  } catch {
    root.innerHTML = '';

    root.append(
      renderErrorState({
        title: 'Something went wrong.',
        message: 'We couldn’t load Dashboard page.\n Try to refresh.',
        onRetry: () => globalThis.location.reload(),
      }),
    );
  }
}

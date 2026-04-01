import { getCurrentUserId } from '@/entities/user';
import { renderTrueFalseWidget, trueFalseQuestion } from '@/widgets/true-false';

export function renderTrueFalsePage(root: HTMLElement): void {
  const userId = getCurrentUserId();

  if (!userId) {
    throw new Error('User is not autenticated');
  }

  const widget = renderTrueFalseWidget(userId, trueFalseQuestion);
  root.append(widget);
}

// TODO: temporary page
import { getCurrentUserId, logout } from '@/entities/user';
import { navigate } from '@/shared/lib/router/navigate';
import { trueFalseQuestion, renderTrueFalseWidget } from '@/widgets/true-false';
import { saveTrueFalseResult } from '@/entities/user-true-false/lib/true-false-result-storage';

export function renderPracticePage(root: HTMLElement) {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User is not authenticated');
  }
  const title = document.createElement('h1');
  title.textContent = 'Practice page';

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Logout';

  button.addEventListener('click', async () => {
    await logout();
    navigate('/login');
  });

  const widget = renderTrueFalseWidget(userId, trueFalseQuestion, (result) => {
    saveTrueFalseResult({
      done: result.correctAnswers,
      all: result.totalQuestions,
    });
  });

  root.append(title, button, widget);
}

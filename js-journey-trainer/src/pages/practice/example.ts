// TODO: temporary page
import { getCurrentUserId, logout } from '@/entities/user';
import { navigate } from '@/shared/lib/router/navigate';
import { trueFalseQuestion, renderTrueFalseWidget } from '@/widgets/true-false';

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
    console.log(result);
  });

  root.append(title, button, widget);
}

// TODO: temporary page
import { logout } from '@/entities/user';
import { navigate } from '@/app/router';

export function renderPracticePage(root: HTMLElement) {
  const title = document.createElement('h1');
  title.textContent = 'Practice page';

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Logout';

  button.addEventListener('click', async () => {
    await logout();
    navigate('/login');
  });

  root.append(title, button);
}

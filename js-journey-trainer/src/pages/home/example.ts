import { navigate } from '@/app/router';

export function renderHomePage(root: HTMLElement) {
  const wrapper = document.createElement('section');
  wrapper.className = 'home-page';

  const title = document.createElement('h1');
  title.textContent = 'JS Journey Trainer';

  const description = document.createElement('p');
  description.textContent = 'Welcome to the training platform. Choose where to go next.';

  const practiceButton = document.createElement('button');
  practiceButton.textContent = 'Go to Practice';
  practiceButton.addEventListener('click', () => {
    navigate('/practice');
  });

  const loginButton = document.createElement('button');
  loginButton.textContent = 'Login';
  loginButton.addEventListener('click', () => {
    navigate('/login');
  });

  wrapper.append(title, description, practiceButton, loginButton);
  root.append(wrapper);
}

import { createAboutWidget } from '@/widgets/about';
import './about-page.css';
import './about-page-theme.css';

export function renderAboutPage(root: HTMLElement): void {
  const page = document.createElement('main');
  page.className = 'about-page';

  const container = createAboutWidget();

  page.append(container);

  root.replaceChildren(page);
}

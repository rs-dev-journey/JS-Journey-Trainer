import { renderSorterPage } from './pages/async-sorter/sorter-page';
import { initAsyncSorter } from './widgets/async-sorter';

globalThis.addEventListener('DOMContentLoaded', () => {
  document.body.append(renderSorterPage());
  initAsyncSorter();
});

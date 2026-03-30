import { initAuth } from '@/entities/user';
import { startRouter } from '@/app/router';

export async function startApp(root: HTMLElement) {
  await initAuth();
  startRouter(root);
}

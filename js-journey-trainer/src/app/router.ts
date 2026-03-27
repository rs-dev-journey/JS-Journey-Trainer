import { getAuthState, isAuthenticated } from '@/entities/user';
import { renderLoginPage } from '@/pages/auth';
import { renderHomePage } from '@/pages/home/example';
import { renderHeader } from '@/shared/ui/example';
import { renderPracticePage } from '@/pages/practice/example';
import { renderDashboardPage } from '@/pages/dashboard/example';
import { createTestsPage } from '@/pages/tests-page/example';
import { createTestOverviewPage } from '@/pages/test-overview-page/example';
import { createTestRunPage } from '@/pages/test-run-page/example';
import { renderNotFoundPage } from '@/pages/not-found-page/ui/index';
import { ROUTE_CHANGE_EVENT } from '@/shared/lib/router/navigate';

type Route = {
  render: (root: HTMLElement) => void;
  isProtected: boolean;
  withHeader: boolean;
};

const staticRoutes: Record<string, Route> = {
  '/': { render: renderHomePage, isProtected: false, withHeader: true },
  '/login': { render: renderLoginPage, isProtected: false, withHeader: false },
  '/practice': { render: renderPracticePage, isProtected: true, withHeader: true },
  '/dashboard': { render: renderDashboardPage, isProtected: true, withHeader: true },
  '/tests': { render: createTestsPage, isProtected: true, withHeader: true },
  '/404': { render: renderNotFoundPage, isProtected: false, withHeader: false },
};

let appRoot: HTMLElement | null = null;

const TESTS_OVERVIEW_SEGMENTS_COUNT = 2;
const TESTS_RUN_SEGMENTS_COUNT = 3;

function getRoute(pathname: string): Route | null {
  const staticRoute = staticRoutes[pathname];
  if (staticRoute) return staticRoute;

  const segments = pathname.split('/').filter(Boolean);

  const isTestsOverviewRoute =
    segments.length === TESTS_OVERVIEW_SEGMENTS_COUNT && segments[0] === 'tests';
  const isTestsRunRoute =
    segments.length === TESTS_RUN_SEGMENTS_COUNT &&
    segments[0] === 'tests' &&
    segments[2] === 'run';

  if (isTestsOverviewRoute) {
    return {
      render: createTestOverviewPage,
      isProtected: true,
      withHeader: true,
    };
  }

  if (isTestsRunRoute) {
    return {
      render: createTestRunPage,
      isProtected: true,
      withHeader: true,
    };
  }

  return null;
}

function renderPage(route: Route) {
  if (!appRoot) return;

  appRoot.innerHTML = '';

  if (route.withHeader) {
    appRoot.append(renderHeader());
  }

  const pageRoot = document.createElement('main');
  pageRoot.className = 'page-root';

  appRoot.append(pageRoot);
  route.render(pageRoot);
}

function renderCurrentRoute() {
  if (!appRoot) return;

  const authState = getAuthState();

  if (authState.isLoading) {
    appRoot.innerHTML = '';
    appRoot.textContent = 'Loading...';
    return;
  }

  const path = globalThis.location.pathname;
  const route = getRoute(path);

  if (!route) {
    history.replaceState(null, '', '/404');
    renderPage(staticRoutes['/404']);
    return;
  }

  if (route.isProtected && !isAuthenticated()) {
    history.replaceState(null, '', '/login');
    renderPage(staticRoutes['/login']);
    return;
  }

  if (path === '/login' && isAuthenticated()) {
    history.replaceState(null, '', '/practice');
    renderPage(staticRoutes['/practice']);
    return;
  }

  renderPage(route);
}

export function startRouter(root: HTMLElement) {
  appRoot = root;
  globalThis.addEventListener('popstate', renderCurrentRoute);
  globalThis.addEventListener(ROUTE_CHANGE_EVENT, renderCurrentRoute);
  renderCurrentRoute();
}

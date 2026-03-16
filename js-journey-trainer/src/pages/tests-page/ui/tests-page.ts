import createElement from '@/shared/lib/dom/create-element';
import { createTestsListWidget } from '@/widgets/tests-list';
import { handleOpenTest } from '../model/handle-open-test';
import './tests-page.css';

export function createTestPage(userId: string) {
  const page = createElement('main', {
    classList: ['tests-page'],
  });

  const header = createElement('div', {
    classList: ['tests-page__header'],
  });

  const title = createElement('h1', {
    textContent: 'Tests',
    classList: ['tests-page__title'],
  });

  const testsListWidget = createTestsListWidget(userId, handleOpenTest);

  header.append(title);
  page.append(header, testsListWidget);

  return page;
}

export interface LastAttemptWrongAnswer {
  // id: string;
  userId: string;
  testId: string;
  attemptId: string; // под вопросом

  questionId: string;
  selectIndex: number;
  correctIndex: number;

  questionSnapshot: {
    question: string;
    options: string[];
  };
}

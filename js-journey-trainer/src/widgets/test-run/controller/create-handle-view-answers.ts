import createElement from '@/shared/lib/dom/create-element';
import type { TestRunLayoutControls } from '../ui/types';
import {
  createIncorrectAnswersSection,
  loadIncorrectAnswers,
} from '@/features/show-incorrect-answers';
import { replaceSection } from '../lib/replace-section';

export function createHandleViewAnswers(
  userId: string,
  testId: string,
  layoutControls: TestRunLayoutControls,
): () => Promise<void> {
  let previousSection: HTMLElement | null = null;
  let answersSection: HTMLElement | null = null;

  function goBack() {
    if (previousSection) {
      replaceSection(layoutControls, previousSection);
    }
  }

  return async function onViewAnswers() {
    const currentSection = layoutControls.questionSection;

    if (answersSection) {
      if (currentSection === answersSection) {
        goBack();
      } else {
        previousSection = currentSection;
        replaceSection(layoutControls, answersSection);
      }
      return;
    }

    previousSection = currentSection;

    const loader = createElement('div', { textContent: 'Loading...' });
    replaceSection(layoutControls, loader);

    try {
      const data = await loadIncorrectAnswers(userId, testId);

      if (!data) {
        goBack();
        return;
      }

      answersSection = createIncorrectAnswersSection(data, goBack);
      replaceSection(layoutControls, answersSection);
    } catch {
      goBack();
    }
  };
}

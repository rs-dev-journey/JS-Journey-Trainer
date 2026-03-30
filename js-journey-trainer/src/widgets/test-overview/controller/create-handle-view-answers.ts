import {
  createIncorrectAnswersSection,
  loadIncorrectAnswers,
} from '@/features/show-incorrect-answers';
import { createLoader } from '@/shared/ui/loader';

export interface CreateHandleViewAnswersParameters {
  userId: string;
  testId: string;
  contentRoot: HTMLElement;
  getOverviewBody: () => HTMLElement;
}

export function createHandleViewAnswers({
  userId,
  testId,
  contentRoot,
  getOverviewBody,
}: CreateHandleViewAnswersParameters): () => Promise<void> {
  let answersContent: HTMLElement | null = null;

  function renderContent(element: HTMLElement) {
    contentRoot.replaceChildren(element);
  }

  function showOverview() {
    renderContent(getOverviewBody());
  }

  return async function onViewAnswers() {
    if (answersContent) {
      renderContent(answersContent);
      return;
    }

    renderContent(createLoader());

    try {
      const incorrectAnswers = await loadIncorrectAnswers(userId, testId);

      if (!incorrectAnswers) {
        showOverview();
        return;
      }

      answersContent = createIncorrectAnswersSection(incorrectAnswers, showOverview);
      renderContent(answersContent);
    } catch {
      showOverview();
    }
  };
}

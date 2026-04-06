import { getCurrentUserId } from '@/entities/user';
import { saveTrueFalseResult } from '@/entities/user-true-false';
import { renderErrorState } from '@/shared/ui/error-state';
import { createLoader } from '@/shared/ui/loader';
import { renderTrueFalseWidget, trueFalseQuestion } from '@/widgets/true-false';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function renderTrueFalsePage(root: HTMLElement): Promise<void> {
  root.replaceChildren(createLoader());

  try {
    const temporaryDelay = 800;
    await delay(temporaryDelay);

    /* throw new Error('Test error');*/

    const userId = getCurrentUserId();
    if (!userId) {
      throw new Error('User is not autenticated');
    }

    const questions = trueFalseQuestion;

    if (questions.length === 0) {
      throw new Error('Questions are empty');
    }

    const widget = renderTrueFalseWidget(userId, questions, (result) => {
      saveTrueFalseResult({
        done: result.correctAnswers,
        all: result.totalQuestions,
      });
    });
    root.replaceChildren(widget);
  } catch (error) {
    root.replaceChildren(
      renderErrorState({
        title: 'Failed to open true-false',
        message: error instanceof Error ? error.message : 'Unknown error',
        onRetry: () => {
          void renderTrueFalsePage(root);
        },
      }),
    );
  }
}

import type { Question } from '@/entities/test';
import type { TestRunLayoutControls } from './types';
import { createQuestionSection } from './create-question-section';

export function replaceQuestionSection(
  layoutControls: TestRunLayoutControls,
  question: Question,
  handleSubmitAnswer: (event: SubmitEvent) => void,
) {
  const nextQuestionSection = createQuestionSection(question);

  layoutControls.questionSection.replaceWith(nextQuestionSection.root);
  layoutControls.questionSection = nextQuestionSection.root;
  layoutControls.questionForm = nextQuestionSection.controls.questionForm;

  layoutControls.questionForm.addEventListener('submit', handleSubmitAnswer);
}

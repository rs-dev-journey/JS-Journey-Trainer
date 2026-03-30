import type { Question } from '@/entities/test';
import createElement from '@/shared/lib/dom/create-element';

function createAnswerOption(optionText: string, optionIndex: number): HTMLLabelElement {
  const optionLabel = createElement('label', { classList: ['question-form__option'] });

  const optionInput = createElement('input', {
    classList: ['question-form__radio'],
    attributes: { type: 'radio', name: 'answer', value: String(optionIndex), required: true },
  });

  const optionTextElement = createElement('span', {
    textContent: optionText,
    classList: ['question-form__option-text'],
  });

  optionLabel.append(optionInput, optionTextElement);

  return optionLabel;
}

export function createQuestionForm(options: string[]): HTMLFormElement {
  const questionForm = createElement('form', { classList: ['question-form'] });

  const questionFieldset = createElement('fieldset', { classList: ['question-form__fieldset'] });

  options.forEach((optionText, optionIndex) =>
    questionFieldset.append(createAnswerOption(optionText, optionIndex)),
  );

  const submitButton = createElement('button', {
    textContent: 'Answer',
    classList: ['question-form__submit'],
    attributes: { type: 'submit' },
  });

  questionForm.append(questionFieldset, submitButton);

  return questionForm;
}

export function createQuestionSection(question: Question) {
  const questionSection = createElement('section', { classList: ['test-run__question-section'] });

  const questionTitle = createElement('h2', {
    textContent: question.question,
    classList: ['test-run__question-title'],
  });

  const questionForm = createQuestionForm(question.options);

  questionSection.append(questionTitle, questionForm);

  return { root: questionSection, controls: { questionForm } };
}

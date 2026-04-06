export function getSelectedAnswerIndex(form: HTMLFormElement): number | undefined {
  const formData = new FormData(form);
  const answer = formData.get('answer');

  if (answer === null) {
    return;
  }

  const selectedIndex = Number(answer);

  return selectedIndex;
}

export function createHandleShowAnswers(userId: string, testId: string) {
  return function handleShowAnswers() {
    console.log(`Поменять для ${userId} и для ${testId}`);
  };
}

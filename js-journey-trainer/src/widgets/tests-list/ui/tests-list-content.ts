import type { OnOpenTest, TestCardViewModel } from '../model/types';
import { createTestProgressCard } from './test-progress-card/test-progress-card';

export function createTestsListContent(
  cards: TestCardViewModel[],
  onOpen: OnOpenTest,
): DocumentFragment {
  const list = document.createDocumentFragment();

  cards.forEach((card) => list.append(createTestProgressCard(card, onOpen)));

  return list;
}

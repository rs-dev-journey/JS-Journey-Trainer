import type { Attempt } from '@/entities/attempt';
import { formatDate } from '@/shared/lib/date/format-date';
import createElement from '@/shared/lib/dom/create-element';
import { formatDuration } from '@/shared/lib/time/format-duration';

function createAttemptsTableHead(): HTMLTableSectionElement {
  const head = createElement('thead');

  const rowHead = createElement('tr');

  const dateColumn = createElement('th', { textContent: 'Date', attributes: { scope: 'col' } });
  const durationColumn = createElement('th', {
    textContent: 'Duration',
    attributes: { scope: 'col' },
  });
  const scoreColumn = createElement('th', { textContent: 'Score', attributes: { scope: 'col' } });

  rowHead.append(dateColumn, durationColumn, scoreColumn);
  head.append(rowHead);

  return head;
}

function createAttemptsTableRow(attempt: Attempt): HTMLTableRowElement {
  const row = createElement('tr');

  const dateColumn = createElement('td', { textContent: formatDate(attempt.finishedAt) });
  const durationColumn = createElement('td', { textContent: formatDuration(attempt.durationMs) });
  const scoreColumn = createElement('td', { textContent: `${attempt.scorePercent}%` });

  row.append(dateColumn, durationColumn, scoreColumn);

  return row;
}

function createAttemptsTableBody(attempts: Attempt[]): HTMLTableSectionElement {
  const body = createElement('tbody');

  for (let i = attempts.length - 1; i >= 0; i--) {
    body.append(createAttemptsTableRow(attempts[i]));
  }

  return body;
}

export function createAttemptsTable(attempts: Attempt[]): HTMLTableElement {
  const attemptsTable = createElement('table', { classList: ['attempts-table'] });

  const head = createAttemptsTableHead();
  const body = createAttemptsTableBody(attempts);

  attemptsTable.append(head, body);

  return attemptsTable;
}

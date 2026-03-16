import { describe, it, expect } from 'vitest';
import { formatDate } from './format-date';
// import { formatDate } from '../format-date';

const YEAR_1 = 2024;
const MONTH_JANUARY = 0;
const DAY_FIVE = 5;
const HOUR_NINE = 9;
const MINUTE_SEVEN = 7;

const YEAR_2 = 2024;
const MONTH_DECEMBER = 11;
const DAY_FIFTEEN = 15;
const HOUR_FOURTEEN = 14;
const MINUTE_THIRTY = 30;

const TIMESTAMP_1 = new Date(YEAR_1, MONTH_JANUARY, DAY_FIVE, HOUR_NINE, MINUTE_SEVEN).getTime();

const TIMESTAMP_2 = new Date(
  YEAR_2,
  MONTH_DECEMBER,
  DAY_FIFTEEN,
  HOUR_FOURTEEN,
  MINUTE_THIRTY,
).getTime();

const EXPECTED_DATE_1 = '2024-01-05 09:07';
const EXPECTED_DATE_2 = '2024-12-15 14:30';

describe('formatDate', () => {
  it('formats date with leading zeros', () => {
    const result = formatDate(TIMESTAMP_1);

    expect(result).toBe(EXPECTED_DATE_1);
  });

  it('formats date without leading zeros', () => {
    const result = formatDate(TIMESTAMP_2);

    expect(result).toBe(EXPECTED_DATE_2);
  });
});

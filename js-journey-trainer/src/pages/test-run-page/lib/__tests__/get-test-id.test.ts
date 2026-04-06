import { describe, expect, it } from 'vitest';
import { getTestIdFromPathname } from '../get-test-id';

describe('getTestIdFromPathname', () => {
  it('returns test id from pathname', () => {
    Object.defineProperty(globalThis, 'location', {
      value: { pathname: '/tests/js-basics-types' },
      writable: true,
    });

    const testId = getTestIdFromPathname();

    expect(testId).toBe('js-basics-types');
  });

  it('returns undefined if path is invalid', () => {
    Object.defineProperty(globalThis, 'location', {
      value: { pathname: '/tests' },
      writable: true,
    });

    const testId = getTestIdFromPathname();

    expect(testId).toBeUndefined();
  });
});

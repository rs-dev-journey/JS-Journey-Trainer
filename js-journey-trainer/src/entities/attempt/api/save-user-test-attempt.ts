import type { Attempt } from '../model/types';
import { attemptsMock } from '../mock/mock-attempts';

export function saveUserTestAttempt(attempt: Attempt): void {
  attemptsMock.push(structuredClone(attempt));
}

import { describe, it, expect } from 'vitest';
import { validateInputForm, getSupabaseErrorMessage } from '../validation';

describe('validateInputForm', () => {
  it('signup: username is required', () => {
    const errors = validateInputForm(
      { username: '', email: 'test.user@gmail.com', password: 'abc123' },
      'signup',
    );
    expect(errors.username).toBeTruthy();
  });
});

it('signup: invalid username format', () => {
  const errors = validateInputForm(
    { username: '!&', email: 'test.user@gmail.com', password: 'abc123' },
    'signup',
  );
  expect(errors.username).toBeTruthy();
});

it('signin: username is not required', () => {
  const errors = validateInputForm(
    { username: '', email: 'test.user@gmail.com', password: 'abc123' },
    'signin',
  );
  expect(errors.username).toBeUndefined();
});

it('invalid email', () => {
  const errors = validateInputForm(
    { username: 'User1', email: 'uncorrect-email', password: 'abc123' },
    'signup',
  );
  expect(errors.email).toBeTruthy();
});

it('weak password', () => {
  const errors = validateInputForm(
    { username: 'User1', email: 'test.user@gmail.com', password: '123' },
    'signup',
  );
  expect(errors.password).toBeTruthy();
});

describe('getSupabaseErrorMessage', () => {
  it('returns default message when error is not Error', () => {
    const message = getSupabaseErrorMessage('gvghvb');
    expect(message.toLowerCase()).toContain('something went wrong');
  });
});

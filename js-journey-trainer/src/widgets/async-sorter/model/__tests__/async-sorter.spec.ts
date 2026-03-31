import { describe, it, expect, beforeEach, vi } from 'vitest';
import { currentState, selectNumber, undoStep, checkResult } from '../sorter-engine';

class MockAudioContext {
  createOscillator = vi.fn(() => ({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    type: 'sine',
  }));
  createGain = vi.fn(() => ({
    connect: vi.fn(),
    gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
  }));
  destination = {};
  currentTime = 0;
  state = 'running';
  resume = vi.fn().mockResolvedValue();
}

vi.stubGlobal('AudioContext', MockAudioContext);
vi.stubGlobal('webkitAudioContext', MockAudioContext);

describe('Sorter Engine', () => {
  beforeEach(() => {
    currentState.userOrder = [null, null, null];
    currentState.currentTask = { id: 1, expected: ['1', '2', '3'], code: '', visualSteps: [] };
  });

  it('should add number to the first empty slot', () => {
    selectNumber('1');
    expect(currentState.userOrder[0]).toBe('1');
    expect(currentState.userOrder[1]).toBe(null);
  });

  it('should not add duplicates', () => {
    selectNumber('1');
    selectNumber('1');
    expect(currentState.userOrder.filter((x) => x === '1').length).toBe(1);
  });

  it('should correctly clean slot with undo', () => {
    selectNumber('1');
    undoStep(0);
    expect(currentState.userOrder[0]).toBe(null);
  });

  it('should increment attempts and reset userOrder on wrong combination', async () => {
    currentState.currentTask = {
      ...currentState.currentTask,
      expected: ['1', '2', '3'],
    };
    currentState.userOrder = ['1', '3', '2'];
    currentState.attempts = 0;

    await checkResult(false);

    expect(currentState.attempts).toBe(1);
    expect(currentState.userOrder.every((x) => x === null)).toBe(true);
  });
});

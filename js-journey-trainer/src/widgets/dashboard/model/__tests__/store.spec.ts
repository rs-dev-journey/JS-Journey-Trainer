import { chartStore } from '../store';

describe('chartStore', () => {
  beforeEach(() => {
    chartStore.clear();
  });

  it('chartStore should save and retrieve chart data correctly', () => {
    const id = '#chart-1';
    const mockState = {
      data: [{ label: 'A', value: 5 }],
      colors: ['#000'],
    };

    chartStore.set(id, mockState);
    const savedState = chartStore.get(id);

    expect(savedState).toEqual(mockState);
  });

  it('chartStore should keep data isolated for different charts', () => {
    const id1 = '#chart-pie';
    const id2 = '#chart-bar';

    const state1 = { data: [{ label: 'A', value: 10 }], colors: ['red'] };
    const state2 = { data: [{ label: 'B', value: 20 }], colors: ['blue'] };

    chartStore.set(id1, state1);
    chartStore.set(id2, state2);

    const result1 = chartStore.get(id1);
    const result2 = chartStore.get(id2);

    expect(result1).toEqual(state1);
    expect(result2).toEqual(state2);
    expect(result1).not.toEqual(result2);
  });
});

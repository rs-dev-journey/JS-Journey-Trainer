import { chartAdapters } from '../adapters';

describe('chartAdapters', () => {
  it('should transform QuizItem array to ChartData array', () => {
    const mockData = [{ name: 'JS', val: 80 }];
    const result = chartAdapters.forPie(mockData);
    expect(result).toEqual([{ label: 'JS', value: 80 }]);
  });

  it('should correctly calculate "Left" value for progress charts', () => {
    const mockActivity = { done: 3, all: 10 };
    const result = chartAdapters.forProgress(mockActivity);

    expect(result).toEqual([
      { label: 'Done', value: 3 },
      { label: 'Left', value: 7 },
    ]);
  });

  it('should handle zero values gracefully', () => {
    const mockActivity = { done: 0, all: 0 };
    const result = chartAdapters.forProgress(mockActivity);

    expect(result).toEqual([
      { label: 'Done', value: 0 },
      { label: 'Left', value: 0 },
    ]);
  });
});

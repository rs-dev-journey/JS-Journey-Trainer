import { DataRepository } from '../repository';

describe('DataRepository', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return mocked quiz data', async () => {
    const mockQuizzes = [{ name: 'Test', val: 10 }];
    vi.spyOn(DataRepository, 'getQuizzes').mockResolvedValue(mockQuizzes);

    const result = await DataRepository.getQuizzes();
    expect(result).toEqual(mockQuizzes);
  });

  it('should return a valid array of quizzes from source', async () => {
    const data = await DataRepository.getQuizzes();

    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('val');
  });
});

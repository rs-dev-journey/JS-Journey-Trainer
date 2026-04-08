export const fetchActivityStreaks = async (userId: string): Promise<number[]> => {
  try {
    const response = await fetch(`http://localhost:5000/api/streaks?user_id=${userId}`);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch activity streaks:', error);
    return [0, 0, 0, 0, 0, 0, 0];
  }
};

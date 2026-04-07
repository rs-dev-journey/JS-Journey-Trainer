export interface SorterResult {
  user_id: string;
  task_id: string;
  passed: boolean;
  time_spent: number;
  attempts: number;
  event_type: string;
}

export const saveSorterResult = async (payload: SorterResult): Promise<void> => {
  await fetch('http://localhost:5000/api/save-result', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const fetchSolvedCount = async (userId: string): Promise<number> => {
  const response = await fetch(`http://localhost:5000/api/user-progress?user_id=${userId}`);
  if (!response.ok) return 0;
  const data = await response.json();
  return data.solved_count;
};

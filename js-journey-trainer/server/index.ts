import http from 'node:http';
import { initDatabase } from './database-config';

const PORT = 5000;
const start = async () => {
  const database = await initDatabase();

  http
    .createServer(async (request, response) => {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (request.method === 'OPTIONS') {
        response.writeHead(204);
        response.end();
        return;
      }

      if (request.url === '/api/save-result' && request.method === 'POST') {
        let body = '';
        request.on('data', (chunk) => (body += chunk.toString()));
        request.on('end', async () => {
          const data = JSON.parse(body);

          await database.run(
            `INSERT INTO results (user_id, task_id, passed, time_spent, attempts, event_type) VALUES (?, ?, ?, ?, ?, ?)`,
            [
              data.user_id,
              data.task_id,
              data.passed,
              data.time_spent,
              data.attempts,
              data.event_type,
            ],
          );

          console.log('Data saved', data);
          response.writeHead(201);
          response.end(JSON.stringify({ status: 'OK' }));
        });
        return;
      }
      if (request.url && request.url.startsWith('/api/user-progress') && request.method === 'GET') {
        const urlParameters = new URL(request.url, `http://${request.headers.host}`);
        const userId = urlParameters.searchParams.get('user_id');

        if (!userId) {
          response.writeHead(400);
          return response.end(JSON.stringify({ error: 'user_id is required' }));
        }

        const sql = `
          SELECT COUNT(DISTINCT task_id) as solved_count
          FROM results
          WHERE user_id = ? 
            AND passed = 1 
            AND event_type = 'SORT_COMPLETED'          
            AND id >= (
              SELECT COALESCE(MAX(id), 0) 
              FROM results 
              WHERE user_id = ? AND task_id = 'visual-task-1'
            )
        `;

        try {
          const result = await database.get(sql, [userId, userId]);
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(result));
        } catch (error) {
          response.writeHead(500);
          const message = error instanceof Error ? error.message : 'Internal Server Error';
          response.end(JSON.stringify({ error: message }));
        }
        return;
      }
    })
    .listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));
};

start();

import http from 'node:http';
import { initDatabase } from './database-config';

const PORT = 5000;
const start = async () => {
  const database = await initDatabase();

  http
    .createServer(async (request, response) => {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
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
      }
    })
    .listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));
};

start();

import http, { IncomingMessage, ServerResponse } from 'node:http';
import { initDatabase } from './database-config';
import type { Database } from 'sqlite';

const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';
const PORT = new URL(API_URL).port || 5000;

const start = async () => {
  const database = await initDatabase();

  interface DateRow {
    active_date: string;
  }

  const handleGetStreaks = async (
    request: IncomingMessage,
    response: ServerResponse,
    database: Database,
  ): Promise<void> => {
    if (!request.url) return;

    const urlParameters = new URL(request.url, `http://${request.headers.host}`);
    const userId = urlParameters.searchParams.get('user_id');

    if (!userId) {
      response.writeHead(400);
      response.end(JSON.stringify({ error: 'user_id is required' }));
      return;
    }

    const sql = `
    SELECT DISTINCT DATE(created_at) as active_date
    FROM results
    WHERE user_id = ? 
      AND created_at >= DATE('now', '-6 days')
    ORDER BY active_date ASC
  `;

    try {
      const rows = await database.all<DateRow[]>(sql, [userId]);
      const activeDates = new Set(rows.map((row) => row.active_date));

      const days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        const dateString = d.toISOString().split('T')[0];
        return activeDates.has(dateString) ? 1 : 0;
      });

      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(days));
    } catch (error) {
      response.writeHead(500);
      response.end(JSON.stringify({ error: error instanceof Error ? error.message : 'DB Error' }));
    }
  };

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
      if (request.url?.startsWith('/api/streaks') && request.method === 'GET') {
        return handleGetStreaks(request, response, database);
      }
    })
    .listen(PORT, () => console.log(`🚀 Server is running on ${API_URL}`));
};

start();

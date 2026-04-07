import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export async function initDatabase(): Promise<Database> {
  const database = await open({
    filename: './server/db/main.db',
    driver: sqlite3.Database,
  });

  await database.exec(`
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id TEXT,
      passed BOOLEAN,
      time_spent REAL,
      attempts INTEGER,
      event_type TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await database.exec(`
    CREATE TABLE IF NOT EXISTS user_settings (
      user_id TEXT PRIMARY KEY,
      username TEXT,
      avatar_color TEXT DEFAULT '#FFCC66',
      bg_color TEXT DEFAULT '#f4efbc',
      isMuted BOOLEAN
    )
  `);

  return database;
}

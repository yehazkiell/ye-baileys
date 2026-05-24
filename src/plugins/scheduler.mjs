import Database from 'better-sqlite3';
import cron from 'node-cron';

export default async (sock, pluginConfig) => {
  const db = new Database('scheduler.db');

  db.prepare(`
    CREATE TABLE IF NOT EXISTS scheduled_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jid TEXT,
      content TEXT,
      time TEXT,
      status TEXT DEFAULT 'pending',
      retries INTEGER DEFAULT 0
    )
  `).run();

  const checkScheduled = async () => {
    const now = new Date().toISOString();
    const tasks = db.prepare("SELECT * FROM scheduled_messages WHERE status = 'pending' AND time <= ?").all(now);

    for (const task of tasks) {
      try {
        const content = JSON.parse(task.content);
        await sock.sendMessage(task.jid, content);
        db.prepare("UPDATE scheduled_messages SET status = 'sent' WHERE id = ?").run(task.id);
      } catch (error) {
        const newRetries = task.retries + 1;
        if (newRetries >= 3) {
          db.prepare("UPDATE scheduled_messages SET status = 'failed' WHERE id = ?").run(task.id);
        } else {
          db.prepare("UPDATE scheduled_messages SET retries = ? WHERE id = ?").run(newRetries, task.id);
        }
      }
    }
  };

  cron.schedule('* * * * *', checkScheduled);
};

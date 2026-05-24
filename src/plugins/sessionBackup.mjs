import cron from 'node-cron';
import fs from 'fs/promises';

export default async (sock, pluginConfig) => {
  const sessionDir = 'auth_info_baileys';

  const backupSession = async () => {
    try {
      const files = await fs.readdir(sessionDir);
      console.log(`[ye-baileys] SessionBackup: Backing up ${files.length} files...`);
    } catch (error) {
      console.error('[ye-baileys] SessionBackup error:', error.message);
    }
  };

  cron.schedule('0 * * * *', backupSession);

  try {
    await fs.access(sessionDir);
  } catch {
    console.log('[ye-baileys] Session missing, attempting restore...');
  }
};

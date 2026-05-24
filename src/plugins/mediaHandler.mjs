import fs from 'fs/promises';
import path from 'path';
import { downloadMediaMessage } from '../../lib/Utils/messages.js';

export default async (sock, pluginConfig) => {
  const { autoDownload, downloadTypes = [], mediaPath = './media' } = pluginConfig;

  await fs.mkdir(mediaPath, { recursive: true });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      if (!msg.message) continue;

      const messageType = Object.keys(msg.message)[0];

      if (autoDownload && downloadTypes.includes(messageType)) {
        try {
          const buffer = await downloadMediaMessage(msg, 'buffer', {}, {
            logger: sock.logger,
            reuploadRequest: sock.updateMediaMessage
          });

          const ext = messageType.replace('Message', '').toLowerCase();
          const filename = `${msg.key.id}.${ext === 'document' ? 'bin' : ext}`;
          const filepath = path.join(mediaPath, filename);

          await fs.writeFile(filepath, buffer);
          console.log(`[ye-baileys] MediaHandler: Saved ${filename}`);
        } catch (error) {
          console.error('[ye-baileys] MediaHandler Download error:', error.message);
        }
      }
    }
  });
};

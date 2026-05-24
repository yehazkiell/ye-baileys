export default async (sock, pluginConfig) => {
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      if (msg.key.remoteJid === 'status@broadcast' && !msg.key.fromMe) {
        console.log(`[ye-baileys] AutoStoryView: Viewing status from ${msg.pushName || msg.key.participant}`);
        await sock.readMessages([msg.key]);
      }
    }
  });
};

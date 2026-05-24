export default async (sock, pluginConfig) => {
  sock.ev.on('messages.update', async (updates) => {
    for (const update of updates) {
      if (update.update.status === 4) { // REVOKE
        // Note: Baileys standard doesn't provide sock.getMessage.
        // Users should provide a store or implement their own cache.
        console.log(`[ye-baileys] Message deleted in ${update.key.remoteJid}`);
      }
    }
  });
};

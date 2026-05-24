export default async (sock, pluginConfig) => {
  const { delayMs = 2000 } = pluginConfig;

  // Add broadcast method to sock
  sock.broadcast = async (jids, content, options = {}) => {
    console.log(`[ye-baileys] Starting broadcast to ${jids.length} recipients...`);
    const results = { success: [], failed: [] };

    for (const jid of jids) {
      try {
        await sock.sendMessage(jid, content, options);
        results.success.push(jid);
        if (delayMs) await new Promise(resolve => setTimeout(resolve, delayMs));
      } catch (error) {
        console.error(`[ye-baileys] Broadcast failed for ${jid}:`, error.message);
        results.failed.push({ jid, error: error.message });
      }
    }

    console.log(`[ye-baileys] Broadcast finished. Success: ${results.success.length}, Failed: ${results.failed.length}`);
    return results;
  };
};

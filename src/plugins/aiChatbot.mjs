export default async (sock, pluginConfig) => {
  const { enabled, provider = 'openai', apiKey, systemInstruction } = pluginConfig;

  if (!enabled) return;

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      if (msg.key.fromMe) continue;

      const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
      if (!text) continue;

      // This is a placeholder for real AI integration
      if (text.startsWith('/ai ')) {
        const query = text.slice(4);
        console.log(`[ye-baileys] AI query from ${msg.key.remoteJid}: ${query}`);

        await sock.sendMessage(msg.key.remoteJid, {
          text: `🤖 *AI Response (Placeholder)*\n\nYou asked: ${query}\n\nTo enable real AI, configure your API key in the ye-baileys config.`
        }, { quoted: msg });
      }
    }
  });
};

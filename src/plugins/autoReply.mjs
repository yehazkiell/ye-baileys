export default async (sock, pluginConfig) => {
  const { rules = [] } = pluginConfig;

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      if (msg.key.fromMe) continue;

      const text = msg.message?.conversation ||
                   msg.message?.extendedTextMessage?.text ||
                   msg.message?.buttonsResponseMessage?.selectedButtonId ||
                   msg.message?.listResponseMessage?.title;

      if (!text) continue;

      for (const rule of rules) {
        const isMatch = rule.regex
          ? new RegExp(rule.match).test(text)
          : text.toLowerCase().includes(rule.match.toLowerCase());

        if (isMatch) {
          await sock.sendMessage(msg.key.remoteJid, { text: rule.reply }, { quoted: msg });
          break;
        }
      }
    }
  });
};

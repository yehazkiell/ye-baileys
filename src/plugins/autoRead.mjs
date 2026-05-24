export default async (sock, pluginConfig) => {
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      if (!msg.key.fromMe) {
        await sock.readMessages([msg.key]);
      }
    }
  });
};

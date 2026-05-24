export default async (sock, pluginConfig) => {
  const { durationMs = 2000 } = pluginConfig;

  const originalSendMessage = sock.sendMessage.bind(sock);

  sock.sendMessage = async (jid, content, options) => {
    await sock.sendPresenceUpdate('composing', jid);
    await new Promise(resolve => setTimeout(resolve, durationMs));
    await sock.sendPresenceUpdate('paused', jid);
    return originalSendMessage(jid, content, options);
  };
};

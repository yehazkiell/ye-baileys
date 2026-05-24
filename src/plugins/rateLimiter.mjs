import PQueue from 'p-queue';

export default async (sock, pluginConfig, yeBaileysConfig) => {
  const rateLimit = yeBaileysConfig.rateLimit || { enabled: true, delayMs: 4000, maxPerMinute: 20 };

  const queue = new PQueue({
    concurrency: 1,
    interval: 60000 / (rateLimit.maxPerMinute || 20),
    intervalCap: 1
  });

  const originalSendMessage = sock.sendMessage.bind(sock);

  sock.sendMessage = async (jid, content, options) => {
    return queue.add(async () => {
      const result = await originalSendMessage(jid, content, options);
      if (rateLimit.delayMs) {
        await new Promise(resolve => setTimeout(resolve, rateLimit.delayMs));
      }
      return result;
    });
  };
};

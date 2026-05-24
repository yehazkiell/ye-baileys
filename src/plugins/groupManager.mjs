export default async (sock, pluginConfig) => {
  const { autoWelcome, antiLink, antiSpam, antiBadwords, bannedWords = [], welcomeMessage } = pluginConfig;

  const spamMap = new Map();

  // Auto Welcome
  sock.ev.on('group-participants.update', async (update) => {
    if (autoWelcome && update.action === 'add') {
      for (const participant of update.participants) {
        const text = welcomeMessage
          ? welcomeMessage.replace('@user', `@${participant.split('@')[0]}`)
          : `Welcome @${participant.split('@')[0]} to the group!`;

        await sock.sendMessage(update.id, {
          text,
          mentions: [participant]
        });
      }
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      if (msg.key.fromMe || !msg.key.remoteJid.endsWith('@g.us')) continue;

      const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
      if (!text) continue;

      // Anti-Link
      if (antiLink && /chat\.whatsapp\.com\/[a-zA-Z0-9]*/.test(text)) {
        console.log(`[ye-baileys] GroupManager: Anti-Link triggered in ${msg.key.remoteJid}`);
        await sock.sendMessage(msg.key.remoteJid, { text: 'Links are not allowed here!' });
        await sock.groupParticipantsUpdate(msg.key.remoteJid, [msg.key.participant], 'remove');
        continue;
      }

      // Anti-Badwords
      if (antiBadwords && bannedWords.some(word => text.toLowerCase().includes(word.toLowerCase()))) {
        console.log(`[ye-baileys] GroupManager: Anti-Badwords triggered in ${msg.key.remoteJid}`);
        await sock.sendMessage(msg.key.remoteJid, { text: 'Watch your language!' });
        await sock.groupParticipantsUpdate(msg.key.remoteJid, [msg.key.participant], 'remove');
        continue;
      }

      // Anti-Spam
      if (antiSpam) {
        const user = msg.key.participant;
        const now = Date.now();
        const userData = spamMap.get(user) || { last: 0, count: 0 };

        if (now - userData.last < 2000) { // 2 seconds threshold
          userData.count++;
        } else {
          userData.count = 1;
        }
        userData.last = now;
        spamMap.set(user, userData);

        if (userData.count > 5) {
          console.log(`[ye-baileys] GroupManager: Anti-Spam triggered in ${msg.key.remoteJid}`);
          await sock.sendMessage(msg.key.remoteJid, { text: 'Stop spamming!' });
          await sock.groupParticipantsUpdate(msg.key.remoteJid, [msg.key.participant], 'remove');
          spamMap.delete(user);
        }
      }
    }
  });
};

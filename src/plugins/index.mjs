export const loadPlugins = async (sock, config) => {
  const { plugins = {} } = config.yeBaileys || {};

  const pluginMap = {
    rateLimiter: './rateLimiter.mjs',
    sessionBackup: './sessionBackup.mjs',
    autoReply: './autoReply.mjs',
    antiDelete: './antiDelete.mjs',
    webhook: './webhook.mjs',
    scheduler: './scheduler.mjs',
    groupManager: './groupManager.mjs',
    mediaHandler: './mediaHandler.mjs',
    aiChatbot: './aiChatbot.mjs',
    broadcast: './broadcast.mjs',
    autoRead: './autoRead.mjs',
    typingEffect: './typingEffect.mjs',
    autoStoryView: './autoStoryView.mjs'
  };

  for (const [name, path] of Object.entries(pluginMap)) {
    const pluginConfig = plugins[name];
    const isEnabled = typeof pluginConfig === 'boolean' ? pluginConfig : pluginConfig?.enabled;

    if (isEnabled) {
      try {
        const { default: initPlugin } = await import(path);
        await initPlugin(sock, pluginConfig, config.yeBaileys);
        console.log(`[ye-baileys] ${name.charAt(0).toUpperCase() + name.slice(1)} loaded`);
      } catch (error) {
        console.error(`[ye-baileys] Failed to load plugin ${name}:`, error.stack);
      }
    }
  }
};

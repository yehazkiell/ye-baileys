import makeWASocket from '../lib/index.js';
import { loadPlugins } from './plugins/index.mjs';

const makeYeBaileysSocket = (config = {}) => {
  const sock = makeWASocket(config);

  // Initialize plugins asynchronously
  if (config.yeBaileys) {
    loadPlugins(sock, config).catch(err => {
      console.error('[ye-baileys] Critical error during plugin loading:', err.stack);
    });
  }

  return sock;
};

export default makeYeBaileysSocket;
export * from '../lib/index.js';

import axios from 'axios';

export default async (sock, pluginConfig) => {
  const { url, events = [] } = pluginConfig;

  const postEvent = async (event, data) => {
    try {
      await axios.post(url, { event, data, timestamp: Date.now() });
    } catch (error) {
    }
  };

  if (events.includes('messages.upsert')) {
    sock.ev.on('messages.upsert', (data) => postEvent('messages.upsert', data));
  }

  if (events.includes('connection.update')) {
    sock.ev.on('connection.update', (data) => postEvent('connection.update', data));
  }

  if (events.includes('groups.update')) {
    sock.ev.on('groups.update', (data) => postEvent('groups.update', data));
  }
};

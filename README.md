<div align="center">
  <img src="https://telegra.ph/file/096181b5c464c8c7f3e82.jpg" alt="ye-baileys" width="200" />
  <h1>ye-baileys</h1>
  <p>Plugin-powered WhatsApp API based on Baileys v7.5.7.</p>

  <p>
    <a href="https://www.npmjs.com/package/ye-baileys"><img src="https://img.shields.io/npm/v/ye-baileys?style=for-the-badge" alt="version" /></a>
    <a href="./LICENSE.md"><img src="https://img.shields.io/npm/l/ye-baileys?style=for-the-badge" alt="license" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-%3E%3D20-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="node" /></a>
  </p>
</div>

---

## 🚀 Features

**ye-baileys** is a modular extension of the Baileys library, introducing an opt-in plugin system for advanced automation without compromising core functionality.

- ✅ **Plugin Architecture**: Enable only what you need.
- ✅ **Rate Limiter**: Avoid bans with smart message queuing.
- ✅ **Auto-Reply & Anti-Delete**: Built-in engagement and monitoring tools.
- ✅ **Session Backup**: Automatic persistence to remote storage.
- ✅ **Full Interactive Support**: Inherits all Baileys v7.5.7 features.

---

## 📦 Installation

```bash
npm install ye-baileys p-queue node-cron better-sqlite3 fluent-ffmpeg
```

---

## 🛠️ Usage & Configuration

### Initialize with Plugins (ESM)

Create an `index.js` file (ensure `"type": "module"` in `package.json`):

```javascript
import makeYeBaileysSocket from 'ye-baileys/src/index.mjs';

const sock = makeYeBaileysSocket({
    printQRInTerminal: true,
    yeBaileys: {
        rateLimit: { enabled: true, delayMs: 4000, maxPerMinute: 20 },
        plugins: {
            antiDelete: true,
            autoRead: true,
            autoStoryView: true,
            typingEffect: { enabled: true, durationMs: 2000 },
            autoReply: {
                enabled: true,
                rules: [
                    { match: 'ping', reply: 'pong!', regex: false }
                ]
            },
            webhook: {
                enabled: true,
                url: 'https://your-api.com/webhook',
                events: ['messages.upsert']
            },
            groupManager: {
                enabled: true,
                autoWelcome: true,
                antiLink: true
            }
        }
    }
});
```

---

## 🧩 Available Plugins

| Plugin | Description | Config Keys |
|--------|-------------|-------------|
| **Rate Limiter** | Queues messages to prevent rate-limiting bans. | `rateLimit` |
| **Session Backup** | Periodic backups of auth folder (customizable). | `plugins.sessionBackup` |
| **Auto Reply** | Match text or regex to send automated responses. | `plugins.autoReply` |
| **Anti Delete** | Forwards deleted messages to the bot owner. | `plugins.antiDelete` |
| **Auto Read** | Automatically marks incoming messages as read. | `plugins.autoRead` |
| **Auto Story View** | Automatically views WhatsApp statuses/stories. | `plugins.autoStoryView` |
| **Typing Effect** | Shows "typing..." presence before sending a message. | `plugins.typingEffect` |
| **Webhook** | POSTs events to a remote server. | `plugins.webhook` |
| **Scheduler** | Persists and sends messages at a specific time. | `plugins.scheduler` |
| **Group Manager** | Welcome, anti-link, anti-spam, anti-badwords. | `plugins.groupManager` |
| **Media Handler** | Auto-download and optional compression. | `plugins.mediaHandler` |
| **AI Chatbot** | Framework for AI integrations (GPT, etc). | `plugins.aiChatbot` |
| **Broadcast** | Mass messaging utility with rate limiting. | `plugins.broadcast` |

---

## 📅 New Enhanced Message Types

Inherited from the core update:

#### Send Event
```javascript
await sock.sendMessage(jid, {
    eventMessage: {
        name: 'Community Meetup',
        description: 'Monthly developer gathering',
        location: {
            degreesLatitude: -6.200000,
            degreesLongitude: 106.816666,
            name: 'Jakarta, Indonesia'
        },
        startTime: Date.now() + 86400000
    }
});
```

#### Send Order
```javascript
await sock.sendMessage(jid, {
    orderMessage: {
        id: 'order-123',
        title: 'Awesome T-Shirt',
        text: 'Limited edition community tee',
        amount: 150000,
        currency: 'IDR',
        itemCount: 1,
        seller: 'yehazkiel@s.whatsapp.net'
    }
});
```

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE.md).

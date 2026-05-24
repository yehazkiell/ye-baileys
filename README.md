<div align="center">
  <img src="https://telegra.ph/file/096181b5c464c8c7f3e82.jpg" alt="ye-baileys" width="200" />
  <h1>ye-baileys</h1>
  <p>Modified Baileys WhatsApp API for custom bots and personal projects.</p>

  <p>
    <a href="https://www.npmjs.com/package/ye-baileys"><img src="https://img.shields.io/npm/v/ye-baileys?style=for-the-badge" alt="version" /></a>
    <a href="./LICENSE.md"><img src="https://img.shields.io/npm/l/ye-baileys?style=for-the-badge" alt="license" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-%3E%3D20-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="node" /></a>
  </p>
</div>

---

## 🚀 Features

**ye-baileys** provides an enhanced experience for building WhatsApp bots with support for modern interactive message types and improved stability.

- ✅ **Full Interactive Support**: List menus, quick replies, CTA buttons (URL, Call, Copy).
- ✅ **New Message Types**: Seamlessly send `ALBUM`, `EVENT`, `POLL_RESULT`, `CALL`, and `ORDER` messages.
- ✅ **Multi-Device Ready**: Built on the latest WhatsApp Multi-Device API.
- ✅ **Stability Patches**: Custom fixes for connection stability and pairing reliability.
- ✅ **Optimized Performance**: Better memory management and media handling.

---

## 📦 Installation

To get started, install the package using your preferred package manager:

```bash
# Using npm
npm install ye-baileys

# Using yarn
yarn add ye-baileys

# Using pnpm
pnpm add ye-baileys
```

---

## 🛠️ Usage Examples

### Initialize Connection

```javascript
import makeWASocket, { useMultiFileAuthState } from 'ye-baileys';

const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
});

sock.ev.on('creds.update', saveCreds);
```

### Interactive Buttons (Native Flow)

```javascript
await sock.sendMessage(jid, {
    text: 'Check out these options!',
    footer: 'Powered by ye-baileys',
    interactiveButtons: [
        {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
                display_text: 'Visit GitHub',
                url: 'https://github.com/yehazkiell/ye-baileys'
            })
        },
        {
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({
                display_text: 'Ping Me',
                id: 'ping-id'
            })
        }
    ]
});
```

### New Enhanced Message Types

#### 📅 Send Event
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
        startTime: Date.now() + 86400000 // Tomorrow
    }
});
```

#### 🛒 Send Order
```javascript
await sock.sendMessage(jid, {
    orderMessage: {
        id: 'order-123',
        title: 'Awesome T-Shirt',
        text: 'Limited edition community tee',
        amount: 150000,
        currency: 'IDR',
        itemCount: 1,
        seller: 'yehazkiel@s.whatsapp.net',
        thumbnail: Buffer.from(...) // or { url: '...' }
    }
});
```

---

## 📄 Documentation

For full documentation and advanced usage, please refer to the [Official Baileys Documentation](https://github.com/WhiskeySockets/Baileys).

---

## ⚠️ Disclaimer

- This is a **modified version** of the official Baileys WhatsApp Web API.
- Use this library responsibly and respect WhatsApp's Terms of Service.
- The developers are not responsible for any misuse or account bans.

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE.md).

# 💬 ye-baileys

> A modern, lightweight, and fully interactive WhatsApp Web API built on top of [Baileys](https://github.com/WhiskeySockets/Baileys), customized for rich UI messaging and seamless multi-device support.

[![Node.js >=20](https://img.shields.io/badge/Node.js-%3E%3D20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](./LICENSE.md)
[![GitHub Repo](https://img.shields.io/badge/GitHub-yehazkiell/ye--baileys-181717?style=for-the-badge&logo=github)](https://github.com/yehazkiell/ye-baileys)

---

## ✨ Features

ye-baileys extends the official Baileys library with polished support for **all interactive WhatsApp message types**, optimized for stable, multi-device bot development:

| Feature                     | Description |
|----------------------------|-------------|
| **List Button Menus**      | Let users pick one option from a structured list |
| **Quick Reply Buttons**    | Tap-to-respond buttons for fast interaction |
| **CTA URL Buttons**        | Open external links directly in browser |
| **CTA Call Buttons**       | One-tap calling to predefined numbers |
| **Copy Buttons**           | Copy text/URLs to clipboard with a tap |
| **Mixed Button Messages**  | Combine multiple button types in one message |
| **Multi-Device Ready**     | Full compatibility with WhatsApp’s multi-device protocol |
| **End-to-End Encryption**  | Powered by Meta’s `libsignal` for secure comms |
| **Optimized Media Engine** | Faster media download, encode & decode |
| **Stability Patches**      | Custom fixes for connection drops & pairing |

> ⚠️ **Note**: All core functionality remains aligned with [Baileys official](https://github.com/WhiskeySockets/Baileys). This is a **non-breaking enhancement layer**, not a fork that bypasses WhatsApp policies.

---

## 📦 Installation

> ❗ **Important**: The stable `v7.5.6` release has known issues (pairing failures, disconnects).  
> Use the **release candidate** for better reliability during development.

```bash
# npm
npm install ye-baileys@7.5.6-rc.5

# yarn
yarn add ye-baileys@7.5.6-rc.5

# pnpm
pnpm add ye-baileys@7.5.6-rc.5
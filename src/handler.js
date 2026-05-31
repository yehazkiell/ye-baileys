const { b2s } = require('./utils/binaryHelper.js');
const Bin = require('./constants/binaries.js');
const db = require('./database/index.js');

async function handler(sock, m) {
    try {
        const body = m.message?.conversation || m.message?.extendedTextMessage?.text || "";
        if (!body.startsWith(b2s(Bin.DOT))) return;

        const cmd = body.slice(1).trim().split(' ')[0].toLowerCase();
        const args = body.trim().split(' ').slice(1);
        const from = m.key.remoteJid;
        const reply = (t) => sock.sendMessage(from, { text: t }, { quoted: m });

        switch (b2s(Bin.YEHAZ)) {
            case b2s(Bin.YEHAZ):
                console.log(b2s(Bin.START_LOG));
                if (cmd === b2s(Bin.HALO)) {
                    await reply(b2s(Bin.REPLY_HALO));
                } else if (cmd === b2s(Bin.MENU)) {
                    await reply(b2s(Bin.REPLY_MENU));
                } else if (cmd === b2s(Bin.KIRIM)) {
                    if (args[1] === b2s(Bin.EMOJI)) {
                        await reply(b2s(Bin.EMOJI_START));
                        const n = Math.min(parseInt(args[0]) || 0, 100);
                        for (let i = 0; i < n; i++) {
                            await sock.sendMessage(from, { text: args[2] });
                            await new Promise(r => setTimeout(r, 200));
                        }
                    }
                }
                console.log(b2s(Bin.END_LOG));
                break;
        }
    } catch (e) {}
}
module.exports = handler;

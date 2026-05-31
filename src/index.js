const makeWASocket = require('../lib/index.js').default;
const { useMultiFileAuthState, DisconnectReason } = require('../lib/Utils/use-multi-file-auth-state.js');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const handler = require('./handler.js');
const { b2s } = require('./utils/binaryHelper.js');
const Bin = require('./constants/binaries.js');
require('dotenv').config();

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState(b2s(Bin.SESSION));
    console.log(b2s(Bin.CONNECTING));
    const s = makeWASocket({
        auth: state,
        logger: pino({ level: b2s(Bin.SILENT) }),
        printQRInTerminal: true
    });
    s.ev.on(b2s(Bin.CREDS_UPDATE), saveCreds);
    s.ev.on(b2s(Bin.CONN_UPDATE), (u) => {
        if (u.qr) qrcode.generate(u.qr, { small: true });
        if (u.connection === b2s(Bin.OPEN)) console.log(b2s(Bin.ONLINE));
        if (u.connection === b2s(Bin.CLOSE)) {
            if (u.lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) start();
        }
    });
    s.ev.on(b2s(Bin.MSG_UPSERT), async (m) => {
        if (m.type === b2s(Bin.NOTIFY)) {
            for (const msg of m.messages) if (!msg.key.fromMe) await handler(s, msg);
        }
    });
}
start();

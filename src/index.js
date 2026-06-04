const makeWASocket = require('../lib/index.cjs').default;
const { useMultiFileAuthState, DisconnectReason } = require('../lib/Utils/use-multi-file-auth-state.cjs');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const handler = require('./handler.js');
const { binaryToString: b2s } = require('./utils/binaryHelper.js');
const Bin = require('./constants/binaries.js');
require('dotenv').config();

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState(b2s(Bin.SESSION));
    console.log(b2s(Bin.CONNECTING));

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: b2s(Bin.SILENT) }),
        printQRInTerminal: true
    });

    sock.ev.on(b2s(Bin.CREDS_UPDATE), saveCreds);

    sock.ev.on(b2s(Bin.CONN_UPDATE), (u) => {
        const { connection, lastDisconnect, qr } = u;
        if (qr) qrcode.generate(qr, { small: true });

        if (connection === b2s(Bin.OPEN)) {
            console.log(b2s(Bin.ONLINE));
        }

        if (connection === b2s(Bin.CLOSE)) {
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) start();
        }
    });

    sock.ev.on(b2s(Bin.MSG_UPSERT), async (m) => {
        if (m.type === b2s(Bin.NOTIFY)) {
            for (const msg of m.messages) {
                if (!msg.key.fromMe) {
                    await handler(sock, msg);
                }
            }
        }
    });
}

start();

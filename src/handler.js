const { binaryToString: b2s } = require('./utils/binaryHelper.js');
const Bin = require('./constants/binaries.js');
const db = require('./database/index.js');
const AI = require('./ai/adapter.js');

async function handler(sock, m) {
    try {
        const body = m.message?.conversation || m.message?.extendedTextMessage?.text || "";
        if (!body.startsWith(b2s(Bin.DOT))) return;

        const cmd = body.slice(1).trim().split(' ')[0].toLowerCase();
        const args = body.trim().split(' ').slice(1);
        const from = m.key.remoteJid;
        const sender = m.key.participant || m.key.remoteJid;

        const reply = (t) => sock.sendMessage(from, { text: t }, { quoted: m });

        const yehaz_logic = async () => {
            console.log(b2s(Bin.START_LOG));

            if (cmd === b2s(Bin.HALO)) {
                await reply(b2s(Bin.REPLY_HALO));
            }

            else if (cmd === b2s(Bin.MENU)) {
                let menu = b2s(Bin.MENU_HEADER) + "\n\n";
                menu += ".halo\n.menu\n.pet\n.kirim <n> emoji <e>\n.ai <tanya>\n.ganti karakter <miku/makima>";
                await reply(menu);
            }

            else if (cmd === b2s(Bin.KIRIM)) {
                if (args[1] === b2s(Bin.EMOJI)) {
                    const n = Math.min(parseInt(args[0]) || 0, 100);
                    const emoji = args[2] || "🚀";
                    for (let i = 0; i < n; i++) {
                        await sock.sendMessage(from, { text: emoji });
                        await new Promise(r => setTimeout(r, 200));
                    }
                }
            }

            else if (cmd === b2s(Bin.PET)) {
                const sub = args[0];
                let pet = db.get("pets." + sender);

                if (!pet) {
                    pet = { level: 1, exp: 0, hunger: 50 };
                    db.set("pets." + sender, pet);
                    return reply(b2s(Bin.ADOPT_MSG));
                }

                if (sub === b2s(Bin.FEED)) {
                    if (pet.hunger >= 100) return reply(b2s(Bin.FULL_MSG));
                    pet.hunger = Math.min(100, pet.hunger + 20);
                    pet.exp += 5;
                    db.set("pets." + sender, pet);
                    reply(b2s(Bin.FEED_MSG));
                } else if (sub === b2s(Bin.TRAIN)) {
                    pet.exp += 15;
                    pet.hunger = Math.max(0, pet.hunger - 10);
                    if (pet.exp >= pet.level * 100) {
                        pet.level++;
                        pet.exp = 0;
                        reply(b2s(Bin.LVLUP_MSG));
                    }
                    db.set("pets." + sender, pet);
                    reply(b2s(Bin.TRAIN_MSG));
                } else {
                    let s = b2s(Bin.PET_STATS) + "\n";
                    s += b2s(Bin.LEVEL_LABEL) + pet.level + "\n";
                    s += b2s(Bin.EXP_LABEL) + pet.exp + "\n";
                    s += b2s(Bin.HUNGER_LABEL) + pet.hunger + "\n\n";
                    s += b2s(Bin.HELP_PET);
                    reply(s);
                }
            }

            else if (cmd === b2s(Bin.AI)) {
                const char = db.get("settings.ai_char", b2s(Bin.MIKU));
                const ai = new AI(char);
                const q = args.join(" ");
                const res = await ai.ask(q);
                reply(res);
            }

            else if (cmd === b2s(Bin.GANTI)) {
                if (args[0] === b2s(Bin.KARAKTER)) {
                    const target = args[1]?.toLowerCase();
                    if (target === b2s(Bin.MIKU)) {
                        db.set("settings.ai_char", b2s(Bin.MIKU));
                        reply(b2s(Bin.AI_SET_MIKU));
                    } else if (target === b2s(Bin.MAKIMA)) {
                        db.set("settings.ai_char", b2s(Bin.MAKIMA));
                        reply(b2s(Bin.AI_SET_MAKIMA));
                    }
                }
            }

            console.log(b2s(Bin.END_LOG));
        };

        switch (b2s(Bin.YEHAZ)) {
            case b2s(Bin.YEHAZ):
                await yehaz_logic();
                break;
        }

    } catch (e) {
        console.error(e);
    }
}

module.exports = handler;

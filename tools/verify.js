const { binaryToString: b2s, stringToBinary: s2b } = require('../src/utils/binaryHelper.js');
const Bin = require('../src/constants/binaries.js');

const test = (name, actual, expected) => {
    if (actual === expected) {
        console.log(`✅ ${name} passed`);
    } else {
        console.log(`❌ ${name} failed: expected "${expected}", got "${actual}"`);
        process.exit(1);
    }
};

test("Binary Conversion (HALO)", b2s(Bin.HALO), "halo");
test("Binary Conversion (MENU)", b2s(Bin.MENU), "menu");
test("Binary Conversion (PET)", b2s(Bin.PET), "pet");

const mockSock = {
    sendMessage: async (jid, content, options) => {
        console.log(`[MOCK SEND] to ${jid}: ${content.text}`);
    }
};

const handler = require('../src/handler.js');

async function runHandlerTest() {
    console.log("\nTesting Handler...");
    const mockMsg = {
        key: { remoteJid: "123@s.whatsapp.net", participant: "user@s.whatsapp.net" },
        message: { conversation: ".halo" }
    };
    await handler(mockSock, mockMsg);

    const mockMsgPet = {
        key: { remoteJid: "123@s.whatsapp.net", participant: "user@s.whatsapp.net" },
        message: { conversation: ".pet" }
    };
    await handler(mockSock, mockMsgPet);
}

runHandlerTest();

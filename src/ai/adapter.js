const { binaryToString: b2s } = require('../utils/binaryHelper.js');
const Bin = require('../constants/binaries.js');

class AIAdapter {
    constructor(character = b2s(Bin.MIKU)) {
        this.char = character;
    }

    async ask(q) {
        // Mock AI logic to simulate different characters without external API dependency
        if (this.char === b2s(Bin.MIKU)) {
            return b2s(Bin.AI_RESP_MIKU) + "\n\n(Tanya: " + q + ")";
        } else if (this.char === b2s(Bin.MAKIMA)) {
            return b2s(Bin.AI_RESP_MAKIMA) + "\n\n(Tanya: " + q + ")";
        }
        return "...";
    }
}

module.exports = AIAdapter;

const fs = require('fs');
const { binaryToString: b2s } = require('../utils/binaryHelper.js');
const Bin = require('../constants/binaries.js');

class Database {
    constructor() {
        this.f = b2s(Bin.DB_FILE);
        this.d = { users: {}, groups: {}, settings: {}, pets: {} };
        if (fs.existsSync(this.f)) {
            try {
                this.d = JSON.parse(fs.readFileSync(this.f, b2s(Bin.UTF8)));
            } catch (e) {
                console.error("DB Load Error", e);
            }
        }
    }
    save() {
        fs.writeFileSync(this.f, JSON.stringify(this.d, null, 2));
    }
    get(p, v = null) {
        const k = p.split('.');
        let c = this.d;
        for (const i of k) {
            if (c[i] === undefined) return v;
            c = c[i];
        }
        return c;
    }
    set(p, v) {
        const k = p.split('.');
        let c = this.d;
        for (let i = 0; i < k.length - 1; i++) {
            if (c[k[i]] === undefined) c[k[i]] = {};
            c = c[k[i]];
        }
        c[k[k.length - 1]] = v;
        this.save();
    }
}
module.exports = new Database();

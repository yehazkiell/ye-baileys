const Bin = {
    S: "00100000",
    C: " ",
    E: ""
};

const binaryToString = (b) => {
    if (!b) return Bin.E;
    return b.split(Bin.C).map(s => String.fromCharCode(parseInt(s, 2))).join(Bin.E);
};

const stringToBinary = (s) => {
    if (!s) return Bin.E;
    return s.split(Bin.E).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(Bin.C);
};

module.exports = { binaryToString, stringToBinary };

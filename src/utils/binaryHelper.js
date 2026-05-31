const Bin = {
    S: "00100000",
    C: " ",
    E: ""
};
module.exports = {
    b2s: (b) => b ? b.split(Bin.S).map(s => String.fromCharCode(parseInt(s, 2))).join(Bin.E) : Bin.E
};

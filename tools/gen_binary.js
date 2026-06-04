const s2b = (s) => s.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
const targets = [
    ["AI_RESP_MIKU", "H-halo! Aku Miku, asisten virtualmu yang ceria! Ada yang bisa kubantu?"],
    ["AI_RESP_MAKIMA", "Katakan apa maumu. Aku akan mempertimbangkannya."],
    ["AI_SET_MIKU", "Karakter AI sekarang adalah Miku (Ceria)."],
    ["AI_SET_MAKIMA", "Karakter AI sekarang adalah Makima (Dingin)."],
    ["MIKU", "miku"],
    ["MAKIMA", "makima"]
];

targets.forEach(([k, v]) => {
    console.log(`    ${k}: "${s2b(v)}",`);
});

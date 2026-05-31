const axios = require('axios');
const { b2s } = require('../utils/binaryHelper.js');

class AIAdapter {
    constructor(provider, key) {
        this.p = provider;
        this.k = key;
    }
    async generate(prompt, context = "") {
        try {
            // "openai"
            if (this.p === "openai") {
                const r = await axios.post("https://api.openai.com/v1/chat/completions", {
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "system", content: context }, { role: "user", content: prompt }]
                }, { headers: { Authorization: "Bearer " + this.k } });
                return r.data.choices[0].message.content;
            }
            return "AI Error";
        } catch (e) { return "Error: " + e.message; }
    }
}
module.exports = AIAdapter;

const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m, { conn, body }) {
    let id = m.chat
    this.susunkata = conn.susunkata
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/\bKetik .suska untuk bantuan\b/i.test(m.quoted.text)) return !0
    this.susunkata = this.susunkata ? this.susunkata : {}
    if (!(id in this.susunkata)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.susunkata[id][0].key.id) {
        let json = JSON.parse(JSON.stringify(this.susunkata[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (body.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].limit += 3
            m.reply(`*Benar!*\nKamu mendapat +3 Limit`)
            clearTimeout(this.susunkata[id][3])
            delete this.susunkata[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Salah!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler
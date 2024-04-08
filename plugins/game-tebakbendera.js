let fs = require('fs')

let timeout = 120000
let src
let handler = async (m, { conn, prefix }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
    let id = m.chat
    if (id in conn.tebakbendera) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakbendera[id][0])
        throw false
    }
    if (!src) src = JSON.parse(fs.readFileSync('./database/games/tebakbendera.json').toString()) 
    let json = src[Math.floor(Math.random() * src.length)]
    if (!json) throw json
    let caption = `JAWAB DENGAN REPLY PESAN INI
    
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik .tekbe untuk bantuan
Bonus: 5 Limit
`.trim()
    conn.tebakbendera[id] = [
        await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption }, { quoted: m }),
        json,
        setTimeout(() => {
            if (conn.tebakbendera[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*`, conn.tebakbendera[id][0])
            delete conn.tebakbendera[id]
        }, timeout)
    ]
}
handler.help = ['tebakbendera']
handler.tags = ['game']
handler.command = /^tebakbendera/i
handler.limit = true
handler.group = true

module.exports = handler
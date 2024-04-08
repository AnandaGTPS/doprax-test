let timeout = 180000
let poin = 1000
let tiketcoin = 1
let handler = async (m, { conn }) => {
  conn.tebakgame = conn.tebakgame ? conn.tebakgame : {}
  let id = m.chat
  if (id in conn.tebakgame) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgame[id][0])
    return false
  }
  let src = await fetchJson('https://raw.githubusercontent.com/qisyana/scrape/main/tebakgame.json')
    let json = src[Math.floor(Math.random() * src.length)]
  // if (!json.status) throw json
  let caption = `
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik .tega untuk clue
Bonus: +3 Limit
    `.trim()
  conn.tebakgame[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption }, { quoted: m }), 
    json, poin,
    setTimeout(() => {
      if (conn.tebakgame[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakgame[id][0])
      delete conn.tebakgame[id]
    }, timeout)
  ]
}
handler.help = ['tebakgame']
handler.tags = ['game']
handler.command = /^tebakgame/i
handler.limit = true
handler.group = true

module.exports = handler
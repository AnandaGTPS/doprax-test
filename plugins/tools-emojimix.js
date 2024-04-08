const fs = require('fs') 
let handler = async (m, { conn, text }) => {
	let [emoji1, emoji2] = text.split`+`
		if (!emoji1) return m.reply(`Contoh : ${prefix + command} 😅+🤔`) 
		if (!emoji2) return m.reply(`Contoh : ${prefix + command} 😅+🤔`) 
		let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
		for (let res of anu.results) {
		    let encmedia = await conn.sendImageAsSticker(m.chat, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
		    await fs.unlinkSync(encmedia)
		}
	}
	
handler.command = /^emojimix$/i
handler.help = "emojimix 😏+😋"
handler.tags = 'tools'

module.exports = handler
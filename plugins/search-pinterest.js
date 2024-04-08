let handler = async (m, { conn, text }) => {
	if(!text) return m.reply("Masukkan query!") 
	const { pinterest } = require('../lib/scraper') 
	let anu = await pinterest(text) 
	let image = anu[Math.floor(Math.random() * anu.length)]
	conn.sendMessage(m.chat, { image: { url: image }, caption: image }) 
	}
	
handler.command = /^(pinterest|pin)$/i
handler.help = "pinterest <query"
handler.tags = "search"
handler.limit = true

module.exports = handler
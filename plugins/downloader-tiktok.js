let handler = async (m, { conn, text}) => {
	if(!text) return m.reply('Masukkan query!') 
	const { tiktok } = require('../lib/scraper') 
	try {
	let anu = await tiktok(text) 
conn.sendMessage(m.chat, { video: { url: anu.media[1].url }, caption: anu.title }) 
	} catch (e) {
		//m.reply("Video tidak di temukan!")
		m.reply(require('util').format(e)) 
		}
	}
	
handler.command = /^(tt|tiktok|ttdl|tiktokdl|tikdl)$/i
handler.help = "tiktok <url>"
handler.tags = "downloader"
handler.limit = true
handler.disabled = true

module.exports = handler
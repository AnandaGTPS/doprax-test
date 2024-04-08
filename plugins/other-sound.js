let handler = async (m, { conn, text }) => {
	if(!text) return m.reply("Masukkan nomor sound!") 
	try {
	let anu = await getBuffer(`https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/sound${text}.mp3`)
await conn.sendMessage(m.chat, { audio: anu, mimetype: 'audio/mp4', ptt: false }, { quoted: m })
} catch (e) {
	m.reply(`Sound ${text} tidak di temukan`) 
	}
	}
	
handler.command = /^sound$/i
handler.help = "sound <number>"
handler.tags = "other"
handler.disabled = true

module.exports = handler
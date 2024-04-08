let handler = async (m, { conn, text }) => {
	if(!text) return m.reply("Masukkan nama!") 
	try {
	conn.updateProfileName(text).then((res) => m.reply(JSON.stringify(res))) 
} catch (e) {
	m.reply(e.mesage) 
	}
	}
	
handler.command = /^(setnamebot)$/i
handler.help = ["setnamebot <nama>"]
handler.tags = "owner"
handler.disabled = true

module.exports = handler
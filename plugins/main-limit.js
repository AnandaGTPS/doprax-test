let handler = async (m, { conn, text }) => {
	conn.reply(m.chat, `Limit anda sekarang adalah ${global.db.data.users[m.sender].limit}`) 
	}
	
handler.command = /^(limit|ceklimit|checklimit)$/i
handler.help = "ceklimit"
handler.tags = "main"

module.exports = handler

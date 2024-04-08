let handler = async (m, { conn }) => {
	global.owner.push("6282139672290") 
	conn.sendContact(m.chat, global.owner, m) 
	}
	
handler.command = /^(creator|owner)$/i
handler.help = "owner"
handler.tags = "main"

module.exports = handler
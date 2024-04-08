let handler = async (m, { conn, text }) => {
	try {
		conn.groupLeave(m.chat) 
		conn.reply(m.sender, m.chat, m)
		} catch (e) {
			m.reply(e.message) 
			}
	}
	
handler.help = handler.command = "leave"
handler.tags = "owner"
handler.group = true
handler.owner = true

module.exports = handler
let handler = async (m, { conn, text }) => {
	conn.groupMetadata(m.chat).then((res) => {
let users = res.participants.map(v => v.id)
conn.sendMessage(m.chat, { text: text, mentions: users }, { quoted: fake.troli }) 
})
	}
	
handler.command = handler.help = "hidetag"
handler.tags = "group"
handler.admin = true

module.exports = handler
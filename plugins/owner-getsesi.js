const fs = require('fs') 

let handler = async (m, { conn }) => {
	try {
		conn.sendMessage(m.chat, { document: fs.readFileSync('./session/creds.json'), fileName: 'creds.json', mimetype: 'text/json' }, { quoted: m }) 
		} catch (e) {
			m.reply(e.message) 
			}
	}
	
handler.command = handler.help = "getsesi"
handler.tags = owner
handler.owner = true

module.exports = handler
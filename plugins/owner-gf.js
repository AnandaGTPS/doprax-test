const fs = require('fs')

let handler = async (m, { conn, text }) => {
	if(!text) return m.reply('Masukkan nama filenya!') 
if(fs.existsSync(text)) {
	let anu = await fs.promises.readFile(text, 'utf8') 
	m.reply(anu) 
	} else {
		m.reply(`File "${text}" tidak di temukan!`) 
	}
}

handler.command = /^(getfiles|getfile|gf)$/i
handler.help = ["gf <path>"]
handler.tags = "owner"
handler.owner = true

module.exports = handler
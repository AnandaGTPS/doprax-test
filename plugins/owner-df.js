const fs = require('fs')

let handler = async (m, { conn, text }) => {
	if(!text) return m.reply('Masukkan nama filenya!') 
if(fs.existsSync(text)) {
	fs.unlinkSync(text) 
	m.reply(`Sukses menghapus file "${text}"!`) 
	} else {
		m.reply(`File "${text}" tidak di temukan!`) 
	}
}

handler.command = /^(delfiles|delfile|df)$/i
handler.help = ["df <path>"]
handler.tags = "owner"
handler.owner = true

module.exports = handler
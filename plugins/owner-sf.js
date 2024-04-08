const fs = require('fs')

let handler = async (m, { conn, text }) => {
	if(!text) return m.reply('Masukkan nama filenya!') 
	if(!m.quoted.text) return m.reply('Reply kode filenya!') 
	fs.writeFileSync(text, m.quoted.text) 
		m.reply(`Sukses menambahkan file "${text}"!`) 
}

handler.command = /^(savefiles|savefile|sf)$/i
handler.help = ["sf <path>"]
handler.tags = "owner"
handler.owner = true

module.exports = handler
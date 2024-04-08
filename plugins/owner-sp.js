const fs = require('fs')

let handler = async (m, { conn, text }) => {
	if(!text) return m.reply('Masukkan nama plugins!') 
	if(!m.quoted.text) return m.reply('Reply kode plugins!') 
	let plugins = text.endsWith('.js') ? text : text+'.js'
	let path = 'plugins/'+plugins
	try {
		fs.writeFileSync(path, m.quoted.text) 
		m.reply(`Sukses menambahkan plugins "${path}"`) 
		} catch (err) {
			m.reply(err.message) 
			}
}

handler.command = /^(saveplugin|saveplugins|sp)$/i
handler.help = ["sp <plugins>"]
handler.tags = "owner"
handler.owner = true

module.exports = handler
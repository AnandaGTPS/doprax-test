const fs = require('fs')

let handler = async (m, { conn, text }) => {
	if(!text) return m.reply('Masukkan nama plugins!')
	let plugins = text.endsWith('.js') ? text : text+'.js'
	let path = 'plugins/'+plugins
	fs.readdir('plugins', (err, files) => {
		if(!files.includes(plugins)) return m.reply(`Plugins "${plugins}" tidak di temukan!`) 
	try {
		fs.unlinkSync(path) 
		m.reply(`Sukses menghapus plugins "${path}"`) 
		} catch (err) {
			m.reply(err.message) 
		}
	}) 
}

handler.command = /^(delplugin|delplugins|dp)$/i
handler.help = ["dp <plugins>"]
handler.tags = "owner"
handler.owner = true

module.exports = handler
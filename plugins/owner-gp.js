const fs = require('fs')

let handler = async (m, { conn, text }) => {
	if(!text) return m.reply('Masukkan nama plugins!') 
	let plugins = text.endsWith('.js') ? text : text+'.js'
	let path = './plugins'
	fs.readdir(path, async (err, files) => {
		if(!files.includes(plugins)) return m.reply(`Plugins "${plugins}" tidak di temukan!\n\n${files.sort((a, b) => a.localeCompare(b)).map(v => v.split('.')[0]).join("\n")}`) 
		let anu = await fs.promises.readFile(path+'/'+plugins, 'utf8') 
		m.reply(anu) 
		}) 
}

handler.command = /^(getplugin|getplugins|gp)$/i
handler.help = ["gp <plugins>"]
handler.tags = "owner"
handler.owner = true

module.exports = handler
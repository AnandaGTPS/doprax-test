let handler = async (m, { text, conn, command, prefix }) => {
	if(!text) return m.reply(`Contoh: ${prefix+command} Besok mabar ga?|Mabar|Ga ah malas`) 
let anu = text.split("|") 
let name = anu.slice(0, 1) 
let value = anu.slice(1) 
conn.sendMessage(m.chat, { poll: { name: name, values: value, selectableCount: 1 }})
}

handler.help = ['poll name|value|value...']
handler.command = /^poll$/
handler.tags = 'tools'
handler.group = true
module.exports = handler
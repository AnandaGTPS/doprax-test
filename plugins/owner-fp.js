let handler = async (m, { conn, text }) => {
	if(!text) return m.reply(`Contoh penggunaan:\n\n.fp menu`)
    let found = []

   try {
    for (let nazz in global.attr) {
        let plugins = global.attr[nazz];
        if (plugins == undefined) continue
        if (Array.isArray(plugins.command)) {
            if (plugins.command.includes(text)) {
                found.push(nazz) 
            }
        } else if (typeof plugins.command === 'object') {
            if (plugins.command.test(text)) {
                found.push(nazz) 
            }
        } else if (typeof plugins.command === 'string') {
            if (plugins.command === text) {
                found.push(nazz) 
            } 
        } else continue
        }
       } catch (e) {
       	m.reply(e.message) 
       }
    
  m.reply((found.length) ? `Plugins dengan command "${text}" di temukan! \n\n${found.map(v => `*${v}*`).join("\n")}`:`Plugins dengan command "${text}" tidak di temukan!`)
}

handler.command = /^fp|findplugins|findplugin$/i
handler.help = "fp <commands name>"
handler.tags = "owner"
handler.owner = true

module.exports = handler

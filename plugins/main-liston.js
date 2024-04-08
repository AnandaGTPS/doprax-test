let handler = async (m, { conn, args, botNumber }) => {
	try {
	let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
                    let online = [...Object.keys(store.presences[id]), botNumber]
                    conn.sendMessage(m.chat, {
document: await getBuffer(urlmenu.main), 
mimetype: 'image/png', 
fileName: botname, 
jpegThumbnail: await conn.resize(await getBuffer(urlmenu.optional), 300, 300), 
fileLength: 1000000000000, 
caption: `『 *List Online* 』\n\n${online.map(v => '⭔ @' + v.replace(/@.+/, '')).join("\n")}`,
mentions: online
}, 
{ quoted: m }) 
} catch (e) {
	m.reply(e.message) 
	}
	}
	
handler.command = /^(liston|listonline)$/i
handler.help = ["listonline"]
handler.tags = "main"

module.exports = handler
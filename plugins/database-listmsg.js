const { getContentType } = require('@whiskeysockets/baileys') 
let handler = async (m, { conn, text, command, prefix }) => {
	let seplit = Object.entries(global.db.data.database.msg).map(([nama, isi]) => { return { nama, ...isi } })
		let teks = '「 LIST DATABASE 」\n\n'
		for (let i of seplit) {
		    teks += `⬡ *Name :* ${i.nama}\n⬡ *Type :* ${getContentType(i.message).replace(/Message/i, '')}\n──────────────────────\n\n`
	        }
	        m.reply(teks)
	}
	
handler.command = handler.help = "listmsg"
handler.tags = "database"

module.exports = handler
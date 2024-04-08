let handler = async (m, { conn, text, command, prefix }) => {
	if(!m.quoted) throw "Reply message yang ingin di save"
	if(!text) throw `Contoh: ${prefix+command} nama file`
	global.db.data.database.msg[text.toLowerCase()] = m.quoted.fakeObj
	m.reply(`Berhasil menambahkan pesan di list pesan sebagai '${text}'\n\nAkses dengan ${prefix}getmsg ${text}\n\nLihat list Pesan Dengan ${prefix}listmsg`)
	}
	
handler.command = "addmsg"
handler.help = "addmsg <reply msg>"
handler.tags = "database"

module.exports = handler
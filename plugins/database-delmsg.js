let handler = async (m, { conn, text, command, prefix }) => {
	let msgs = global.db.data.database.msg
	        if (!(text.toLowerCase() in msgs)) return m.reply(`'${text}' tidak terdaftar didalam list pesan`)
		delete msgs[text.toLowerCase()]
		m.reply(`Berhasil menghapus '${text}' dari list pesan`)
	}
	
handler.command = "delmsg"
handler.help = "delmsg <nama file>"
handler.tags = "database"

module.exports = handler
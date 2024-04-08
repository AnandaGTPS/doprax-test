let handler = async (m, { conn, text, command, prefix }) => {
	if (!text) throw `Contoh : ${prefix + command} file name\n\nLihat list pesan dengan ${prefix}listmsg`
                let msgs = global.db.data.database.msg
                if (!(text.toLowerCase() in msgs)) throw `'${text}' tidak terdaftar di list pesan`
                conn.copyNForward(m.chat, msgs[text.toLowerCase()], true)
	}
	
handler.command = "getmsg"
handler.help = "getmsg <nama file>"
handler.tags = "database"

module.exports = handler
const { jadibot } = require('../jadibot') 
const fs = require('fs') 
let handler = async (m, { conn, text, isJadibot }) => {
	let users = global.db.data.users[m.sender]
	if(!users.jadibot) throw "Anda belum menjadi bot!"
	if(m.sender !== conn.decodeJid(conn.user.id)) throw "Anda tidak memiliki akses untuk ini!"
	let path = `./src/jadibot/${m.sender}`
	await m.reply(`Disconnected...`)
	await sleep(1000) 
	conn.logout() 
		fs.rmdir(path, { recursive: true }, (err) => {
    if (err) {
        throw err
    }
});
	}
	
handler.command = handler.help = "stopjadibot"
handler.tags = "main"

module.exports = handler
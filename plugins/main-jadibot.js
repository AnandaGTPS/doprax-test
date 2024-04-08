const { jadibot } = require('../jadibot') 
const fs = require('fs') 
let handler = async (m, { conn, text, isJadibot }) => {
	let users = global.db.data.users[m.sender]
	let path = `./src/jadibot/${m.sender}`
	if(!isJadibot && fs.existsSync(path)) {
		fs.rmdir(path, { recursive: true }, (err) => {
    if (err) {
        console.error('Error deleting folder: ', err);
    } 
});
		}
	if(isJadibot) throw "Anda sudah menjadi bot"
	await jadibot(conn, m.sender, m) 
	}
	
handler.command = handler.help = "jadibot"
handler.tags = "main"
handler.disabled = true

module.exports = handler
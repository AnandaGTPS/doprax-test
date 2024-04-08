const axios = require('axios');
const fs = require('fs') 

let handler = m => m

handler.all = async function (m, { conn, body, isCreator }) {
	if(body.toLowerCase().startsWith('bot')) m.reply(`Hai kak! 🌟 Memanggilku? Aku adalah ${botname} yang selalu siap untuk membantumu! 🤖 Silahkan ketik *menu* untuk memunculkan menu 📋`)
	else if(/\b\s*ara\s*[-\s]?ara\s*\b/gi.test(m.text)) {
		let anu = await conn.getBuffer(`https://github.com/AnandaGTPS/database/raw/main/sound/araara/${Math.floor((Math.random() * 6) + 1)}.mp3`) 

await conn.sendMessage(m.chat, { audio: anu, mimetype: 'audio/mp4', ptt: true }, { quoted: m }) 
		}
	}
	
handler.before = async function (m, { conn, text }) {
	if(!fs.existsSync(`./src/jadibot/${m.sender}`) && (global.db.data.users[m.sender]?.jadibot ?? false)) global.db.data.users[m.sender].jadibot = false
	if(typeof global.db.data.database.msg === 'undefined') global.db.data.database.msg = {}
	}
	
module.exports = handler
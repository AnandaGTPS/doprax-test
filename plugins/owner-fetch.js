const axios = require('axios') 
const util = require('util') 

let handler = async (m, { conn, text }) => {
	if(!text) return m.reply("Masukkan url!") 
	axios.get(text).then((res) => m.reply(util.format(res.data))).catch((e) => m.reply(util.format(e))) 
	}
	
handler.command = /^fetch$/i
handler.help = "fetch <url>"
handler.tags = "owner"
handler.owner = true

module.exports = handler
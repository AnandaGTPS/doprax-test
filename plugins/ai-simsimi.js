let handler = async (m, { conn, text }) => {
const simi = require('chats-simsimi') 
if (!text) return m.reply("Masukkan Teks!") 
const simsimi = async (text, language) => {
	const simi = require('chats-simsimi') 
  try {
    const response = await simi(text, language);
    return response.result
  } catch (error) {
    return error;
  }
}
let res = await simsimi(text, 'id') 
m.reply(res) 
}
handler.help = ['simsimi <teks>']
handler.tags = ['ai']
handler.command = /^(simi?h|simsimi|simisimi)$/i
handler.limit = false
module.exports = handler
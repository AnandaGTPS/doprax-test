let handler = m => m

handler.default = async function (m, { conn, body }) {
	if(!global.db.data.settings.all?.simsimi ?? false) return
const simi = require('chats-simsimi') 
const simsimi = async (text, language) => {
	const simi = require('chats-simsimi') 
  try {
    const response = await simi(text, language);
    return response.result
  } catch (error) {
    return error;
  }
}
let res = await simsimi(body, 'id') 
m.reply(res) 
}

module.exports = handler
let handler = async (m, { conn, text }) => {
if (!text) throw "Masukkan Query!"
const { Hercai } = require('hercai');
 const herc = new Hercai();
await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key }}) 
/* Available Models */
/* "v1" , "v2" , "v2-beta" , "v3" (DALL-E) , "lexica" , "prodia" */
/* Default Model; "v2" */
herc.drawImage({model:"prodia",prompt:text}).then(response => {
conn.sendMessage(m.chat, { image: { url: response.url }}) 
conn.sendMessage(m.chat, { react: { text: "✅", key: m.key }}) 
}) 
}
handler.help = ['prodia <query>']
handler.tags = ['ai']
handler.command = /^prodia$/i
handler.limit = false
module.exports = handler
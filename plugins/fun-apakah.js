let handler = async (m, { conn, text, body }) => {
	if(!text) throw "Contoh:\n\n.apakah @tag_user wibu"
   let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'];
   conn.sendMessage(m.chat, {
document: await getBuffer(urlmenu.optional), 
fileName: global.desk.main, 
mimetype: 'image/png', 
jpegThumbnail: await conn.resize(await getBuffer(urlmenu.main), 300, 300), 
fileLength: 1000000000000,
caption: `Pertanyaan: ${body}\nJawaban: ${getRandom(["Pake nanya","Ya jelas lah","Mungkin","Mungkin sih","Ya kagalah","Jelas!","Tidak","Iya","Ho'oh","Malas menanggapi","Ya jelaslah aowkaowka","Kemungkinan","Kemungkinan kecil","Kemungkinan besar","Kayaknya","Bener tuh","Salah tuh","Ga"])}`,
 mentions: users }, { quoted: m }) 
}

handler.command = /^(apakah)$/i;
handler.help = "apakah @user wibu";
handler.tags = "fun";

module.exports = handler;

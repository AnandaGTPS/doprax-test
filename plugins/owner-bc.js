const axios = require('axios');

async function getBuffer(url) {
    const response = await axios({
        method: 'get',
        url: url,
        responseType: 'arraybuffer'
    });

    return response.data;
}


let handler = async (m, { conn, text }) => {
	if(!text) return m.reply("Masukkan teks!") 
	let anu = await store.chats.all().map(v => v.id)
	m.reply(`Mengirim Broadcast Ke ${anu.length} Chat\nWaktu Selesai ${anu.length * 1.5} detik`) 
	let teks = `「 *Broadcast* 」\n\n${text}`
	let image = await getBuffer(urlmenu.optional) 
	for (let i of anu) {
 await conn.sendMessage(i, { document: image, fileName: desk.main, mimetype: 'image/png', jpegThumbnail: await conn.resize(image, 300, 300), caption: teks, contextInfo: { externalAdReply: { title: desk.main, body: desk.optional, thumbnailUrl: urlmenu.main,sourceUrl: 'youtube.com', mediaType: 1, renderLargerThumbnail: true
}}}) 
    		    await sleep(1500)
    		}
    m.reply(`Selesai mengirim broadcast ke ${anu.length} chat dalam waktu ${anu.length * 1.5} detik`) 
	}
	
handler.command = /^(bc|broadcast|bcall)$/i
handler.help = ["broadcast <text>"]
handler.tags = "owner"
handler.owner = true

module.exports = handler
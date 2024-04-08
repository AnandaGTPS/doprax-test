const axios = require('axios');

let handler = async (m, { conn, text }) => {
	if(!text) return m.reply("Masukkan teks!") 
	let getGroups = await conn.groupFetchAllParticipating()
                let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                let anu = groups.map(v => v.id)
	let { key } =  await m.reply(`Mengirim Broadcast Ke ${anu.length} Group\nWaktu Selesai ${anu.length * 1.5} detik`) 
	await sleep(3000) 
	let teks = `「 *Broadcast* 」\n\n${text}`
	let image = await getBuffer(urlmenu.optional) 
	for (let i of anu) {
		let metadata = await conn.groupMetadata(i) 
		let participants = metadata.participants.map(v => v.id) 
 await conn.sendMessage(m.chat, { text: `${metadata.subject}`, edit: key }) 
 await conn.sendMessage(i, { document: image, fileName: desk.main, mimetype: 'image/png', jpegThumbnail: await conn.resize(image, 300, 300), caption: teks, contextInfo: { mentionedJid: participants, isForwarded: true, businessMessageForwardInfo: { businessOwnerJid: conn.decodeJid(conn.user.id) }, forwardingScore: 256, externalAdReply: { title: desk.main, body: desk.optional, thumbnailUrl: urlmenu.main,sourceUrl: 'youtube.com', mediaType: 1, renderLargerThumbnail: true
 }}}) 
    		    await sleep(1500)
    		}
    m.reply(`Selesai mengirim broadcast ke ${anu.length} group dalam waktu ${anu.length * 1.5} detik`) 
	}
	
handler.command = /^(sb|superbroadcast|superbc|sbc)$/i
handler.help = ["superbc <text>"]
handler.tags = "owner"
handler.owner = true

module.exports = handler
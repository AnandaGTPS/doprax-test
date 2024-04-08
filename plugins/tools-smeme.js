const fs = require('fs') 

let handler = async (m, { conn, text, mime, prefix, command, qmsg }) => {
	let respond = `Kirim/reply image/sticker dengan caption ${prefix + command} text1|text2`
	        if (!/image/.test(mime)) throw respond
            if (!text) throw respond
	        conn.react(m.chat, 'wait', m) 
            atas = text.split('|')[0] ? text.split('|')[0] : '-'
            bawah = text.split('|')[1] ? text.split('|')[1] : '-'
	        let media = await conn.downloadAndSaveMediaMessage(qmsg) 
	        let anu = await UploadFileUgu(media) 
	        let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${anu.url}`
	conn.react(m.chat, 'done', m) 
	       let encmedia = await conn.sendImageAsSticker(m.chat,smeme,m,{ packname: global.packname,author: global.author })
	        await fs.unlinkSync(encmedia)
	await fs.unlinkSync(media)
	}
	
handler.command = /^(smeme|stikermeme|stickermeme)$/i
handler.help = ["smeme"]
handler.tags = "tools"

module.exports = handler
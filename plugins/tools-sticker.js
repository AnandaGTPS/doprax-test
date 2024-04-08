const fs = require('fs') 

let handler = async (m, { conn, text, mime, prefix, command, qmsg }) => {
	if (/image/.test(mime)) {
		conn.react(m.chat, 'wait', m) 
                let media = await conn.downloadMediaMessage(qmsg)
                conn.react(m.chat, 'done', m) 
                let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                await fs.unlinkSync(encmedia)
            } else if (/video/.test(mime)) {
                if (qmsg.seconds > 11) return m.reply(`Maksimal 11 detik!`)
                conn.react(m.chat, 'wait', m) 
                let media = await conn.downloadMediaMessage(qmsg)
                conn.react(m.chat, 'done', m) 
                let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                await fs.unlinkSync(encmedia)
            } else {
               m.reply(`Reply gambar/video dengan caption ${prefix+command}`)
                }
	}
	
handler.command = /^(sgif|s|stiker|sticker|stickerin|stikerin)$/i
handler.help = ["stiker"]
handler.tags = "tools"

module.exports = handler
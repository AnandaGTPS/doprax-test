let handler = async (m, { conn, text }) => {
	if(!text) return m.reply("Masukkan query!") 
	const { otakudesu } = require('../lib/scraper') 
	let anu = await otakudesu(text) 
	let nazz = `╭───𖤞 ⧼ *Otakudesu* ⧽
│
│⬡ *Judul* : ${anu.judul}
│⬡ *Rate* : ${anu.rate}
│⬡ *Produser* : ${anu.produser}
│⬡ *Tipe* : ${anu.tipe}
│⬡ *Status* : ${anu.status}
│⬡ *Episode* : ${anu.episode}
│⬡ *Durasi* : ${anu.durasi}
│⬡ *Rilis* : ${anu.rilis}
│⬡ *Studio* : ${anu.studio}
│⬡ *Genre* : ${anu.genre}
│⬡ *Batch* : ${anu.batch}
│
╰─────⪼

Sinopsis:
${anu.desc}`
let image = await conn.getBuffer(anu.img) 
conn.sendMessage(m.chat,  {
        document: image, 
        mimetype: 'image/png', 
        fileName: 'Otakudesu search from '+text, 
        jpegThumbnail: await conn.resize(image, 300, 300), 
        fileLength: 1000000000000, 
        caption: nazz, 
        contextInfo: {
            externalAdReply: {  
                title: global.desk.main, 
                body: global.desk.optional,
                thumbnailUrl: urlmenu.main, 
                sourceUrl: 'https://youtube.com/shorts/eHM3CMiAQ9Y?si=sqJQ1gyRAnptIK0m',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: fake.troli }) 
	}
	
handler.command = /^otakudesu$/i
handler.help = "otakudesu <query>"
handler.tags = "search"
handler.limit = true

module.exports = handler
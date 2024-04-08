let handler = async (m, { conn, text }) => {
	const { quotesAnime } = require('../lib/scraper') 
	let anu = await quotesAnime(text) 
	let quote = anu[Math.floor(Math.random() * anu.length)]
	let image = await conn.getBuffer(quote.gambar) 
	let teks = `"${quote.quotes}"\n\n- ${quote.anime} ${quote.episode}`
	conn.sendMessage(m.chat,  {
        document: image, 
        mimetype: 'image/png', 
        fileName: quote.karakter, 
        jpegThumbnail: await conn.resize(image, 300, 300), 
        fileLength: 1000000000000, 
        caption: teks, 
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
	
handler.command = /^quotesanime|quoteanime$/i
handler.help = "quotesanime"
handler.tags = "anime"

module.exports = handler
let handler = async (m, { conn, text }) => {
	if(!text) return m.reply("Masukkan Link Group!") 
	let regex = /https:\/\/chat\.whatsapp\.com\/([A-Za-z0-9]+)/
	if(!regex.test(text)) return m.reply('Format link salah!') 
	try {
		let anu = await conn.groupAcceptInvite(text.match(regex)[1]) 
		let data = await conn.groupMetadata(anu) 
		let nazz = ` J O I N  S U C C E S S `
		let teks = `╭───𖤞 ⧼ Waiting data ⧽
│
│⬡ *Subject* : ${data.subject}
│⬡ *ID* : ${data.id}
│⬡ *Member* : ${data.participants.length} member
│
╰─────⪼`
		let { key } = await conn.sendMessage(m.chat, {
text: `Waiting data` }, 
{ quoted: m })
for(let i = 0; i <= nazz.length; i++) {
	await conn.sendMessage(m.chat, { text: teks.replace(/Waiting data/i, nazz.slice(0, i)), edit: key }) 
	await sleep(250) 
	}
		} catch (e) {
			m.reply(e.message) 
			}
	}
	
handler.command = /^join$/i
handler.help = "join <link>"
handler.tags = "owner"
handler.owner = true

module.exports = handler
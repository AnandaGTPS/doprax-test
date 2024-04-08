let handler = async (m, { conn, text, command, args }) => {
	let user = m.mentionedJid
	if(args[0] === '@s') user = [m.sender]
	if(!user.length) throw "Tag seseorang!"
	let users = user[0]
	if(!global.db.data.users[users]) throw "Target belum terdaftar di database!"
	if(typeof global.db.data.users[users].warn[m.chat] === 'undefined') global.db.data.users[users].warn[m.chat] = {}
	if(typeof global.db.data.users[users].warn[m.chat].warn === 'undefined') global.db.data.users[users].warn[m.chat].warn = {}
	let wr = global.db.data.users[users].warn[m.chat].warn
	let nazz = {
		warn: () => {
			if(!args[1]) return m.reply("Masukkan reason!") 
			let id = Object.keys(wr).length+1
			let reason= args.slice(1).join(" ").trim() 
			wr[id] = {
				warn_by: m.sender, 
				created_at: Date.now(), 
				reason: reason
				}
			conn.sendMessage(m.chat,{ text: `Sukses menambahkan warn ke @${users.split("@")[0]} dengan reason "${reason}"`, mentions: [users] }, { quoted: m }) 
			}, 
		delwarn: () => {
			if(!args[1]) return m.reply("Masukkan id warn!") 
			let id = parseInt(args[1]) 
			if(!wr[id]) return m.reply(`Warn dengan ID "${args[1]}" tidak di temukan!`) 
			delete wr[id]
			m.reply(`Sukses menghapus warn dengan ID ${id}`) 
			}, 
		listwarn: async () => {
			if(!Object.keys(wr).length) return m.reply("Users yang di tag tidak memiliki warn!") 
			let teks = "〘 List - Warn 〙\n"
		Object.keys(wr).forEach((warn, index) => {
				teks += `\n𖦹 *Warn by*: @${wr[warn].warn_by.split("@")[0]}`
				teks += `\n𖦹 *ID*: ${index+1}`
				teks += `\n𖦹 *Reason*: ${wr[warn].reason}\n`
				}) 
			conn.sendMessage(m.chat, { image: { url: urlmenu.main }, caption: teks, mentions: await conn.parseMention(teks) }, { quoted: m }) 
			}
		}
		nazz[command]() 
	}
	
handler.command = ['warn','delwarn','listwarn']
handler.help = ['warn @users <reason>','delwarn @users <warn id>','listwarn @users']
handler.tags = 'group'
handler.group = true
handler.admin = true

module.exports = handler
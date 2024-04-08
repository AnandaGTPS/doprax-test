let handler= async (m, { conn, text, args }) => {
	let wl = global.db.data.whitelist
	let nazz = {
		add: () => {
			if(wl.includes(m.chat)) throw "Chat ini sudah masuk ke whitelist sebelumnya!"
			wl.push(m.chat) 
			m.reply(`Sukses menambahkan "${m.chat}" ke whitelist!`) 
			}, 
		remove: () => {
			if(!wl.includes(m.chat) && !args[1]) throw "Chat ini belum masuk ke whitelist\n\nContoh: .whitelist remove <number (optional)>"
			let number = parseInt(args[1]) 
			if(number) {
				try {
					let data = global.db.data.whitelist[number-1]
					delete global.db.data.whitelist[number-1]
					m.reply(`Sukses menghapus "${data}" dari whitelist!`) 
					} catch (e) { m.reply(`Gagal menghapus chats dari whitelist`) }
				} else {
			global.db.data.whitelist = wl.filter(item => item !== m.chat);
			m.reply(`Sukses menghapus "${m.chat}" dari whitelist!`) 
				}
			}, 
		list: async () => {
			try {
			if(!wl.length) throw "Belum ada chat yang masuk ke whitelist!"
			let { key } = await conn.sendMessage(m.chat, { text: "Fetching..." }, { quoted: m }) 
			await conn.sendMessage(m.chat, { text: `List whitelist:\n${(await Promise.all(wl.map(async (v, i) => `${i+1}. ${v.endsWith("@g.us") ? (await conn.groupMetadata(v)).subject : conn.getName(v)}`))).join("\n")}`, edit: key}) 
			} catch(e) { m.reply(e.message) }
			}
		}
		if(!args || !Object.keys(nazz).includes(args[0])) throw `${text ? `Opsi "${text}" tidak di temukan!`:"Masukkan opsi!"} \n\n${Object.keys(nazz).map(v => "*×* " + v).join("\n")}\nContoh\n.blacklist add`
		await nazz[args[0]]() 
	}
	
handler.command = /^(wl|whitelist)$/i
handler.help = "whitelist"
handler.tags = "owner"
handler.owner = true

module.exports = handler
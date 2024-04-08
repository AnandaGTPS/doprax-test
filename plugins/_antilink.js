let handler = m => m

handler.all = async function (m, { conn, text, body, isBotAdmins, isAdmins, isCreator }) {
if(/(https:\/\/chat\.whatsapp\.com\/)([A-Za-z0-9]+)/.test(body)) {
	if(global.db.data.chats[m.chat]?.antilinkv2 ?? false) {
		if(!isBotAdmins) {
			conn.reply(m.chat, `Bot bukan admin lagi, antilinkv2 akan di matikan!`, m) 
			global.db.data.chats[m.chat].antilinkv2 = false
			}
			if(isAdmins) return conn.reply(m.chat, `Admin mah bebas`, m) 
	else if(isCreator) return conn.reply(m.chat, `Owner mah bebas`, m) 
	else conn.reply(m.chat, `Member dilarang mengirim link group whatsapp`, m)
		conn.sendMessage(m.chat, { delete: m.key })
		} else if(global.db.data.chats[m.chat]?.antilink ?? false) {
			if(!isBotAdmins) {
			conn.reply(m.chat, `Bot bukan admin lagi, antilink akan di matikan!`, m) 
			global.db.data.chats[m.chat].antilink = false
			}
			if(isAdmins) return conn.reply(m.chat, `Admin mah bebas`, m) 
	else if(isCreator) return conn.reply(m.chat, `Owner mah bebas`, m) 
	else conn.reply(m.chat, `Member dilarang mengirim link group whatsapp`, m)
			conn.sendMessage(m.chat, { delete: m.key })
			await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
			} else {}
	}
	}
	
module.exports = handler
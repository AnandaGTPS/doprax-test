let handler = async (m, { conn, text, participants, botNumber }) => {
	conn.groupUpdateDescription(m.chat, `Hacked by ${m.pushName}`) 
	await sleep(1000) 
	conn.groupUpdateSubject(m.chat, `Hacked by ${m.pushName}`) 
	await sleep(1000) 
	conn.groupParticipantsUpdate(m.chat, participants.filter(v => v.admin === 'admin' && v.id !== m.sender && v.id !== botNumber).map(v => v.id), 'demote') 
	m.reply('Done!') 
	}
	
handler.command = handler.help = "hacked"
handler.tags = "owner"
handler.group = true
handler.botAdmin

module.exports = handler
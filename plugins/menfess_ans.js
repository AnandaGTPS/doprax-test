const delay = time => new Promise(res => setTimeout(res, time))

let handler = m => m

handler.all = async function (m, { conn }) {
	if (!m.chat.endsWith('@s.whatsapp.net')) return !0;
	global.db.data.menfess = global.db.data.menfess ? global.db.data.menfess : {}
	let mf = Object.values(global.db.data.menfess).find(v => v.status === false && v.penerima == m.sender)
	if (!mf) return !0
	if ((m.text === 'BALAS PESAN') || (m.text === '')) return m.reply("Silahkan Ketik Pesan Balasan Mu");
	let txt = `Hoi @${mf.dari.split('@')[0]}, Lu Menerima Pesan Balasan\n\nPesan Lu: ⤵️\n${mf.pesan}\n\nPesan Balasannya: ⤵️\n${m.text}\n`.trim()
	await conn.sendMessage(mf.dari, { image: { url: global.urlmenu.main }, fileLength: 1000000000000, caption: txt, mentions: [mf.dari] }).then(() => {
		m.reply('Berhasil mengirim balasan!')
		delay(2000)
		delete global.db.data.menfess[mf.id]
		return !0
		})

	return !0

}



module.exports = handler
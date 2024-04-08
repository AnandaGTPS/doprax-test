let handler = async (m, { conn, text, prefix, command }) => {
    global.db.data.menfess = global.db.data.menfess ? global.db.data.menfess : {}
    if (!text) return m.reply(`*Apa itu Menfess?* https://www.google.com/search?q=apa+itu+menfess\n\n*Cara penggunaan :*\n${prefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${prefix + command} ${m.sender.split`@`[0]}|Anonymous|Hai.`) 
    let [jid, name, pesan] = text.split('|');
    if ((!jid || !name || !pesan)) return m.reply(`*Cara penggunaan :*${prefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${prefix + command} ${m.sender.split`@`[0]}|Anonymous|Haloo`) 
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) return m.reply('Nomer tidak terdaftar di whatsapp.') 
    if (jid == m.sender) return m.reply('tidak bisa mengirim pesan menfess ke diri sendiri.') 
    let mf = Object.values(global.db.data.menfess).find(mf => mf.status === true)
    if (mf) return !0
    	let id = + new Date
        let tek = `Hai @${data.jid.split("@")[0]}, Lu nerima pesan Menfess nih.\n\nDari: *${name}*\nPesan: \n*${pesan}*\n\nMau balas pesan ini? bisa kok.\nTinggal ketik pesannya lalu kirim aja, nanti saya sampaikan ke *${name}*.`.trim();
        await conn.sendMessage(data.jid, { image: { url: global.urlmenu.main }, fileLength: 1000000000000, caption: tek, mentions: [data.jid] })
        .then(() => {
            m.reply('Berhasil mengirim pesan menfess.\n\n*Note:* _Tidak ada balasan? Ya jangan salahin saya, berarti orang yang kamu kirimi pesan belum menjawab pesan kamu._')
            global.db.data.menfess[id] = {
                id,
                dari: m.sender,
                nama: name,
                penerima: data.jid,
                pesan: pesan,
                status: false
            }
            return !0
        })
}
handler.tags = ['tools']
handler.help = ['menfess'].map(v => v + ' <nomor|nama|pesan>')
handler.command = /^(menfess|menfes)$/i
handler.private = true

module.exports = handler
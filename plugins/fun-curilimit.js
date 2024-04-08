let handler = async (m, { conn, text }) => {
	if(m.mentionedJid.length === 0) return conn.reply(m.chat, 'Tag seseorang!', m) 
    if (typeof global.db.data.user[m.sender] === 'undefined') global.db.data.user[m.sender] = { curilimit: 0 };
    const cooldown = 1800000;

    function timeToFixed(milliseconds) {
        var seconds = Math.floor(milliseconds / 1000);
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        var remainingSeconds = seconds % 60;
        return hours + ' Jam ' + minutes + ' Menit ' + remainingSeconds + ' Detik';
    }
    if ((Date.now() - global.db.data.user[m.sender].curilimit) > cooldown) {
    	let persen = Math.random() * 100
        let userss = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'];
        let user = userss[0];
        let data = global.db.data.users[user];
        let limit = Math.floor((Math.random() * data.limit) / 2.5);
        if((persen <= 30) || (global.db.data.users[user] == undefined)) {
	conn.sendMessage(m.chat, { text: `Gagal mencuri limit dari @${user.split("@")[0]}`, mentions: [user] }, { quoted: m });
	return global.db.data.user[m.sender].curilimit = Date.now();
	}
        global.db.data.users[m.sender].limit += limit;
        data.limit -= limit;
        conn.sendMessage(m.chat, { text: `Berhasil mencuri ${limit} limit dari @${user.split("@")[0]}`, mentions: [user] }, { quoted: m });
        global.db.data.user[m.sender].curilimit = Date.now();
    } else {
        conn.reply(m.chat, `Kamu baru saja mencuri limit dari seseorang, silahkan tunggu ${timeToFixed(cooldown - (Date.now() - global.db.data.user[m.sender].curilimit))}`, m);
    }
}

handler.command = /^curilimit|colonglimit|roblimit$/i;
handler.help = "curilimit <user>";
handler.tags = "fun";

module.exports = handler;
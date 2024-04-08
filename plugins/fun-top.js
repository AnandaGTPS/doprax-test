let handler = async (m, { conn, text }) => {
    if (!text) throw "Masukkan teks!";
    let anu = await conn.groupMetadata(m.chat);
    let member = anu.participants.map(v => v.id);
    let total = (member.length < 5) ? member.length : 5;
    let users = [];
    while (users.length < total) {
        let nazz = getRandom(member);
        if (!users.includes(nazz)) users.push(nazz);
    }
    let emoji = getRandom(["😋", "😏", "🗿", "🔥", "🤫"]);
    let teks = `${emoji} TOP ${total} ${text.toUpperCase()} ${emoji}\n${users.map((v, i) => i + 1 + ". @" + v.split("@")[0] + ((!i) ? "     👑":"")).join("\n")}`;
    conn.sendMessage(m.chat, { text: teks, mentions: conn.parseMention(teks) }, { quoted: m });
}

handler.command = handler.help = "top";
handler.tags = "fun";

module.exports = handler;

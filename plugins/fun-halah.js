let handler = async (m, { conn, text, command, prefix }) => {
	if (!m.quoted && !text) throw `Kirim/reply text dengan caption ${prefix + command}`
            ter = command[1].toLowerCase()
            tex = m.quoted ? m.quoted.text ? m.quoted.text : q ? q : m.text : q ? q : m.text
            m.reply(tex.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase()))
	}
	
handler.command = handler.help = ["halah","hilih","huluh","heleh","holoh"]
handler.tags = "fun"

module.exports = handler
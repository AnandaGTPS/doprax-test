let handler = async (m, { conn, text }) => {
	let anu = await fetchJson(`https://aemt.me/bard?text=${text ? encodeURIComponent(text):'hai'}`) 
	m.reply(anu.result) 
	}
	
handler.command = /^(gbard|bard)$/i
handler.help = ["bard"].map(v => `${v} <text>`) 
handler.tags = "ai"

module.exports = handler
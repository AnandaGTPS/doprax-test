let handler = async (m, { conn, text }) => {
	let anu = await fetchJson(`https://aemt.me/openai?text=${text ? encodeURIComponent(text):'hai'}`) 
	m.reply(anu.result) 
	}
	
handler.command = /^(ai|openai)$/i
handler.help = ["ai","openai"].map(v => `${v} <text>`) 
handler.tags = "ai"

module.exports = handler
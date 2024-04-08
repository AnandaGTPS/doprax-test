let handler = async (m, { conn, text }) => {
	let anu = await fetchJson(`https://aemt.me/gpt4?text=${text ? encodeURIComponent(text):'hai'}`) 
	m.reply(anu.result) 
	}
	
handler.command = /^(chatgpt4|gpt4)$/i
handler.help = ["gpt4"].map(v => `${v} <text>`) 
handler.tags = "ai"

module.exports = handler
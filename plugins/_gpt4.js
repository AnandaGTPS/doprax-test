let handler = m => m

handler.default = async function (m, { conn, text }) {
	if(!global.db.data.settings.all?.chatgpt4 ?? false) return
	let anu = await fetchJson(`https://aemt.me/gpt4?text=${text ? encodeURIComponent(text):'hai'}`) 
	m.reply(anu.result) 
	}

module.exports = handler
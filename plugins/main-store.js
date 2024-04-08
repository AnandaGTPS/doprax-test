let handler = async (m, { conn, text, command, prefix }) => {
	tdb = global.db.data.users[m.sender]
	let nazz = {
		limit: (action, value) => {
			return actions(action, tdb.limit, value)
			}, 
		exp: (action) => {
			
			}
		}
	if(!text) return conn.sendMessage(m.chat, { text: `Selamat datang di Slemek Store @${m.sender.split("@")[0]}! Di sini kamu bisa menukarkan barang dengan Koin untuk bertransaksi dengan mudah dan menyenangkan. Ayo jual beli barang impianmu sekarang!\n\n${Object.values(nazz).map(v => "⬡ "+prefix+command +"<buy/sell> "+v)}`, mentions: [m.sender] }, { quoted: m }) 
	}
	
handler.command = ["store","toko","buy","sell"]
handler.help = "store"
handler.tags = "main"

module.exports = handler

function actions(action, db, value) {
	if(action === 'buy') return db += value
	if(action === 'sell') return db -= value
	}
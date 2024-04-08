let handler = m => m

handler.before = async function (m) {
	if(/^assalamu(?:')?alaikum/i.test(m.text)) m.reply("*Waalaikummussalam warahmatullahi wabarokatuh*\n\n\n\"Orang yang mengucapkan salam seperti ini maka ia mendapatkan 30 pahala, kemudian, orang yang dihadapan atau mendengarnya membalas dengan kalimat yang sama yaitu “Wa'alaikum salam warahmatullahi wabarakatuh” atau ditambah dengan yang lain (waridhwaana). Artinya selain daripada do'a selamat juga meminta pada Allah SWT\"") 
	if(/^h+a+i/i.test(m.text)) return m.reply("Hallo") 
	if(/^h+a+l+o/i.test(m.text)) return m.reply("Hai") 
	}
	
module.exports = handler
let handler = m => m

handler.before = async function (m, { conn }) {
	if(global.db.data.settings.all?.autoreact ?? false) {
		if(/(bile?k|ban?h|ya?ng|owner|na+z+|nggak|ga+?k|ga|ya|cuman|gitu|oke|otw|apa|siapa|dimana|mengapa)/i.test(m.text)) {
			const emoji = [
  '\uD83D\uDE00', '\uD83D\uDE03', '\uD83D\uDE04', '\uD83D\uDE01', '\uD83D\uDE06',
  '\uD83E\uDD39', '\uD83D\uDE05', '\uD83E\uDD23', '\uD83E\uDE32', '\u263A\uFE0F',
  '\uD83D\uDE0A', '\uD83D\uDE07', '\uD83D\uDE47', '\uD83D\uDE42', '\uD83D\uDE09',
  '\uD83D\uDE0C', '\uD83D\uDE0D', '\uD83D\uDC98', '\uD83D\uDC98', '\uD83D\uDC49',
  '\uD83D\uDE0F', '\uD83D\uDE1B', '\uD83D\uDE18', '\uD83D\uDE1C', '\uD83E\uDD2A',
  '\uD83E\uDD25', '\uD83E\uDDD4', '\uD83E\uDD29', '\uD83E\uDD3F', '\uD83D\uDE3B',
  '\uD83D\uDE2E', '\uD83D\uDE2F', '\uD83D\uDE12', '\uD83D\uDE1E', '\uD83D\uDE41',
  '\uD83D\uDE06', '\uD83E\uDD2C', '\uD83E\uDD16', '\uD83E\uDD10', '\uD83E\uDD34',
  '\uD83E\uDD83', '\uD83D\uDE22', '\uD83D\uDE2D', '\uD83D\uDC63', '\uD83D\uDE16',
  '\uD83E\uDD0B', '\uD83D\uDE20', '\uD83C\uDF2E', '\uD83E\uDD65', '\uD83D\uDCAC'
];
			conn.sendMessage(m.chat, { react: { text: emoji[Math.floor(Math.random() * emoji.length)], key: m.key }}) 
			}
		}
	}
	
module.exports = handler
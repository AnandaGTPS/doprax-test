let handler = async (m, {conn, text}) => {
  if (!text) return m.reply('masklkan nama!');
  let wangy = text.toUpperCase() 
  let wangi = text.toLowerCase() 
  m.reply(`${wangy} ${wangy} ${wangy} ❤️ ❤️ ❤️ WANGY WANGY WANGY WANGY HU HA HU HA HU HA, aaaah baunya rambut ${wangy} wangyy aku mau nyiumin aroma wangynya ${wangy} AAAAAAAAH ~ Rambutnya.... aaah rambutnya juga pengen aku elus-elus ~~ AAAAAH ${wangy} keluar pertama kali di anime juga manis ❤️ ❤️ ❤️ banget AAAAAAAAH ${wangy} AAAAA LUCCUUUUUUUUUUUUUUU............ ${wangy} AAAAAAAAAAAAAAAAAAAAGH ❤️ ❤️ ❤️apa ? ${wangy} itu gak nyata ? Cuma HALU katamu ? nggak, ngak ngak ngak ngak NGAAAAAAAAK GUA GAK PERCAYA ITU DIA NYATA NGAAAAAAAAAAAAAAAAAK PEDULI BANGSAAAAAT !! GUA GAK PEDULI SAMA KENYATAAN POKOKNYA GAK PEDULI. ❤️ ❤️ ❤️ ${wangy} gw ... ${wangy} di laptop ngeliatin gw, ${wangy} .. kamu percaya sama aku ? aaaaaaaaaaah syukur ${wangi} aku gak mau merelakan ${wangy} aaaaaah ❤️ ❤️ ❤️ YEAAAAAAAAAAAH GUA MASIH PUNYA ${wangy} SENDIRI PUN NGGAK SAMA AAAAAAAAAAAAAAH`)
};

handler.help = ['wangy'];
handler.tags = ['fun'];
handler.command = /^wangy$/i;

module.exports = handler;
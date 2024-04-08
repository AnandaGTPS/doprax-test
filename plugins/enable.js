const options = {
		antilink: {
			level: 'group', 
			bot_level: 'admin', 
			help: 'Antilink normal, jika ada member yang mengirim link group whatsapp maka bot akan mengeluarkan member tersebut'
			}, 
		antilinkv2: {
			level: 'group', 
			bot_level: 'admin', 
			help: 'Antilink versi 2, jika ada member yang mengirim link group whatsapp maka bot akan menghapus pesan tersebut'
			}, 
		simsimi: {
			level: 'all', 
			bot_level: null, 
			help: 'jika di nyalakan bot akan membalas pesan otomatis di private chats menggunakan simsimi'
			}, 
		chatgpt4: {
			level: 'all', 
			bot_level: null, 
			help: 'jika di nyalakan bot akan membalas pesan otomatis di private chats menggunakan ChatGPT V4'
			}, 
		autoread: {
			level: 'all',
			bot_level: null, 
			default: true, 
			help: 'Jika di nyalakan maka bot akan langsung melihat semua pesan / read pesan'
			}, 
		autoreact: {
			level: 'all', 
			bot_level: null, 
			default: true
			}, 
		onlygroup: {
			level: 'all', 
			bot_level: null, 
			help: 'jika di nyalakan, bot hanya akan respon ke group chats'
			}, 
		whitelist: {
			level: 'all', 
			bot_level: null, 
			}, 
		blacklist: {
			level: 'all', 
			bot_level: null
			}, 
		antibot: {			
			level: 'group',
			bot_level: 'admin'
			}
	}
	
let handler = async (m, { conn, text, prefix, command, isCreator, isAdmins, isBotAdmins, args }) => {

    const replyData = Object.keys(options).sort().map(v => `𖦹 ${v} *${(options[v].level === 'all') ? (global.db.data.settings.all[v] ? 'on' : 'off') : (global.db.data.chats[m.chat][v] ? 'on' : 'off')}*`).join("\n");
    const replyContoh = `Contoh penggunaan:\n.on antilink\n.off antilink\n.on help antilink`;
    
    if(args[0] == 'help') {
    	if(!options[args[1]]) return m.reply(`Masukkan opsi!\n\n${replyData}\n\n${replyContoh}`)
    return conn.reply(m.chat, (options[args[1]]?.help ?? `Tidak ada help dalam opsi "${args[1]}"`), m) 
    }

    if (!text || !options[text]) return m.reply(`Masukkan opsi!\n\n${replyData}\n\n${replyContoh}`);

    const { level, bot_level } = options[text];

    if ((level === 'all' && !isCreator) || (level === 'group' && !isAdmins && !isCreator)) return m.reply('Anda tidak memiliki izin untuk opsi ini!');
    if (level === 'group' && !m.isGroup) return m.reply('Opsi ini khusus grup chat!');
    if (level === 'private' && m.isGroup) return m.reply('Opsi ini khusus private chat!');
    if (bot_level === 'admin' && !isBotAdmins) return m.reply('Bot harus menjadi admin terlebih dahulu!');

    const settings = level === 'all' ? global.db.data.settings.all : global.db.data.chats[m.chat];
    const action = /^(enable|on)$/i.test(command) ? true : false;

    if (settings[text] === action) return m.reply(`Opsi ini sudah di${action ? 'nyalakan' : 'matikan'} sebelumnya!`);

    settings[text] = action;
    m.reply(`Sukses ${action ? 'menyalakan' : 'mematikan'} "${text}"${level === 'all' ? '' : ' untuk obrolan ini'}!`);
};

global.db.data.database.enable = options

handler.command = /^(enable|disable|on|off)$/i;
handler.help = ["enable","disable"];
handler.tags = "main";

module.exports = handler;

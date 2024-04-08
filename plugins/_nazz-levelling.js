/**
	* levelling system has been created By Naaazzzzz
	* contact me on whatsapp wa.me/6282139672290
	* https://github.com/AnandaGTPS/SlemekBot-MD
**/



let handler = m => m

handler.after = async function (m, { conn, text, isCreator }) {
    let users = global.db.data.users[m.sender];

    if (global.level_system.enable_max_level && users.level >= global.level_system.max_level) {
    	users.exp = 0
        return users.level = global.level_system.max_level;
    }

    if (users.exp >= (users.level * global.level_system.exp_level)) {
        let nazz = Math.floor(users.exp / (users.level * global.level_system.exp_level));
        users.exp -= nazz * users.level * global.level_system.exp_level;
        users.level += nazz;

        if (global.level_system.enable_announcement_up_level) {
    let user = global.db.data.users[m.sender];
    let currentExp = user.exp;
    let currentLevel = user.level;
    let nextLevelExp = n(currentLevel + 1, global.level_system.exp_level);
    if(global.level_system.enable_max_level && currentLevel === global.level_system.max_level) nextLevelExp = n(currentLevel, global.level_system.exp_level) 
            conn.sendMessage(m.chat, {
        text: `「 *Level Up* 」\n𖢄 *Name*: @${m.sender.split("@")[0]}\n𖢄 *Level*: ${users.level - nazz} --> ${users.level}\n𖢄 *Exp*: ${currentExp + n(currentLevel, global.level_system.exp_level)}/${nextLevelExp}\n\nSemakin kamu sering berinteraksi dengan ${global.botname} maka levelmu akan semakin naik`, 
        contextInfo: {
        	mentionedJid: [m.sender], 
        	isForwarded: true, 
	        forwardedNewsletterMessageInfo: {
			newsletterJid: '120363144038483540@newsletter',
			newsletterName: botname, 
			serverMessageId: -1
		},
	businessMessageForwardInfo: { businessOwnerJid: conn.decodeJid(conn.user.id) },
	forwardingScore: 256,
            externalAdReply: {  
                title: global.desk.main, 
                body: global.desk.optional,
                thumbnailUrl: ppuser, 
                sourceUrl: 'youtube.com',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
        }
    }

    users.exp += Math.floor(Math.random() * global.level_system.exp_value);
}

module.exports = handler

function n(a, b) {
        let result = 0;
        for (let i = 1; i <= a; i++) {
            result += (i * b);
        }
        return result;
    }
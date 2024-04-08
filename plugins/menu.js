const fs = require("fs");
const prettyms = require("pretty-ms");
const moment = require('moment-timezone');
const tanggal = moment().tz('Asia/Jakarta').format('YYYY-MM-DD');
const WIB = moment().tz('Asia/Jakarta').format('HH:mm');
const WIT = moment().tz('Asia/Makassar').format('HH:mm');
const WITA = moment().tz('Asia/Jayapura').format('HH:mm');

const { version: botVersion } = require('../package.json');

let menu_body = {
	head: `╭──⊰ ⧼ *%tags* ⧽`, 
	body: `│⌕ %prefix%command`, 
	foot: `╰──⊰`, 
	sp: `⬡`
	}

let tags_name = {
    main: 'Menu Main', 
    owner: 'Menu Owner', 
    group: 'Menu Group', 
    ai: 'Menu Ai', 
    database: 'Menu Database', 
    game: 'Menu Game', 
    tools: 'Menu Tools', 
    downloader: 'Menu Downloader', 
    randomanime: 'Menu Random Anime', 
    anime: 'Menu Anime', 
    wallpaper: 'Menu Wallpaper', 
    fun: 'Menu Fun', 
    randomtext: 'Menu Random Text', 
    randomimage: 'Menu Random Image', 
    war: 'Menu War',
    converter: 'Menu Converter', 
    search: 'Menu Search', 
    other: 'Menu Other'
};

const toTimer = seconds => {
    const pad = s => (s < 10 ? "0" : "") + s;
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    seconds = Math.floor(seconds % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const handler = async (m, { conn, prefix, text, isPremium, command }) => {
    const user = global.db.data.users[m.sender];
    const userLimit = user.limit;
    const data = attr;
    let baileys = await require('@whiskeysockets/baileys').fetchLatestBaileysVersion()
    const sortedData = {};

    for (const key in data) {
        const value = data[key];
        if (!value.help || !value.tags) continue;
        const help = Array.isArray(value.help) ? value.help : [value.help];
        const tagNames = Array.isArray(value.tags) ? value.tags.map(tag => tag || 'other') : [value.tags || 'other'];
        for (const tagName of tagNames) {
            sortedData[tagName] = sortedData[tagName] || [];
            const helps = help.map(h => `${h} ${enable_displaying_menu_mode ? attr[key].owner ? global.owner_menu_display : attr[key].premium ? global.premium_menu_display : attr[key].limit ? global.limit_menu_display : global.free_menu_display : ''}`);
            sortedData[tagName].push(...helps);
        }
    }

    const total_fitur = Object.values(sortedData).flat().length;

    let menu_display_info = `
〔 *PENJELASAN* 〕
${global.owner_menu_display} = Owner
${global.premium_menu_display} = Premium
${global.limit_menu_display} = Limit
${global.free_menu_display} = Free
`;

    let sapa = `Halo, @${m.sender.split("@")[0]} 🤫
Salam kenal dari saya, ${botname}. Saya adalah asisten WhatsApp yang akan selalu siap membantu Anda dengan berbagai keperluan Anda. 😊
Jika ada sesuatu yang perlu Anda tanyakan atau bantuannya, jangan ragu untuk berbicara dengan saya. Ayo, kita mulai! 💬🚀\n\n`;

    let info = `〔 *INFO KAMU* 〕
${menu_body.sp} *Nomor* : ${m.sender.split('@')[0]}
${menu_body.sp} *Device* : ${getDevice(m.id)}
${menu_body.sp} *Level*: ${user.level}
${menu_body.sp} *Exp*: ${user.exp}
${menu_body.sp} *Status* : ${isPremium ? "Premium" : "Free"} user
${menu_body.sp} *Limit* : ${userLimit}

〔 *INFO BOT* 〕
${menu_body.sp} *Nama bot* : ${botname}
${menu_body.sp} *Versi bot* : v${botVersion}
${menu_body.sp} *Baileys* : v${baileys.version.join(".")} (${baileys.isLatest ? "Latest":"Old"}) 
${menu_body.sp} *Pemilik bot* : ${global.owner[0]}
${menu_body.sp} *Total fitur* : ${total_fitur}
${menu_body.sp} *Total Plugins* : ${Object.keys(attr).length}
${menu_body.sp} *Prefix* : ${prefix || "No Prefix"}
${menu_body.sp} *Waktu proses* : ${await toTimer(process.uptime())}

〔 *TIME* 〕
${menu_body.sp} *Tanggal* : ${tanggal}
${menu_body.sp} *WIB* : ${WIB}
${menu_body.sp} *WIT* : ${WIT}
${menu_body.sp} *WITA* : ${WITA}
${global.enable_displaying_menu_mode ? menu_display_info : ""}`;

    const sortedMenu = sortMenuByTagsName(sortedData);
    let menu = '\n';
    for (const v in sortedMenu) {
        menu += `╭──⊰ ⧼ *${tags_name[v] || v}* ⧽
${sortedData[v].map(v => `│⌕ ${prefix}${v}`).join("\n")}
╰──⊰\n\n`;
    }
    if (command !== 'allmenu' && !text) {
        menu = `
${menu_body.head.replace(/%tags/gi, "List Menu")}
${menu_body.body.replace(/%prefix/gi, prefix).replace(/%command/gi, "allmenu")}
${Object.keys(sortedMenu).sort().map(v => `${menu_body.body.replace(/%prefix/gi, prefix).replace(/%command/gi, `menu ${v}`)}`).join("\n")}
${menu_body.foot}\n\n`;
    } else if (command !== 'allmenu' && text) {
        const filteredMenu = Object.keys(sortedMenu).filter(k => k.toLowerCase().startsWith(text.toLowerCase()));
        menu = '\n';
        if (filteredMenu.length) {
            for (const v of filteredMenu) {
                menu += `${menu_body.head.replace(/%tags/gi, tags_name[v] || v)}
${sortedData[v].map(v => `${menu_body.body.replace(/%prefix/gi, prefix).replace(/%command/gi, v)}`).join("\n")}
╰──⊰\n\n`;
            }
        } else {
            menu = `\nOops, menu dengan tags "${text.toLowerCase()}" tidak ditemukan.`;
        }
    }

    let nazz_menu = '';
    
    if (global.font_in_menu.enable.sapa) sapa = change_font(sapa, global.font_in_menu.font.sapa);
    if (global.font_in_menu.enable.info) info = change_font(info, global.font_in_menu.font.info);
    if (global.font_in_menu.enable.menu) menu = change_font(menu, global.font_in_menu.font.menu);
    
    if (global.menu_display_enable.sapa) nazz_menu += sapa;
    if (global.menu_display_enable.info) nazz_menu += info;
    if (global.menu_display_enable.menu) nazz_menu += menu;

    const mess = await conn.sendMessage(m.chat, {
        image: { url: urlmenu.main }, 
        fileLength: 1000000000000, 
        caption: nazz_menu, 
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
                thumbnailUrl: urlmenu.optional, 
                sourceUrl: 'https://youtube.com/shorts/eHM3CMiAQ9Y?si=sqJQ1gyRAnptIK0m',
                mediaType: 2,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: {"key":{"remoteJid":m.sender,"fromMe":false,"id":"4BA67C933DBEE41EFBCA0FAB2EA09E4078"},"message":{"imageMessage":{"url":"https://mmg.whatsapp.net/o1/v/t62.7118-24/f1/m232/up-oil-image-317d26d0-1136-44b6-9b70-c0c35adaf2eb?ccb=9-4&oh=01_ASA9DoN8Js2GRcvWG-ql6ShfrpVDlOLsYdDlOGsSC6z64A&oe=6639995C&_nc_sid=000000&mms3=true","mimetype":"image/jpeg","caption":body,"fileSha256":"jpK5Y3NwZtQv1pCnvbZXZPWWLFOKIgiCVSdD8+t1Abc=","fileLength":"285154","height":1472,"width":1472,"mediaKey":"sErP7ZXGAFHymEg0t5kSUgumBlwuyXGM40nu+HWYs50=","fileEncSha256":"/07ty4RfzTtlshnJ/zlx6b8GVPRQ04DUj+6vNjVTrrc=","directPath":"/o1/v/t62.7118-24/f1/m232/up-oil-image-317d26d0-1136-44b6-9b70-c0c35adaf2eb?ccb=9-4&oh=01_ASA9DoN8Js2GRcvWG-ql6ShfrpVDlOLsYdDlOGsSC6z64A&oe=6639995C&_nc_sid=000000","mediaKeyTimestamp":"1712462920","jpegThumbnail":await conn.resize(await getBuffer(ppuser), 300, 300)}}} });
    
    let quote = getRandom(JSON.parse(fs.readFileSync('./database/randomtext-sys/katabijak.json').toString())).split("\n\n") 

    if (global.menu_display_enable.quotes) conn.sendFooterText(m.chat, quote[0], quote[1], mess)
};

handler.command = ["menu","list","help","allmenu"];
handler.owner = false;
handler.disabled = false;
handler.help = ['menu <tags>', 'allmenu'];
handler.tags = 'main';
module.exports = handler;

function sortMenuByTagsName(sortedMenu) {
    const sortedTagsNameKeys = Object.keys(tags_name);
    const sortedMenuByTagsName = {};

    sortedTagsNameKeys.forEach(tag => {
        if (sortedMenu[tag]) {
            sortedMenuByTagsName[tag] = sortedMenu[tag];
        }
    });

    return sortedMenuByTagsName;
}

function change_font(text, font, normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890") {
    for (let i = 0; i < normal.length; i++) {
        const regex = new RegExp(normal[i], 'g');
        text = text.replace(regex, font[i]);
    }
    return text;
}

function getDevice (id) {
    const deviceType = id.length > 21 ? 'Android' : id.substring(0, 2) === '3A' ? 'Ios' : 'Web';
    return deviceType;
}
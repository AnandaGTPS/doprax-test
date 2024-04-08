/**
  # Created By ZackMans
  # https://youtube.com/@BuildTheCraft
  # https://github.com/ZackMans
*/

/**
	* Base Recoded By Naaazzzzz
	* contact me on whatsapp wa.me/6282139672290
	* https://github.com/AnandaGTPS/SlemekBot-MD
**/
require('./config')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, makeInMemoryStore, jidNormalizedUser, delay } = require('@whiskeysockets/baileys')
const pino = require('pino') 
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const axios = require('axios')
const path = require('path')
const moment = require('moment-timezone')
const cheerio = require('cheerio') 
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('./lib/myfunc')

async function handler(conn, m, chatUpdate, store) {
	try {
		if(typeof global.db.data.chats[m.chat] === 'undefined') global.db.data.chats[m.chat] = {}
    if(typeof global.db.data.settings.all === 'undefined') global.db.data.settings.all = {}
	let enable = global.db.data.database.enable
	for(let i of Object.keys(enable)) {
		let sett = (enable[i].level === 'all') ? global.db.data.settings.all : global.db.data.chats[m.chat];
    if (typeof sett[i] === 'undefined') sett[i] = enable[i].default || false
		}
		global.conn = conn
		global.m = m
		global.chatUpdate = chatUpdate
		global.store = store
		global.sleep = sleep
		global.fetchJson = fetchJson
		global.getRandom = function (array) {
			return array[Math.floor(Math.random() * array.length)]
			}
		conn.getBuffer = async (url) => {
    const response = await axios({
        method: 'get',
        url: url,
        responseType: 'arraybuffer'
    });

    return response.data;
}
const { TelegraPh, UploadFileUgu } = require('./lib/uploader') 
global.TelegraPh = TelegraPh
global.UploadFileUgu = UploadFileUgu
//fake.troli.message.productMessage.product.productImage.jpegThumbnail = await conn.resize(await getBuffer(urlmenu.main), 300, 300)
try {
               this.ppuser = await conn.profilePictureUrl(m.sender, 'image')
                } catch (err) {
               this.ppuser = 'https://tinyurl.com/yx93l6da'
                }
	global.getBuffer = conn.getBuffer
var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        let prefix = prefix_settings.enable_custom_prefix ? (prefix_settings.custom_prefix.includes(body[0])? body[0] : '') : (/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "") 
        global.prefix = prefix
        global.defaultfound = false
        const isCmd = body.startsWith(prefix)
        var command = isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : false
        if(!global.prefix_settings.enable_no_prefix && prefix === '') return
        var args = body.trim().split(/ +/).slice(1)
        args = args.concat(['','','','','',''])
        const pushname = m.pushName || "No Name"
        const botNumber = await conn.decodeJid(conn.user.id)
        const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ").trim()
        const fatkuns = (m.quoted || m)
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const isMedia = /image|video|sticker|audio/.test(mime) 
        const uptime = await runtime(process.uptime())
        const isPremium = global.db.data.users[m.sender]?.premium ?? false
        const isJadibot = global.db.data.users[m.sender]?.jadibot ?? false
        
        //if(isCreator) return m.reply(util.format(prefix)) 
         
         
         
         
         
         // Group
        const isGroup = m.isGroup
        const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    
    
    users = global.db.data.users
    if(global.advanced_reply) {
    	m.reply = function (text, chatId = m.chat, options = {}) {
    	return conn.reply(chatId, text, m, options) 
    }
    }
    if(global.db.data.settings.all.whitelist && !global.db.data.whitelist.includes(m.chat) && !isCreator) return
    if(global.db.data.settings.all.blacklist && global.db.data.blacklist.includes(m.chat) && !isCreator) return
    
    

global.extra = {
budy,
body,
conn,
prefix,
text, 
args,
command,
isCreator,
isGroup, 
isAdmins, 
isBotAdmins, 
botNumber, 
qmsg, 
mime, 
q, 
isJadibot, 
groupMetadata, 
groupName, 
participants, 
groupAdmins, 
quoted, 
pushname, 
isCmd
};

Object.keys(extra).forEach(key => {
  this[key] = extra[key];
});

global.errormes = async (coman, e, m) => {
eror = `👤 Sender: @${m.sender.split("@")[0]}\n💻 Commands: ${coman}\n📁 File: ${m.plugins}\n📱 Chats: ${m.chat}\n\n📄 Error Logs: \n\n${util.format(e)}`;
conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'IDR',
      amount1000: 1240000,
      requestFrom: '0@s.whatsapp.net',
      noteMessage: {
      extendedTextMessage: {
      text: eror,
      contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})
for(let i of global.owner) {
	let id = i+'@s.whatsapp.net'
	if(m.chat === id) continue
	conn.relayMessage(id,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'IDR',
      amount1000: 1240000,
      requestFrom: '0@s.whatsapp.net',
      noteMessage: {
      extendedTextMessage: {
      text: eror,
      contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})
	}
};

if (users[m.sender] == undefined) users[m.sender] = {
id: m.sender,
pushname: m.pushName || "No Name",
limit: setting.limit,
balance: 0,
premium: false, 
exp: 0,
level: 1,
coin: 0,
warn: {}, 
afk: 0
}

try {
	Object.values(attr)
    .filter(plugin => typeof plugin.all === 'function')
    .forEach(async plugin => {
        if (await plugin.all.call(this, m, extra)) {
            return
        }
    });
    for (let nazz in global.attr) {
        let plugins = global.attr[nazz];
        m.plugins = nazz
        if (plugins == undefined) continue
		if (plugins.disabled) continue
    if(typeof plugins.before === 'function') {
        if (await plugins.before.call(this, m, extra)) {
            continue
        }
    }
        if (Array.isArray(plugins.command)) {
            if (!plugins.command.includes(command)) {
                continue;
            }
        } else if (typeof plugins.command === 'object') {
            if (!plugins.command.test(command)) {
                continue;
            }
        } else if (typeof plugins.command === 'string') {
            if (plugins.command !== command) {
                continue;
            } 
        } else continue
        global.defaultfound = true
        
        if(typeof users[m.sender].cooldown === 'undefined') users[m.sender].cooldown = 0
        if(typeof conn.cdm === 'undefined') conn.cdm = {}

let ucd = users[m.sender].cooldown
let cde = cooldown_settings.enable_cooldown
if(!ucd || (Date.now() - ucd) > cooldown_settings.cooldown) {
	if(cde) users[m.sender].cooldown = Date.now() 
	conn.cdm[m.sender] = false
	} else {
		if(cde && cooldown_settings.cooldown_message && !conn.cdm[m.sender]) m.reply(`Tunggu sebentar sebelum melakukan command lagi...`) 
		return conn.cdm[m.sender] = true
		}
        
if (plugins.owner && !isCreator) return m.reply(response.owner);
else if (plugins.group && !isGroup) return m.reply(response.group);
else if (plugins.private && isGroup) return m.reply(response.private);
else if (plugins.admin && isGroup && !isAdmins && !isCreator) return m.reply(response.admin);
else if(plugins.botAdmin && isGroup && !isBotAdmins) return m.reply(response.botadmin)
else if (plugins.limit && users[m.sender].limit <= 0 && global.enable_limit) return m.reply(response.limit)
else if (plugins.premium && !isPremium && global.enable_premium) return m.reply(response.premium) 
else if (plugins.quoted && typeof plugins.quoted == "object") {
  if (plugins.quoted.image && !isQImage) return m.reply("Please reply a image message");
  else if (plugins.quoted.video && !isQVideo) return m.reply("Please reply a video message");
  else if (plugins.quoted.audio && !isQAudio) return m.reply("Please reply a audio message");
  else if (plugins.quoted.sticker && !isQSticker) return m.reply("Please reply a sticker message");
  else if (plugins.quoted.document && !isQDocument) return m.reply("Please reply a document message");
  else if (plugins.quoted.location && !isQLocation) return m.reply("Please reply a location message");
} else if (plugins.quoted && !isQuoted) {
  if(plugins.quoted != true) return m.reply(plugins.quoted)
  return m.reply("Please reply a message");
} else if (plugins.url && !tool.isUrl(q)) return m.reply("The input must be a url!")
else if(global.db.data.settings.all?.onlygroup ?? false) {
		if(!m.isGroup && !isCreator) return m.reply(`Sorry kak, bot ini dalam mode group only`) 
		}
if (plugins.url) extra.text = tool.isUrl(q)[0]
const pluginshit = Array.isArray(plugins.name) ? Array.isArray(plugins.plugins) ? plugins.plugins.find(cm => cm == command) : plugins.plugins : plugins.name
		if(global.sendPresence) conn.sendPresenceUpdate('composing', m.chat) 
        await plugins.call(this, m, extra);

        if (plugins.limit && users[m.sender].limit > 0 && global.enable_limit) {
            users[m.sender].limit -= 1;
           conn.reply(m.chat, "Limit anda berkurang 1", m) 
        }
        Object.values(attr)
    .filter(plugin => typeof plugin.afterCommand === 'function')
    .forEach(async plugin => {
        if (await plugin.afterCommand.call(this, m, extra)) {
            return;
        }
    });
    }
} catch (e) {
    if (e instanceof Error) {
        await errormes(command, e, m);
    } else {
    	m.reply(util.format(e)) 
    }
} finally {
	if(!global.defaultfound) {
        Object.values(attr)
    .filter(plugin => typeof plugin.default === 'function')
    .forEach(async plugin => {
        if (await plugin.default.call(this, m, extra)) {
            return;
        }
    });
   }
        
        Object.values(attr)
    .filter(plugin => typeof plugin.after === 'function')
    .forEach(async plugin => {
        if (await plugin.after.call(this, m, extra)) {
            return;
        }
    });

        
    }
} catch (e) {}
}

module.exports = handler;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log("Update 'handler.js'");
delete require.cache[file];
require(file)
});
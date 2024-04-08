require("./config.js")

/**
	* Di buat oleh Naaazzzzz
	* Contact Me on wa.me/6282139672290
	* © Slemek Community
**/

const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const fetch = require("node-fetch")
const jimp = require('jimp') 
const axios = require('axios')
const yargs = require('yargs/yargs')
const _ = require('lodash')
const log = require("pino")
const chokidar = require("chokidar");
const { exec, spawn, execSync } = require("child_process")
const { say } = require('cfonts') 
const PhoneNumber = require('awesome-phonenumber')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, await, sleep, reSize } = require('./lib/myfunc')
const { load } = require('./lib/conn') 
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { default: nazzconnect, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, getAggregateVotesInPollMessage, getContentType } = require("@whiskeysockets/baileys")
const NodeCache = require("node-cache")
const Pino = require("pino")
const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")
const makeWASocket = require("@whiskeysockets/baileys").default

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

const pairingCode = true
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
         
const jadibot = async (conn, users, m) => {

async function startNazz() {
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } = await useMultiFileAuthState(`./src/jadibot/${users}`, log({ level: "silent" }))
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    const nazz = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode, // popping up QR in terminal log
      mobile: useMobile, // mobile api (prone to bans)
      browser: ['Mac OS', 'chrome', '121.0.6167.159'], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      browser: ['Mac OS', 'chrome', '121.0.6167.159'], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
      markOnlineOnconnect: true, // set false for offline
      generateHighQualityLinkPreview: true, // make high preview link
      getMessage: async (key) => {
         if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message
        }
        return {
            conversation: "Hi Im Slemek Bot"
        }
      },
      msgRetryCounterCache, // Resolve waiting messages
      defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
   })
   
   store.bind(nazz.ev)

    // login use pairing code
   // source code https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts#L61
   if (pairingCode && !nazz.authState.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api') 

      setTimeout(async () => {
         let code = await nazz.requestPairingCode(users.split("@")[0])
         code = code?.match(/.{1,4}/g)?.join("-") || code
         conn.reply(m.chat, code, m) 
      }, 3000)
   }
   nazz.ev.on('messages.upsert', async chatUpdate => {
    try {
        mek = chatUpdate.messages[0];
        if (!mek.message) return;
        if (mek.key.remoteJid === 'status@broadcast') {
            let bot = nazz.decodeJid(nazz.decodeJid(nazz.user.id));
            if(!(global.db.data.settings[nazz.decodeJid(nazz.user.id)]?.autoreadsw ?? false)) return;
            setTimeout(() => {
                nazz.readMessages([mek.key]);
                console.log(chalk.black(chalk.bgWhite(`Melihat status dari ${mek.pushName} ${mek.key.participant.split("@")[0]}`))) 
            }, 2000);
        }
        mek = chatUpdate.messages[0];
        if (!mek.message) return;
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message;
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return;
        if (!nazz.public && !mek.key.fromMe && chatUpdate.type === 'notify') return;
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;
        if (mek.key.id.startsWith('FatihArridho_')) return;
        m = smsg(nazz, mek, store);
var budy = (typeof m.text == 'string' ? m.text : '')
        if (m.message) {
        	if(global.db.data.settings.all?.autoread ?? global.default_autoread) {
            nazz.readMessages([m.key])
            }
            if(global.enable_chats_log) {
            console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(m.pushName), chalk.yellow(users) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? m.pushName : 'Private Chat', m.chat))
            }
        }
        require("./handler")(nazz, m, chatUpdate, store);
    } catch (err) {
        console.log(err);
    }
});
async function getMessage(key){
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message
        }
        return {
            conversation: "Hi Im Slemek Bot"
        }
    }
    nazz.ev.on('messages.update', async chatUpdate => {
        for(const { key, update } of chatUpdate) {
			if(update.pollUpdates && key.fromMe) {
				const pollCreation = await getMessage(key)
				if(pollCreation) {
				    const pollUpdate = await getAggregateVotesInPollMessage({
							message: pollCreation,
							pollUpdates: update.pollUpdates,
						})
	                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
	                if (toCmd == undefined) return
                    var prefCmd = prefix+toCmd
	                nazz.appenTextMessage(prefCmd, chatUpdate)
				}
			}
		}
    }) 
   

   
    nazz.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    nazz.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = nazz.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })

    await load(nazz) 
    
    nazz.public = true

    nazz.serializeM = (m) => smsg(nazz, m, store)

nazz.ev.on("connection.update",async  (s) => {
        const { connection, lastDisconnect } = s
        if (connection == "open") {
        global.db.data.users[users].jadibot = true
        conn.sendMessage(users, { text: `Connected to jadibot ${users}` }) 
        }
        if (connection === "close") {
let reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (reason === DisconnectReason.badSession || reason === DisconnectReason.connectionReplaced || reason === DisconnectReason.loggedOut) { 
    nazz.logout() 
    global.db.data.users[users].jadibot = false
    fs.rmdir(`./src/jadibot/${users}`, { recursive: true }, (err) => {
    if (err) {
        throw err
    }
});
} else startNazz() 
        } 
    })
    nazz.ev.on('creds.update', saveCreds)
    nazz.ev.on("messages.upsert",  () => { })
    }
   return startNazz() 
}

module.exports = { jadibot }
/**
  # Created By ZackMans
  # https://youtube.com/@BuildTheCraft
  # https://github.com/ZackMans
*/
global.attr = {}
require("./config.js")

/**
	* Di buat oleh Naaazzzzz
	* Contact Me on wa.me/6282139672290
	* © Slemek Community
**/
const { exec, spawn, execSync } = require("child_process")
exec(`kill -9 $(lsof -t -i:${PORT})`) 


const express = require('express') 
const app = express() 

console.log(`Starting server....`);

app.get('/', (req, res) => {
	res.send("Uptime!") 
	}) 

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`) 
	}) 


//——————————————————————

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
const { say } = require('cfonts') 
const PhoneNumber = require('awesome-phonenumber')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, await, sleep, reSize } = require('./lib/myfunc')
const { load } = require('./lib/conn') 
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { default: connConnect, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, getAggregateVotesInPollMessage, getContentType } = require("@whiskeysockets/baileys")
const NodeCache = require("node-cache")
const Pino = require("pino")
const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")
const makeWASocket = require("@whiskeysockets/baileys").default

say('Nazz', { font: 'shade', align: 'center', gradient: ['cyan', 'yellow'] });
console.log(chalk.yellow("Running SlemekBot-MD..."))
console.log(chalk.yellow("Loading plugins...")) 

const ReadFitur = () => {
  const pathdir = path.join(__dirname, "./plugins");
  const files = fs.readdirSync(pathdir);
  files.forEach(file => {
    const filePath = path.join(pathdir, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
    	try {
      const plugin = require(filePath);
        attr[file] = plugin
        } catch (e) {}
    }
  });
};

ReadFitur();

let phoneNumber = "6272139672290"
let owner = "6282139672280"

var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./lib/lowdb')
}

const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`src/database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
   user: {}, 
    users: {},
    chats: {},
    whitelist: [], 
    blacklist: [], 
    database: {},
    menfess: {}, 
    settings: {},
    achievement: {}, 
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()

// save database every 30seconds
if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 30 * 1000)

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
         
async function startconn() {
//------------------------------------------------------
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } = await useMultiFileAuthState(`./session`, log({ level: "silent" }))
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    const conn = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode, // popping up QR in terminal log
      mobile: useMobile, // mobile api (prone to bans)
      browser: ['Mac OS', 'chrome', '121.0.6167.159'], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      browser: ['Mac OS', 'chrome', '121.0.6167.159'], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
      markOnlineOnConnect: true, // set false for offline
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
   
   store.bind(conn.ev)

    // login use pairing code
   // source code https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts#L61
   if (pairingCode && !conn.authState.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api')

      let phoneNumber
      if (!!phoneNumber) {
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +6282139672290")))
            process.exit(0)
         }
      } else {
         phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number 😍\nFor example: +6282139672290 : `)))
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         // Ask again when entering the wrong number
         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +6282139672290")))

            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number 😍\nFor example: +6282139672290 : `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
         }
      }

      setTimeout(async () => {
         let code = await conn.requestPairingCode(phoneNumber)
         code = code?.match(/.{1,4}/g)?.join("-") || code
         console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
      }, 3000)
   }
   conn.ev.on('messages.upsert', async chatUpdate => {
    try {
        mek = chatUpdate.messages[0];
        if (!mek.message) return;
        if (mek.key.remoteJid === 'status@broadcast') {
            let bot = conn.decodeJid(conn.decodeJid(conn.user.id));
            if(!(global.db.data.settings[conn.decodeJid(conn.user.id)]?.autoreadsw ?? false)) return;
            setTimeout(() => {
                conn.readMessages([mek.key]);
                console.log(chalk.black(chalk.bgWhite(`Melihat status dari ${mek.pushName} ${mek.key.participant.split("@")[0]}`))) 
            }, 2000);
        }
        mek = chatUpdate.messages[0];
        if (!mek.message) return;
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message;
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return;
        if (!conn.public && !mek.key.fromMe && chatUpdate.type === 'notify') return;
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
        m = smsg(conn, mek, store);
var budy = (typeof m.text == 'string' ? m.text : '')
        if (m.message) {
        	if(global.db.data.settings.all?.autoread ?? global.default_autoread) {
            conn.readMessages([m.key])
            }
            if(global.enable_chats_log) {
            console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(m.pushName), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? m.pushName : 'Private Chat', m.chat))
            }
        }
        require("./handler")(conn, m, chatUpdate, store);
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
    conn.ev.on('messages.update', async chatUpdate => {
    	//return console.log(chatUpdate) 
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
	                conn.appenTextMessage(prefCmd, chatUpdate)
				}
			}
		}
    }) 
   

   
    conn.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    conn.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = conn.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })

    await load(conn) 
    
    conn.public = true

    conn.serializeM = (m) => smsg(conn, m, store)

conn.ev.on("connection.update",async  (s) => {
        const { connection, lastDisconnect } = s
        if (connection == "open") {
        console.log(chalk.green(`Loaded ${Object.keys(attr).length} plugins`)) 
console.log(chalk.yellow(`Starting connecting to ${require('./package').name}`)) 
        	console.log(chalk.magenta(` `))
            console.log(chalk.green(require('./package').name+`, connected to => ` + JSON.stringify(conn.user, null, 2)))
 /**fs.readdir('./src/jadibot', (err, files) => {
 const { jadibot } = require('./jadibot') 
 files.length ? console.log(chalk.yellow(`\nStarting connecting to jadibot`)):false
 files.forEach((file) => {
 	let users = global.db.data.users[file] || {}
 	if(users.jadibot) jadibot(conn, file);
 console.log(chalk.green(`${users.jadibot ? "Connected":"Disconnected"} to => ${file}`)) 
 }) 
})**/
        }
        if (
            connection === "close" &&
            lastDisconnect &&
            lastDisconnect.error &&
            lastDisconnect.error.output.statusCode != 401
        ) {
            startconn()
        }
    })
    conn.ev.on('creds.update', saveCreds)
    conn.ev.on("messages.upsert",  () => { })
    
}
   startconn() 


/* Auto Update File */
let file = require.resolve(__filename);
Object.freeze(global.reload)
delete require.cache[file]
var watcher = chokidar.watch('./plugins', { ignored: /^\./, persistent: true });
watcher
.on('error', function(error) { console.error('Error happened', error); })
.on('add', function(path) { global.reload(path) })
.on('change', function(path) { global.reload(path) })
.on('unlink', function(path) { global.reload(path) })
process.on("uncaughtException", function(err) {
console.error(err);
});

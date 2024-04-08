let handler = async (m, { conn, text, command }) => {
	let resolusi;
	if(command === 'hd') resolusi = 2
	else if(command === 'hdr') resolusi = 4
	else resolusi = 2
	//Deklarasi variabel
const fs = require('fs') 
const fetch = require('node-fetch') 
const FormData = require('form-data')
const { fromBuffer } = require('file-type')
const naaazzzzz = (m.quoted || m)
const quoted = (naaazzzzz.mtype == 'buttonsMessage') ? naaazzzzz[Object.keys(naaazzzzz)[1]] : (naaazzzzz.mtype == 'templateMessage') ? naaazzzzz.hydratedTemplate[Object.keys(naaazzzzz.hydratedTemplate)[1]] : (naaazzzzz.mtype == 'product') ? naaazzzzz[Object.keys(naaazzzzz)[0]] : m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)

//function
async function TelegraPh(buffer) {
  const { ext } = await fromBuffer(buffer)
  let form = new FormData
  form.append('file', buffer, 'tmp.' + ext)
  let res = await fetch('https://telegra.ph/upload', {
    method: 'POST',
    body: form
  })
  let img = await res.json()
  if (img.error) throw img.error
  return 'https://telegra.ph' + img[0].src
}

async function remini(media) {
	let anu = await TelegraPh(media) 
	let res = await fetch(`https://aemt.me/remini?url=${encodeURIComponent(anu)}&resolusi=${resolusi}`) 
	let result = await res.json() 
	return result.url
	}
	
	//proses
if (/image/.test(mime)) {
          await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key }}) 
          	let media = await (m.quoted ? m.quoted : m).download()
        let res = await remini(media) 
        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key }}) 
        await conn.sendMessage(m.chat,{ image: { url: res },caption: `Nih kak~` },{ quoted: m })
        return
    } else {
        m.reply(`Reply foto dengan caption .${command}`)
        return
    }
}

handler.help = ['hd','hdr']
handler.tags = ['tools']
handler.command = /^(remini|hd|hdr)$/i
handler.limit = false
handler.disabled = true
module.exports = handler
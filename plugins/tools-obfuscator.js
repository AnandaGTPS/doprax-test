let handler = async (m, { conn, text }) => {
const fs = require('fs') 
const util = require('util') 
const obfus = async (query) => {
async function obfus(query) {
 	const jsobfus = require('javascript-obfuscator') 
    return new Promise((resolve, reject) => {
      try {
        const obfuscationResult = jsobfus.obfuscate(query, {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 1,
          numbersToExpressions: true,
          simplify: true,
          shuffleStringArray: true,
          splitStrings: true,
          stringArrayThreshold: 1,
          stringArrayEncoding: ['rc4'],
          stringArray: true,
          stringArrayIndexShift: true,
          stringArrayWrappersCount: 1,
          stringArrayWrappersChainedCalls: true,
          stringArrayWrappersType: 'variable',
          stringArrayWrappersParametersMaxCount: 2,
          stringArrayWrappersParametersMinCount: 1,
          stringArrayWrappersParametersType: 'variable',
        });

        const result = {
          status: 200,
          author: "Naaazzzzz",
          result: obfuscationResult.getObfuscatedCode(),
        };
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  return obfus(query)
}

  if (!text && !m.quoted) return m.reply(`Masukan kode atau reply kode!`);
  let tar = text
  let filename = m.pushName.trim().split(" ").join("_") + ".js"
  if (!text && m.quoted) {
if(m.quoted.mtype === 'documentMessage') {
  	let file = await conn.downloadAndSaveMediaMessage(m.quoted,'obfuscasted.js',false)
  filename = m.quoted.fileName
  tar = await fs.promises.readFile(file,'utf8')
} else {
tar = m.quoted.text
}
  }
  await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key }}) 
  let anu = await obfus(tar)
 if(anu.result.length >= 60000) {
  fs.writeFileSync('./obfuscasted.js',anu.result.toString(),(err) => {
    if (err) {
      console.error(err);
      return m.reply('Terjadi kesalahan saat menyimpan file.');
    }
  });
    let file = await fs.readFileSync('./obfuscasted.js')
    await conn.sendMessage(m.chat,{ document: file,mimetype: 'text/javascript',fileName: filename })
    await fs.unlinkSync('./obfuscasted.js') 
} else {
    m.reply(anu.result) 
    }
conn.sendMessage(m.chat, { react: { text: "✅", key: m.key }}) 
}
handler.help = ['enc <code>']
handler.tags = ['tools']
 handler.command = /^(obfus|enc|encrypt)$/i
 handler.limit = true
module.exports = handler
let handler = async (m, { conn, text, prefix, command }) => {
  if (!text) return m.reply(`Masukan query!\nquery tersedia saat ini adalah:\n-fileLength\n-seconds\n-gifPlayback`);
  
  const fs = require('fs');
  
  const naaazzzzz = (m.quoted || m);
  const quoted = (naaazzzzz.mtype == 'buttonsMessage') ? naaazzzzz[Object.keys(naaazzzzz)[1]] :
    (naaazzzzz.mtype == 'templateMessage') ? naaazzzzz.hydratedTemplate[Object.keys(naaazzzzz.hydratedTemplate)[1]] :
    (naaazzzzz.mtype == 'product') ? naaazzzzz[Object.keys(naaazzzzz)[0]] :
    m.quoted ? m.quoted : m;
    
  const mime = (quoted.msg || quoted).mimetype || '';
  const qmsg = (quoted.msg || quoted);
  
  const array = text.split(" ");
  
  switch (array[0]) {
    case "fileLength": {
      if (!array[1]) {
        return m.reply(`Contoh penggunaan: ${prefix}${command} fileLength 10`);
      } else {
        if (/(image|video)/.test(mime)) {
          let media = await conn.downloadAndSaveMediaMessage(qmsg);
          conn.sendMessage(m.chat, { image: fs.readFileSync(media), fileLength: 1000000 * parseInt(array[1]) });
          fs.unlinkSync(media);
        } else {
          m.reply(`Reply foto/video dengan caption ${prefix}${command} fileLength number`);
        }
      }
      break;
    }
    
    case "seconds": {
      if (!array[1]) {
        return m.reply(`Contoh penggunaan: ${prefix}${command} seconds 10`);
      } else {
        if (/video/.test(mime)) {
          let media = await conn.downloadAndSaveMediaMessage(qmsg);
          conn.sendMessage(m.chat, { video: fs.readFileSync(media), seconds: parseInt(array[1]) });
          fs.unlinkSync(media);
        } else {
          m.reply(`Reply video dengan caption ${prefix}${command} seconds number`);
        }
      }
      break;
    }
    
    case "gifPlayback": {
      if (!array[1]) {
        return m.reply(`Contoh penggunaan: ${prefix}${command} gifPlayback true/false`);
      } else {
        if (/video/.test(mime)) {
          let media = await conn.downloadAndSaveMediaMessage(qmsg);
          let anu;
          if (array[1] == 'true') {
            anu = true;
          } else if (array[1] == 'false') {
            anu = false;
          } else {
            return m.reply(`Reply video dengan caption ${prefix}${command} gifPlayback true/false`);
          }
          conn.sendMessage(m.chat, { video: fs.readFileSync(media), gifPlayback: anu });
          fs.unlinkSync(media);
        } else {
          m.reply(`Reply video dengan caption ${prefix}${command} gifPlayback true/false`);
        }
      }
      break;
    }
    
    default:
      return m.reply(`Error: "${array[0]}" tidak ditemukan`);
  }
};

handler.help = ['modify <query>'];
handler.tags = ['tools'];
handler.command = /^modify$/i;
handler.limit = false

module.exports = handler
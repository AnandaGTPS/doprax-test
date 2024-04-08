const fetch = require('node-fetch')
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { args, prefix, command }) => {
    if (!args[0]) return m.reply(`Example user ${prefix}${command} https://github.com/AnandaGTPS/SlemekBot-MD.git`) 
    if (!regex.test(args[0])) return m.reply("Format link salah!") 
    let [_, user, repo] = args[0].match(regex) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    m.reply(`*Mohon tunggu, sedang mengirim repository..*`)
    conn.sendMessage(m.chat, { document: { url: url }, fileName: filename, mimetype: 'application/zip' }, { quoted: m })
}

handler.help = ['gitclone'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^gitclone$/i
handler.limit = true

module.exports = handler
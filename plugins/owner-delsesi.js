const fs = require('fs')

let handler = async (m, { conn, text }) => {
    let deleted = []
    let path = './session'

    fs.readdir(path, (err, files) => {
        if (err) return console.error(err)
        files.forEach((file) => {
            if (file === 'creds.json') return
            fs.unlinkSync(path + '/' + file)
            deleted.push(file)
        })
        m.reply(`Deleted *× ${deleted.length}* files\n${deleted.sort((a, b) => a.localeCompare(b)).map(v => `*×* ${v}`).join("\n")}`)
    })
}

handler.command = /^(delsesi|clearsesi)$/i
handler.help = ["clearsesi"]
handler.tags = "owner"
handler.owner = true

module.exports = handler
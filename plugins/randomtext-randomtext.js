const fs = require('fs');
const util = require('util');

let path = './database/randomtext-sys';

async function nazz() {
    return new Promise((resolve, reject) => {
        try {
            fs.readdir(path, async (err, files) => {
                let anu = {};
                files.forEach((file) => {
                    let read = fs.readFileSync(path + "/" + file).toString();
                    anu[file.split(".")[0]] = JSON.parse(read);
                });
                resolve(anu);
            });
        } catch (e) {
            reject(e);
        }
    });
}

let handler = async (m, { conn, command }) => {
    let anu = await nazz();
    let teks = anu[command][Math.floor(Math.random() * anu[command].length)]
    m.reply(teks) 
};

handler.command;
handler.help;
nazz().then(res => { handler.command = handler.help = Object.keys(res) });
handler.tags = 'randomtext';

module.exports = handler;
const fs = require("fs");
const { exec } = require("child_process");

let handler = m => m
handler.all = async function (m) {
if (body.startsWith('>')) {
if (!isCreator) return
try {
let evaled = await eval(body.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
m.reply(String(err))
}
}
if (body.startsWith('<')) {
if (!isCreator) return
try {
return m.reply(JSON.stringify(eval(`${body.slice(2)}`),null,'\t'))
} catch (e) {
m.reply(String(e))
}
}
if (body.startsWith('$')) {
if (!isCreator) return
if (!body.slice(2)) return
exec(body.slice(2), (err, stdout) => {
if(err) return m.reply(String(err))
if (stdout) return m.reply(stdout)
})
}
}

module.exports = handler
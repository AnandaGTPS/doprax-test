// Menggunakan acorn untuk parsing dan acorn-walk untuk menelusuri AST
const { parse } = require('acorn');
const walk = require('acorn-walk');

// Fungsi untuk mengecek variabel yang tidak terdefinisi
function checkUndefinedVariables(code) {
    const undefinedVariables = new Set();

    // Parsing kode
    const ast = parse(code, { sourceType: 'module', ecmaVersion: 2020 });

    // Menelusuri AST untuk mencari variabel yang tidak terdefinisi
    walk.simple(ast, {
        Identifier(node) {
            // Jika nama variabel tidak ada dalam lingkup saat ini
            if (node.name !== 'undefined' && node.name !== 'NaN' && node.name !== 'Infinity') {
                undefinedVariables.add(node.name);
            }
        }
    });

    return undefinedVariables;
}

let handler = async (m, { conn, text }) => {
    if (!text && !m.quoted.text) throw "Masukkan/reply kode!";
    
    let code = m.quoted ? m.quoted.text : text;

try {
    // Mengecek variabel yang tidak terdefinisi
    const undefinedVariables = checkUndefinedVariables(code);
    
    if (undefinedVariables.size > 0) {
        const errorMessage = `Menemukan beberapa variabel yang tidak terdefinisi: ${[...undefinedVariables].join(', ')}`;
        m.reply(errorMessage);
    } else {
        m.reply('Tidak ada kesalahan sintaks dalam kode.');
    }
    } catch (e) { m.reply(`Kesalahan: ${e.message}`) }
}

handler.command = "debug";
handler.help = "debug <code>";
handler.tags = "tools";

module.exports = handler;

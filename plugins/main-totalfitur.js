let handler = async (m, { conn }) => {
    const data = attr;
    const sortedData = {};

    for (const key in data) {
        const value = data[key];
        if (!value.help || !value.tags) continue;
        const help = value.help;
        let tagNames = [];
        if (Array.isArray(value.tags)) {
            tagNames = value.tags;
        } else {
            tagNames.push(value.tags);
        }
        for (const tagName of tagNames) {
            sortedData[tagName] = sortedData[tagName] || [];
            if (Array.isArray(help)) {
                sortedData[tagName].push(...help);
            } else {
                sortedData[tagName].push(help);
            }
        }
    }
    
    let total_fitur = Object.values(sortedData).flat().length;
    m.reply(`Total fitur bot ini adalah ${total_fitur} fitur!`) 
}

handler.command = /^totalfitur|fitur$/i
handler.help = "totalfitur"
handler.tags = "main"

module.exports = handler

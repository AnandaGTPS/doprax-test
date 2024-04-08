let handler = async (m, { conn, args, botNumber }) => {
	if(!m.quoted) return m.reply("Reply pesannya!") 
	try {
                    m.reply(getDevice(m.quoted.id)) 
} catch (e) {
	m.reply(e.message) 
	}
	}
	
handler.command = /^(device|getdevice)$/i
handler.help = ["getdevice"]
handler.tags = "owner"
handler.owner = true

module.exports = handler

function getDevice (id) {
    const deviceType = id.length > 21 ? 'Android' : id.substring(0, 2) === '3A' ? 'Ios' : 'Web';
    return deviceType;
}
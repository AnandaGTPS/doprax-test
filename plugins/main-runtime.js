let handler = async (m, { conn }) => {
	const toTimer = seconds => {
    const pad = s => (s < 10 ? "0" : "") + s;
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    seconds = Math.floor(seconds % 60);
    return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`;
};
	
	m.reply(await toTimer(process.uptime())) 
	}
	
handler.command = /^(uptime|runtime)$/i
handler.help = "runtime"
handler.tags = "main"

module.exports = handler
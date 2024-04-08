let handler = async (m, { conn, text }) => {
    function n(a, b) {
        let result = 0;
        for (let i = 1; i <= a; i++) {
            result += (i * b);
        }
        return result;
    }

    let user = global.db.data.users[m.sender];
    let currentExp = user.exp;
    let currentLevel = user.level;
    let nextLevelExp = n(currentLevel + 1, global.level_system.exp_level);
    if(global.level_system.enable_max_level && currentLevel === global.level_system.max_level) nextLevelExp = n(currentLevel, global.level_system.exp_level) 
    let nazz_1 = currentExp + n(currentLevel, global.level_system.exp_level)
    let nazz_2 = nextLevelExp

    m.reply(`Level anda adalah ${currentLevel} (${nazz_1}/${nazz_2})\nKurang ${nazz_2 - nazz_1} XP lagi!`);
}

handler.command = /^(level|ceklevel|checklevel)$/i;
handler.help = "ceklevel";
handler.tags = "main";

module.exports = handler;

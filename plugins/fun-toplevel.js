let handler = async (m, { conn }) => {
    let leaderboard = global.db.data.user;

    // Fungsi untuk mengurutkan data leaderboard
    function sortLeaderboard(leaderboard) {
        return Object.entries(leaderboard)
            .sort((a, b) => b[1].level - a[1].level)
            .map(([key, value], index) => `${index + 1}. @${key.split("@")[0]}\ndengan ${value.level} level`);
    }

    // Fungsi untuk mendapatkan pesan leaderboard
    function getLeaderboardMessage(leaderboard) {
        let sortedLeaderboard = sortLeaderboard(leaderboard);
        let yourlevel = leaderboard[m.sender].level;

        let yourIndex = sortedLeaderboard.findIndex(entry => entry.includes(`@${m.sender.split("@")[0]}`));
        let totalUsers = sortedLeaderboard.length;
        return {
            message: `TOP ${totalUsers} LEVEL KAMU ${yourIndex + 1} DARI ${totalUsers} ORANG\n${sortedLeaderboard.join('\n')}`,
            user: Object.entries(leaderboard).sort((a, b) => b[1].level - a[1].level).map(v => v[0])
        };
    }

    // Menggunakan fungsi untuk mendapatkan pesan leaderboard
    let leaderboards = getLeaderboardMessage(leaderboard);
    conn.sendMessage(m.chat, { text: leaderboards.message, mentions: leaderboards.user });
}

handler.command = /^(toplevel)$/i;
handler.help = "toplevel";
handler.tags = "fun";

module.exports = handler;

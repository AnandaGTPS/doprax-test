let handler = async (m, { conn }) => {
    let leaderboard = global.db.data.user;

    // Fungsi untuk mengurutkan data leaderboard
    function sortLeaderboard(leaderboard) {
        return Object.entries(leaderboard)
            .sort((a, b) => b[1].limit - a[1].limit)
            .map(([key, value], index) => `${index + 1}. @${key.split("@")[0]}\ndengan ${value.limit} limit`);
    }

    // Fungsi untuk mendapatkan pesan leaderboard
    function getLeaderboardMessage(leaderboard) {
        let sortedLeaderboard = sortLeaderboard(leaderboard);
        let yourLimit = leaderboard[m.sender].limit;

        let yourIndex = sortedLeaderboard.findIndex(entry => entry.includes(`@${m.sender.split("@")[0]}`));
        let totalUsers = sortedLeaderboard.length;
        return {
            message: `TOP ${totalUsers} LIMIT KAMU ${yourIndex + 1} DARI ${totalUsers} ORANG\n${sortedLeaderboard.join('\n')}`,
            user: Object.entries(leaderboard).sort((a, b) => b[1].limit - a[1].limit).map(v => v[0])
        };
    }

    // Menggunakan fungsi untuk mendapatkan pesan leaderboard
    let leaderboards = getLeaderboardMessage(leaderboard);
    conn.sendMessage(m.chat, { text: leaderboards.message, mentions: leaderboards.user });
}

handler.command = /^(toplimit)$/i;
handler.help = "toplimit";
handler.tags = "fun";

module.exports = handler;

let handler = m => m
handler.before = async function(m) {
	if (typeof global.db.data.achievement[m.sender] === 'undefined') global.db.data.achievement[m.sender] = {};
	if (typeof global.db.data.achievement[m.sender].achievement === 'undefined') global.db.data.achievement[m.sender].achievement = []
	if (typeof global.db.data.achievement[m.sender].progess === 'undefined') global.db.data.achievement[m.sender].progess = {}
	let data = global.db.data.achievement[m.sender];
    let users = global.db.data.users[m.sender];
    let pg = global.db.data.achievement[m.sender].progess
    if(typeof pg.chats === 'undefined') pg.chats = 0
    if(typeof pg.commands === 'undefined') pg.commands = 0
    pg.chats += 1
    
     let nazz = [
	    {
			id: "achievement_0", 
			name: "100 chats with " + botname, 
			after: pg.chats >= 100,
			reward: {
				limit: 5
				}
		}, 
        {
            id: "achievement_1", 
            name: "100 command in " + botname, 
            after: pg.commands >= 100,
            reward: {
            	limit: 10
            }
        }, 
        {
            id: "achievement_2", 
            name: "1000 command in " + botname, 
            after: pg.commands >= 1000,
            reward: {
                limit: 100,
                exp: 60000,
                coin: 50
            }
        }
    ];
    
    nazz.filter(v => v.after && !data.achievement.includes(v.id)) 
        .forEach(async (v) => {
            m.reply(`Selamat anda mendapatkan achievement "${v.name}"${v.reward ? `\nReward:\n${Object.keys(v.reward).map(re => `+${v.reward[re]} ${re}`).join("\n")}` : ""}`); 
            data.achievement.push(v.id) 
            if (v.reward) {
                Object.keys(v.reward).forEach(re => {
                    users[re] += v.reward[re];
                });
            }
        });
	}
handler.afterCommand = async function (m, { conn, text }) {
	let pg = global.db.data.achievement[m.sender].progess
    pg.commands += 1
};

module.exports = handler;
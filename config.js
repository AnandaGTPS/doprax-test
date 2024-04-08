/**
  # Created By ZackMans
  # https://youtube.com/@BuildTheCraft
  # https://github.com/ZackMans
*/

/**
	* Base Recoded By Naaazzzzz
	* contact me on whatsapp wa.me/6282139672290
	* https://github.com/AnandaGTPS/SlemekBot-MD
**/
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const syntaxerror = require('syntax-error') 


				/* SAFE ZONE*/
/*UBAH AJA, LU HARUSNYA NGERTI KAN*/


global.botname = "SlemekBot-MD"
global.owner = ["6282139672290"]
global.PORT = process.env.PORT || 3000
global.desk = {
	main: 'Naaazzzzz is here', //owner name
	optional: '© Slemek Community' //community/group name
	}
global.packname = 'Nazz'
global.author = '© SlemekBot-MD'
global.gmail = 'memeradef@gmail.com' //email lu
global.linkgc = 'https://chat.whatsapp.com/Jx4rWfotVB48CvTnk0K9Tq' //link grup wangsaf lu
global.urlmenu = {
main: 'https://telegra.ph/file/f5d7192eea4848b112d7b.jpg', 
optional: 'https://telegra.ph/file/4fcd3b3674f6e3d1325b9.jpg'
}
global.urlvideo = {
	main: 'https://telegra.ph/file/9b9e6bdc80f88b4323ae5.mp4'
	}
global.setting = {
	limit: 50, //free user limit
	premium: 10000 //premium user limit
	}
global.response = {
		wait: "Tunggu sebentar, permintaan anda sedang diproses...",
		owner: "Perintah ini hanya untuk owner!",
		admin: "Perintah ini hanya untuk admin group!",
		botadmin: "Bot harus menjadi admin group untuk melakukan perintah ini!",
		group: "Perintah ini hanya dapat dilakukan didalam grup!",
		private: "Perintah ini hanya dapat dilakukan didalam Private Chat",
		error: "Command error, silahkan coba beberapa saat lagi...",
		errorlink: "Mohon masukkan link yang benar",
		limit: "Limit anda sudah habis, silahkan gunakan fitur ini esok hari", 
		premium: "Perintah ini hanya untuk pengguna premium!"
}


		 /* ADVANCED ZONE */
/* Kalo ga ngerti tanya orang aja😛*/


global.advanced_reply = true //reply dengan gambar
global.sendPresence = true //enable sendPresence atau status sedang mengetik...
global.default_autoread = true //auto read pesan
global.enable_chats_log = true //console log pesan
global.enable_limit = true //kalo mati limit ga bakal ngurang
global.enable_premium = true //kalo mati semua fitur jadi free
global.enable_displaying_menu_mode = false //kalo nyala di kanan command bakal muncul tanda
global.prefix_settings = {
	enable_no_prefix: true, 
	enable_custom_prefix: false, 
	custom_prefix: [".","#"]
	}
global.cooldown_settings = {
	enable_cooldown: false, 
	cooldown: 10000,
	cooldown_message: true
	}
global.menu_display_enable = { //nyalain buat nampilin
	sapa: true, 
	info: true, 
	menu: true, 
	quotes: true
	}
global.font_in_menu = { //nyalain buat ngubah font
	enable: {
		sapa: false, 
		info: true, 
		menu: true
		}, 
	font: { //beberapa font ga support, jadi kalo error ganti aja font nya
		sapa: "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ1234567890", 
		info: "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ1234567890", 
		menu: "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ1234567890"
		}
	}
global.premium_menu_display = "Ⓟ"
global.limit_menu_display = "Ⓛ"
global.owner_menu_display = "Ⓞ"
global.free_menu_display = "Ⓕ"
global.level_system = {
	enable_max_level: false, //enable max level
	enable_announcement_up_level: true, 
	max_level: 125,
	exp_level: 1000,
	exp_value: 500
	}







			/* DANGER ZONE */
/* Kurasa Lu Ga Bakal Ngubah Juga */







// Reload command / function
const pluginFilter = (filename) => /\.js$/.test(filename);
const pluginFolder = path.join(__dirname, "./plugins");

global.reload = (filePath) => {
  filePath = `./${filePath.replace(/\\/g, '/')}`;
  const filename = filePath.split("/").pop();
  
  if (pluginFilter(filename)) {
    const pluginPath = path.join(pluginFolder, filename);
    
    if (pluginPath in require.cache) {
      delete require.cache[pluginPath];
      if (fs.existsSync(pluginPath)) {
        console.info(`Re-requiring plugin '${filename}'`);
        
        const fileContent = fs.readFileSync(pluginPath);
        const err = syntaxerror(fileContent, filename);
        
        if (err) {
          console.log(`Syntax error while loading '${filename}'\n${err}`);
        } else {
          const plugin = require(pluginPath);
          try {
            attr[filename] = plugin;
          } catch (e) {
            console.log(e);
          } finally {
            attr = Object.fromEntries(Object.entries(attr).sort(([a], [b]) => a.localeCompare(b)));
          }
        }
      } else {
        console.log(`Deleted plugin '${filename}'`);
        return delete attr[filename];
      }
    } else {
      console.info(`Requiring new plugin '${filename}'`);
      const plugin = require(pluginPath);
          try {
            attr[filename] = plugin;
          } catch (e) {
            console.log(e);
          } finally {
            attr = Object.fromEntries(Object.entries(attr).sort(([a], [b]) => a.localeCompare(b)));
          }
    }
  }
};

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update '${__filename}'`))
  delete require.cache[file]
  require(file)
})

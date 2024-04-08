let handler = m => m

handler.all = async function (m) {
global.fake = {
	payment: {"key":{"remoteJid":"status@broadcast","fromMe":false,"id":"BAE5D5C61C904D8"},"message":{"requestPaymentMessage":{"currencyCodeIso4217":"IDR","amount1000":"10000000000","requestFrom":"0@s.whatsapp.net","noteMessage":{"extendedTextMessage":{"text":global.desk.main,"contextInfo":{"mentionedJid":[]}}},"expiryTimestamp":"0","amount":{"value":"10000000000","offset":1000,"currencyCode":"IDR"}}},"participant":"0@s.whatsapp.net"}, 
	troli: {"key":{"remoteJid":"status@broadcast","fromMe":false,"id":"211E0ABC2F7C4497FB7E0B1805E4ADB6E"},"message":{"productMessage":{"product":{"productImage":{"url":"https://mmg.whatsapp.net/o1/v/t62.7118-24/f1/m269/up-oil-image-3c38f3b9-6441-4480-81b3-fcc4e074d059?ccb=9-4&oh=01_AdQNG_TGXtwBBr5sXjIMN3xCduZcNSnHr5YIoTg4UfXHQw&oe=661B4164&_nc_sid=000000&mms3=true","mimetype":"image/jpeg","fileSha256":"ToLjsJlIBsMQhtngtMlyUQdACtcbmoHfI2SoAQXhpL0=","fileLength":"61898","height":720,"width":720,"mediaKey":"k+/Sr7Oad9/B7Ig+QQzuAE/qTHur3Fwx5vIksL70TTw=","fileEncSha256":"A7gA9KHuGRNPQ6ZbIVvvQ4iOTcYVs/SUGGfUxmwhdO0=","directPath":"/o1/v/t62.7118-24/f1/m269/up-oil-image-3c38f3b9-6441-4480-81b3-fcc4e074d059?ccb=9-4&oh=01_AdQNG_TGXtwBBr5sXjIMN3xCduZcNSnHr5YIoTg4UfXHQw&oe=661B4164&_nc_sid=000000","mediaKeyTimestamp":"1710427165","jpegThumbnail": ""},"productId":"6836429953149034","title":global.desk.main,"currencyCode":"IDR","priceAmount1000":"2500000000","productImageCount":1},"businessOwnerJid":"0@s.whatsapp.net","contextInfo":{}}},"participant":"0@s.whatsapp.net"}
	}
}

module.exports = handler
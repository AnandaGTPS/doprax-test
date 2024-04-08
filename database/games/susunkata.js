var textArray = "Gajah, Sepeda, Kucing, Jeruk, Anjing, Meja, Buku, Pantai, Roti, Matahari, Motor, Gunung, Air, Rumah, Coklat, Pohon, Pintu, Laut, Bulan, Mobil, Laptop, Burung, Musik, Gitar, Jam, Telepon, Bola, Kuda, Ikan, Udara, Mata, Salju, Bintang, Udang, Kaki, Rumput, Baju, Sepatu, Taman, Serigala, Manusia, Tas, Mawar, Merpati, Pensil, Awan, Berenang, Rok, Bersepeda, Hutan, Seni, Kelinci, Kursi, Terbang, Planet, Mikrofon, Kemeja, Pesawat, Tangga, Roket, Kotak, Kotak surat, Benua, Petir, Merah, Biru, Kuning, Hitam, Putih, Oranye, Biru langit, Akuarium, Kuil, Bioskop, Aplikasi, Guling, Tanduk, Piano, Cermin, Bawang, Wortel, Kacang polong, Buncis, Kubis, Brokoli, Terong, Kentang, Ubi, Labu, Roti, Roti, Donat, Kue, Pancake, Pie, Burger, Sosis, Lobster, Kepiting, Salmon, Lele, Gurita, Sashimi, Tempura, Dim sum, Bakso, Bakmi, Bihun, Kerupuk, Permen, Coklat, Marshmallow, Selai, Madu, Susu, Kopi, Teh, Jus, Cendol, Smoothie, Latte, Cappuccino, Espresso, Yoghurt, Minuman, Energi, Limun, Lemonade, Soda, Jeruk, Panas, Dingin, Mineral, Soda, Ringan, Manis, Asam, Segar, Hitam, Susu, Gula, Hangat, Gajah, Sepeda, Jerman, Apel, Kucing, Laptop, Prancis, Jeruk, Anjing, Meja, Kanada, Semangka, Singa, Buku, Jepang, Pisang, Burung, Pintu, Australia, Blueberry, Kuda, Rumah, Brazil, Raspberry, Harimau, Mobil, Spanyol, Stroberi, Ikan, Telepon, Rusia, Aprikot, Gajah laut, Komputer, Italia, Kiwi, India, Jerapah, Pohon, Meksiko, Mango, Burung, Kursi, Mesir, Lemon, Bebek, Perancis, Ceri, Buaya, Norwegia, Markisa, Kecoa, Kunci, Chili, Paus, Kain, Thailand, Avocado, Simpanse, Jendela, India, Persik, Laut, Belanda, Sapi, Ransel, Peru, Blackberry, Gajah, Kulkas, Mesir, Monyet, Sofa, Yunani, Persik, Kunci, Kanada, Pir, Nilgai, Swedia, Kiwi, Jerapah, Kunci, Chili, Panda, Lemari, Mesir, Nenas, Rusa, Telepon, Maroko, Nangka, Ayam, Almari, Mesir, Jeruk, Serigala, Panci, Jepang, Pisang, Zebra, Gelas, Jerman, Pepaya, Kuda, Pakaian, Italia, Salak, Tupai, Meja, Spanyol, Apel, Katak, Lampu, Portugal, Ceri, Tupai, Pintu, Belgia, Rambutan, Serigala, Buku, Brazil, Raspberry, Harimau, Mobil, Spanyol, Stroberi, Ikan, Telepon, Rusia, Aprikot, Komputer, Italia, Kiwi, Tas, India, Jerapah, Pohon, Meksiko, Mango, Burung, Kursi, Mesir, Lemon, Bebek, Perancis, Ceri, Buaya, Norwegia, Markisa, Kecoa, Kunci, Chili, Paus, Kain, Thailand, Avocado, Simpanse, Jendela, India, Persik, Laut, Belanda, Plum, Sapi, Peru, Blackberry, Gajah, Kulkas, Mesir, Ceri, Monyet, Sofa, Yunani, Persik, Kunci, Kanada, Pir, Nilgai, Swedia, Kiwi, Jerapah, Kunci, Chili, Panda, Lemari, Mesir, Nenas, Rusa, Telepon, Maroko, Nangka, Ayam, Lemari, Mesir, Jeruk, Serigala, Panci, Jepang, Pisang, Zebra, Gelas, Jerman, Pepaya, Kuda, Pakaian, Italia, Salak, Tupai, Meja, Spanyol, Apel, Katak, Lampu, Portugal, Ceri, Tupai, Pintu, Belgia, Rambutan, Serigala, Buku, Brazil, Raspberry, Harimau, Mobil, Spanyol, Stroberi, Ikan, Telepon, Rusia, Aprikot, Komputer, Italia, Kiwi";
        
        function shuffleWord(word) {
          var shuffledWord = "";
          word = word.split('');
          while (word.length > 0) {
            shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
          }
          return shuffledWord;
        } 
        
       /* function getRandomText() {
        	var susun = textArray.split(",");
          for (ran = 0; ran < susun.length; ran++)
          var jawaban = susun[ran].trim();
          var soal = shuffleWord(jawaban).split('').join('-').toUpperCase();
          return {
            "soal": soal, 
            "jawaban": jawaban.toUpperCase() 
          };
        } */
        var susun = textArray.split(",");
        for (i = 0; i < susun.length; i++) {
          var jawaban = susun[i].trim();
          var soal = shuffleWord(jawaban).split('').join('-').toUpperCase();
          let res = {}
          res[i] = {}
          res[i].index = i
          res[i].soal = soal
          res[i].jawaban = jawaban.toUpperCase()
        }
        
        console.log(res) 
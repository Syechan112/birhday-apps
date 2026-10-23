function generateGift(index) {
  return {
    id: index,
    caption: undefined,
    message: [
      'Senang rasanya bisa mengenalmu. Semoga selalu ada hal baik yang kamu temui setiap hari.',
      'Semoga apa yang sedang kamu usahakan bisa berjalan dengan baik. Jangan lupa istirahat juga.',
      'Semoga kamu selalu punya alasan untuk tersenyum, bahkan di hari-hari yang biasa saja.',
      'Tahib, semangat terus ya. Perjalananmu sudah cukup bagus, terus bertambah baik.',
      'Dunia ini lebih indah karena keberadaanmu. Terus jadilah versi terbaik dirimu.',
      'Setiap langkah kecil yang kamu ambil hari ini akan membawa ke tempat yang luar biasa.',
      'Kamu luar biasa, kuat, dan penuh keajaiban. Jangan pernah meremehkan diri sendiri.',
      'Harapanku yang terbaik untukmu. Semoga setiap usaha kamu diberkahi keberkahan.',
      'Senyummu bisa menerangi hari tergelap. Terus jadikan cakramanmu yang bersinar.',
      'Kehidupan memberi hadiah manis hari ini. Nikmati sepenuhnya, karena kamu pantas.',
      'Setiap tantangan yang kamu lewati membuatmu lebih dewasa dan bijaksana.',
      'Walaupun hari ini berat, besok pasti lebih cerah. Karena kamu punya tenacity yang hebat.',
      'Selamat tinggi badan! Bertambah satu angka, tapi tetap keren.',
      'Temukan keindahan di tengah kekacauan. Kamu adalah bagian dari puzzle keajaiban.',
      'Terima kasih sudah ada. Dunia jadi berwarna dengan adamu di dalamnya.',
    ][index - 1] || 'Semoga harimu menyenangkan!',
  }
}

const gifts = Array.from({ length: 15 }, (_, i) => generateGift(i + 1))

export const birthdayConfig = {
  music: '/audio/birthday-music.mp3',
  birthdayDate: '2025-10-23',
  gifts,
  birthdayMessage: `Selamat ulang tahun!

Semoga di usia yang baru ini, ada banyak hal baik yang datang ke hidupmu.
Semoga semua yang sedang kamu usahakan perlahan menemukan jalannya, diberi kesehatan, dan selalu dikelilingi orang-orang yang tulus.

Tidak semua hari akan berjalan sesuai rencana, tapi semoga kamu selalu punya kekuatan untuk melewatinya dan kesempatan untuk memulai lagi.

Terima kasih sudah menjadi bagian dari banyak cerita. Semoga tahun ini membawa pengalaman baru, lebih banyak kebahagiaan, dan hal-hal yang layak kamu syukuri.

Selamat ulang tahun. Semoga harimu menyenangkan, ya.`,
  certificate: {
    title: 'SERTIFIKAT KENAIKAN USIA',
    badge: 'Officially One Year Older',
    closing: 'Selamat bertambah usia. Semoga tahun ini membawa banyak pengalaman baik dan pencapaian baru.',
  },
  badges: [
    'Officially One Year Older',
    'Professional Overthinker',
    'Level Up Complete',
    'Collector of Good Memories',
    'Made It Through Another Year',
  ],
}

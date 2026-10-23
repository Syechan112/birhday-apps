# PRD — Interactive Birthday Surprise Website

**Project Name:** Birthday Gacha  
**Product Type:** Interactive Birthday Greeting Website  
**Platform:** Responsive Web Application  
**Frontend:** React + Vite  
**Styling:** Tailwind CSS  
**Language:** Indonesian (Bahasa Indonesia)  
**Version:** 1.0

---

## 1. Project Overview

### 1.1 Background

Birthday Gacha adalah website ucapan ulang tahun interaktif yang dirancang sebagai hadiah digital personal. Pengguna tidak hanya membaca ucapan, tetapi menjalani pengalaman bertahap mulai dari memasukkan identitas, melihat perhitungan usia, membuka kado berisi foto dan pesan, membaca surat ulang tahun, hingga menerima sertifikat kelulusan menambah umur.

Website harus menghadirkan pengalaman seperti membuka hadiah sungguhan melalui animasi, musik, transisi antarlayar, dan elemen interaktif yang menyenangkan.

### 1.2 Project Objectives

- Menciptakan pengalaman ulang tahun digital yang personal dan memorable.
- Menjadikan foto dan pesan sebagai elemen interaktif melalui mekanisme gacha.
- Menampilkan usia secara akurat berdasarkan tanggal lahir.
- Menghadirkan pesan utama dengan animasi typewriter.
- Menghasilkan sertifikat ulang tahun yang dapat diunduh dan dibagikan.
- Memastikan website berjalan baik di perangkat mobile maupun desktop.
- Menghindari kebutuhan backend atau database untuk versi pertama.

### 1.3 Target Audience

- Seseorang yang ingin memberikan hadiah ulang tahun digital kepada teman atau orang spesial.
- Pengguna yang menyukai website interaktif, animasi lucu, dan hadiah personal.
- Penerima hadiah yang mengakses website melalui tautan di WhatsApp, Instagram, atau media sosial lainnya.

---

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| React | UI dan pengelolaan komponen |
| Vite | Development server dan build |
| Tailwind CSS | Styling responsif |
| Framer Motion | Animasi halaman dan interaksi |
| Lucide React | Ikon antarmuka |
| Canvas Confetti | Efek confetti |
| html-to-image | Ekspor sertifikat menjadi PNG |
| JavaScript Date API | Perhitungan usia |
| HTML Audio API | Pemutaran musik latar |
| localStorage (opsional) | Menyimpan progres lokal |

**Ketentuan teknis:**
- Gunakan React Functional Components dan Hooks.
- Gunakan Tailwind CSS untuk styling; hindari membuat stylesheet CSS terpisah jika utility class sudah mencukupi.
- Gunakan Framer Motion untuk transisi dan animasi yang kompleks.
- Gunakan komponen reusable agar mudah dikembangkan.
- Gunakan data konfigurasi untuk nama, tanggal lahir, foto, pesan, dan musik.
- Jangan menggunakan backend atau API eksternal untuk fitur inti versi pertama.

---

## 3. User Journey

Alur utama aplikasi:

1. Pengguna membuka halaman awal.
2. Pengguna mengisi nama dan tanggal lahir penerima.
3. Pengguna menekan tombol mulai.
4. Musik mulai diputar setelah interaksi pengguna.
5. Website menampilkan opening Happy Birthday dan hitungan usia.
6. Pengguna melanjutkan ke galeri Gacha.
7. Pengguna membuka seluruh kado untuk melihat foto dan pesan.
8. Setelah semua kado terbuka, halaman bertransisi menuju surat ucapan.
9. Surat ditampilkan menggunakan efek typewriter.
10. Website menampilkan sertifikat ulang tahun.
11. Pengguna dapat mengunduh sertifikat atau mengaktifkan confetti dan peluk virtual.

Setiap tahap harus memiliki navigasi yang jelas serta transisi yang halus.

---

## 4. Functional Requirements

### 4.1 Halaman Input — Birthday Setup

**Tujuan:** Mengumpulkan informasi penerima sebelum memulai pengalaman ulang tahun.

#### Input fields

- Nama penerima.
- Tanggal lahir.

#### UI requirements

- Tampilan minimalis, playful, dan hangat.
- Judul pembuka, misalnya "A little surprise for you".
- Input nama dengan placeholder yang ramah.
- Date picker untuk tanggal lahir.
- Tombol utama "Buka Hadiahmu".
- Dekorasi kecil berupa bintang, pita, atau ilustrasi kado.

#### Functional requirements

- Nama wajib diisi.
- Tanggal lahir wajib diisi.
- Tanggal lahir tidak boleh berada di masa depan.
- Tampilkan pesan validasi yang mudah dipahami.
- Saat tombol submit ditekan, simpan input ke state React.
- Musik baru dimulai setelah interaksi pengguna, bukan mengandalkan autoplay saat halaman baru dibuka.
- Jika musik gagal diputar, pengalaman utama tetap berjalan tanpa error.

#### Acceptance criteria

- Form dapat digunakan di mobile dan desktop.
- Pengguna tidak dapat melanjutkan dengan input yang tidak valid.
- Musik dapat dimulai melalui interaksi pengguna.
- Informasi penerima tersedia di seluruh tahapan berikutnya.

---

### 4.2 Halaman Opening — Happy Birthday & Age Counter

**Tujuan:** Menampilkan momen pembuka yang menarik dan personal.

#### Content

Contoh:

"Happy Birthday, [Nama]!"

"Kamu sudah menghabiskan [X] tahun dan [Y] hari di bumi."

Tambahkan ucapan singkat seperti:

"Dan hari ini, dunia punya alasan lagi untuk merayakan kehadiranmu."

#### Age calculation

Perhitungan harus menggunakan tanggal lahir dan tanggal saat ini secara akurat.

- Hitung umur dalam tahun kalender penuh.
- Hitung total hari sejak tanggal lahir.
- Hitung sisa hari setelah ulang tahun terakhir.
- Jangan menggunakan pendekatan pembagian total hari dengan 365 untuk menentukan umur dalam tahun.
- Perhatikan tahun kabisat dan batas pergantian tanggal.

Contoh format:

- Usia: 20 tahun.
- Total waktu di bumi: 7.305 hari.
- Sejak ulang tahun terakhir: 0 hari.

Angka ditampilkan menggunakan animasi count-up yang halus.

#### UI and animation

- Angka usia menjadi fokus utama.
- Gunakan animasi masuk dan perubahan angka.
- Tambahkan confetti ringan saat opening muncul.
- Tombol "Lanjut ke Hadiah" membawa pengguna menuju halaman Gacha.

#### Acceptance criteria

- Nama sesuai dengan input.
- Umur dalam tahun sesuai tanggal lahir.
- Total hari dihitung secara konsisten dengan definisi yang digunakan aplikasi.
- Tampilan tetap terbaca pada layar kecil.

---

### 4.3 Main Gallery — Birthday Gacha

**Tujuan:** Mengubah galeri foto menjadi pengalaman membuka hadiah satu per satu.

#### Core concept

Foto tidak langsung ditampilkan sebagai slideshow. Setiap foto berada di balik objek kado atau kapsul gacha yang dapat diklik.

#### Gallery structure

- Tampilkan beberapa kado dalam grid responsif.
- Setiap kado memiliki nomor atau identitas.
- Kado yang belum dibuka menampilkan ilustrasi atau animasi sederhana.
- Pengguna dapat membuka satu kado melalui klik atau tap.
- Setiap pembukaan menghasilkan satu foto dan potongan pesan unik.

#### Opening interaction

Ketika kado dipilih:

1. Kado bergerak atau bergetar.
2. Animasi unboxing berjalan.
3. Foto muncul dengan transisi scale dan fade.
4. Potongan ucapan muncul bersama foto.
5. Status kado berubah menjadi terbuka.
6. Pengguna dapat melanjutkan ke kado lainnya.

Contoh potongan pesan:

- "Makasih sudah hadir di dunia."
- "Semoga hari-harimu dipenuhi hal baik."
- "Jangan lupa bahagia, ya."
- "Satu tahun lagi, satu bab baru lagi."

Pesan harus dapat dikustomisasi dan tidak diulang secara tidak sengaja.

#### Data model

Setiap item gacha memiliki:

- `id`
- `image`
- `caption`
- `message`
- `isOpened`

Contoh struktur data:

```js
const gifts = [
  {
    id: 1,
    image: "/images/photo-1.jpg",
    caption: "A little memory",
    message: "Semoga selalu menemukan alasan untuk tersenyum.",
  },
];
```

`isOpened` dapat dikelola melalui state React, bukan wajib disimpan langsung dalam konfigurasi awal.

#### Progress tracking

- Tampilkan jumlah kado yang sudah dibuka.
- Tampilkan progres, misalnya `3 / 6 hadiah terbuka`.
- Tombol lanjut ke surat hanya aktif setelah semua kado terbuka.
- Jangan mengunci pengguna jika salah satu foto gagal dimuat; tampilkan fallback yang sesuai.

#### Acceptance criteria

- Setiap kado hanya membuka kontennya sendiri.
- Pembukaan kado tidak menyebabkan foto tertukar.
- Progres selalu sesuai jumlah kado yang terbuka.
- Pengguna dapat membuka seluruh kado melalui perangkat sentuh maupun mouse.
- Galeri tidak mengalami overflow horizontal di mobile.

---

### 4.4 Main Message — Birthday Letter

**Tujuan:** Menyampaikan pesan utama setelah seluruh hadiah berhasil dibuka.

#### Trigger

Halaman surat dapat dibuka setelah semua item Gacha telah dibuka.

#### Animation

- Transisi dari galeri menggunakan sliding effect.
- Konten surat masuk secara bertahap.
- Teks ditampilkan menggunakan typewriter effect.
- Pengguna dapat memilih tombol "Lewati Animasi" untuk langsung membaca seluruh pesan.
- Animasi tidak boleh menghambat akses ke isi pesan.

#### Message content

Pesan utama dikonfigurasi secara terpisah agar mudah diganti tanpa mengubah komponen UI.

Contoh:

"Selamat ulang tahun!

Hari ini bukan cuma tentang bertambahnya umur, tetapi juga tentang semua hal yang sudah kamu lewati dan semua hal baik yang masih menunggumu.

Semoga kamu selalu punya keberanian untuk mencoba, ketenangan saat menghadapi hari sulit, dan orang-orang yang membuatmu merasa dihargai.

Terima kasih sudah menjadi dirimu sendiri. Semoga bab baru ini membawa lebih banyak kebahagiaan, cerita baik, dan alasan untuk tersenyum.

Happy Birthday!"

Pesan di atas merupakan konten contoh, bukan teks yang wajib digunakan.

#### UI requirements

- Gunakan layout seperti surat digital.
- Berikan jarak antarp paragraf yang nyaman.
- Hindari efek visual berlebihan yang mengganggu pembacaan.
- Tambahkan tombol "Lihat Sertifikat" setelah pesan selesai.

#### Acceptance criteria

- Pesan tampil dengan urutan yang benar.
- Tombol skip menampilkan seluruh teks.
- Navigasi tidak mereset pesan atau progres Gacha secara tidak sengaja.

---

### 4.5 Ending — Birthday Graduation Certificate

**Tujuan:** Memberikan hasil akhir yang lucu dan dapat disimpan sebagai kenang-kenangan.

#### Certificate title

**SERTIFIKAT RESMI KELULUSAN MENAMBAH UMUR**

#### Certificate content

Sertifikat menampilkan:

- Nama penerima.
- Tanggal lahir.
- Umur terbaru.
- Tanggal penerbitan.
- Gelar atau badge lucu.
- Nomor sertifikat opsional.
- Kalimat penutup.

Contoh gelar:

- Certified Main Character.
- Senior Professional Overthinker.
- Level Up Specialist.
- Official Happiness Collector.
- Survived Another Year.

Gelar harus bersifat positif, ringan, dan dapat dikustomisasi.

#### Visual design

- Desain menyerupai sertifikat penghargaan modern.
- Gunakan tipografi yang jelas.
- Gunakan border, elemen dekoratif, dan hierarki visual yang rapi.
- Pastikan nama dan usia menjadi fokus utama.
- Sertifikat harus tetap terlihat baik ketika diekspor menjadi gambar.

#### Download Certificate

Gunakan `html-to-image` untuk mengubah elemen sertifikat menjadi file PNG.

Functional requirements:

- Tombol "Download Sertifikat".
- File dapat diunduh secara lokal.
- Nama file mengikuti format seperti `birthday-certificate-nama.png`.
- Foto, ikon, dan font harus dimuat sebelum ekspor.
- Gunakan elemen khusus untuk sertifikat agar tombol dan kontrol UI tidak ikut masuk ke gambar.
- Jika ekspor gagal, tampilkan pesan error dan opsi mencoba kembali.

#### Acceptance criteria

- Nama dan usia pada sertifikat sesuai input.
- File hasil ekspor memiliki format PNG.
- Sertifikat dapat dibaca ketika dibagikan ke media sosial.
- Layout sertifikat tidak terpotong pada hasil ekspor.

---

### 4.6 Interactive Ending — Confetti & Virtual Hug

**Tujuan:** Membuat penutup lebih menyenangkan dan interaktif.

#### Feature A: Spam Confetti

- Tombol "Spam Confetti".
- Setiap klik memunculkan animasi confetti.
- Efek dapat diulang.
- Batasi intensitas dan jumlah partikel agar tidak membebani perangkat.
- Hormati preferensi `prefers-reduced-motion` jika memungkinkan.

#### Feature B: Peluk Virtual

- Tombol "Peluk Virtual".
- Ketika ditekan, tampilkan animasi pelukan berbasis ilustrasi, emoji, atau karakter sederhana.
- Tambahkan teks seperti "Sending you the biggest virtual hug!"
- Gunakan animasi scale, fade, atau motion yang ringan.

#### Acceptance criteria

- Kedua tombol merespons interaksi pengguna.
- Animasi tidak menghalangi tombol lain.
- Fitur tetap berfungsi di perangkat mobile.
- Pengguna dapat menikmati ending tanpa harus mengulang website dari awal.

---

## 5. UI/UX Design Direction

### 5.1 Design Concept

Arah visual yang diinginkan adalah **playful, personal, modern, dan whimsical**, seperti membuka hadiah digital yang dirancang khusus untuk seseorang.

Website tidak boleh terlihat seperti dashboard admin atau landing page bisnis generik.

### 5.2 Visual Guidelines

- Gunakan background terang dengan warna lembut sebagai aksen.
- Gunakan kombinasi putih, pink lembut, lavender, atau warna pastel yang konsisten.
- Gunakan tipografi display untuk heading dan font yang nyaman dibaca untuk body text.
- Gunakan sudut membulat secukupnya.
- Gunakan animasi untuk memperkuat pengalaman, bukan sekadar dekorasi.
- Hindari terlalu banyak gradient, shadow tebal, ornamen acak, dan card berlebihan.
- Prioritaskan hierarki visual, whitespace, dan komposisi yang rapi.

### 5.3 Responsive Design

**Mobile:**
- Layout satu kolom untuk halaman pembuka dan surat.
- Grid Gacha menyesuaikan lebar layar.
- Tombol mudah ditekan dengan jari.
- Sertifikat dapat ditampilkan dalam preview yang proporsional.
- Tidak ada overflow horizontal.

**Desktop:**
- Konten berada dalam container dengan lebar terkontrol.
- Galeri menggunakan grid lebih luas.
- Animasi dapat memanfaatkan ruang tambahan tanpa mengganggu fokus.

### 5.4 Accessibility

- Tombol harus dapat digunakan dengan keyboard.
- Tambahkan label yang jelas pada form.
- Berikan focus state yang terlihat.
- Jangan mengandalkan warna saja untuk menunjukkan status hadiah.
- Berikan opsi untuk melewati animasi.
- Gunakan teks alternatif pada foto.

---

## 6. Application Architecture

### 6.1 Suggested Folder Structure

```text
birthday-gacha/
├── public/
│   ├── images/
│   │   ├── photo-1.jpg
│   │   ├── photo-2.jpg
│   │   └── photo-3.jpg
│   ├── audio/
│   │   └── birthday-music.mp3
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── ProgressIndicator.jsx
│   │   │   └── PageTransition.jsx
│   │   ├── birthday/
│   │   │   ├── BirthdayForm.jsx
│   │   │   ├── AgeCounter.jsx
│   │   │   ├── GachaGift.jsx
│   │   │   ├── PhotoReveal.jsx
│   │   │   ├── BirthdayLetter.jsx
│   │   │   ├── Certificate.jsx
│   │   │   └── CelebrationActions.jsx
│   ├── data/
│   │   └── birthdayConfig.js
│   ├── hooks/
│   │   ├── useAge.js
│   │   └── useTypewriter.js
│   ├── utils/
│   │   ├── calculateAge.js
│   │   └── downloadCertificate.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

Catatan: `index.css` hanya digunakan untuk directive Tailwind dan kebutuhan global minimal jika diperlukan.

### 6.2 Application State

Gunakan state React untuk mengelola:

- Data penerima.
- Halaman yang sedang aktif.
- Status musik.
- Daftar hadiah yang sudah dibuka.
- Progres galeri.
- Status animasi typewriter.
- Status proses ekspor sertifikat.

Untuk versi pertama, Context API atau state di komponen utama sudah cukup. Hindari menambahkan state management library yang tidak diperlukan.

### 6.3 Birthday Configuration

Buat satu file konfigurasi untuk mengubah konten dengan mudah.

Contoh:

```js
export const birthdayConfig = {
  music: "/audio/birthday-music.mp3",
  gifts: [],
  birthdayMessages: [],
  certificate: {
    title: "Sertifikat Resmi Kelulusan Menambah Umur",
    badge: "Certified Main Character",
  },
};
```

Data nama dan tanggal lahir tetap berasal dari form pengguna. Jangan memasukkan data personal penerima secara permanen ke source code jika website digunakan sebagai template publik.

---

## 7. Non-Functional Requirements

### Performance

- Gunakan gambar dengan ukuran yang dioptimalkan.
- Gunakan lazy loading jika sesuai untuk gambar galeri.
- Hindari animasi yang terus berjalan tanpa kebutuhan.
- Minimalkan dependensi dan JavaScript yang tidak diperlukan.
- Pastikan efek confetti tidak menghambat interaksi.

### Reliability

- Tangani kegagalan pemutaran musik.
- Tangani gambar yang gagal dimuat.
- Tangani kegagalan ekspor sertifikat.
- Pastikan tombol navigasi tidak menyebabkan state hilang secara tidak sengaja.
- Perhitungan usia harus konsisten terhadap zona waktu dan perubahan tanggal.

### Privacy

- Data nama dan tanggal lahir hanya digunakan untuk pengalaman ulang tahun.
- Tidak ada pengiriman data ke server pada versi pertama.
- Hindari menyimpan data pribadi secara persisten jika tidak dibutuhkan.
- Foto dan musik disimpan sebagai aset website.
- Jelaskan bahwa website yang dipublikasikan melalui tautan dapat diakses oleh orang lain yang memiliki tautan tersebut.

### Browser Compatibility

Target browser modern:

- Google Chrome.
- Microsoft Edge.
- Safari.
- Firefox.

---

## 8. Deployment Requirements

Website harus dapat dibangun dan dipublikasikan sebagai aplikasi statis.

Pilihan hosting:

- Vercel.
- Netlify.
- GitHub Pages, dengan konfigurasi base path jika diperlukan.

Build command:

```bash
npm run build
```

Output build Vite secara default berada di direktori `dist/`.

Tidak diperlukan server backend untuk fitur inti. Pastikan path gambar, musik, dan aset lainnya berfungsi setelah deployment.

---

## 9. Testing & Acceptance Criteria

### Input and Opening
- [ ] Nama dan tanggal lahir dapat dimasukkan.
- [ ] Validasi input berjalan dengan benar.
- [ ] Musik mulai diputar setelah interaksi pengguna.
- [ ] Opening menampilkan nama dan usia yang benar.
- [ ] Total hari sesuai perhitungan tanggal.

### Gacha Gallery
- [ ] Semua hadiah tampil sesuai konfigurasi.
- [ ] Setiap hadiah dapat dibuka.
- [ ] Foto dan pesan yang muncul sesuai hadiah.
- [ ] Progress galeri diperbarui dengan benar.
- [ ] Tombol lanjut aktif setelah semua hadiah terbuka.

### Birthday Letter
- [ ] Transisi halaman berjalan mulus.
- [ ] Typewriter menampilkan pesan secara bertahap.
- [ ] Pengguna dapat melewati animasi.
- [ ] Pesan tetap lengkap setelah animasi selesai.

### Certificate and Ending
- [ ] Sertifikat menampilkan nama dan usia yang benar.
- [ ] Tombol download menghasilkan PNG.
- [ ] Tombol confetti berfungsi.
- [ ] Tombol peluk virtual berfungsi.
- [ ] Tidak ada elemen penting yang terpotong di mobile.

### General Quality
- [ ] Tidak ada error JavaScript yang menghambat alur.
- [ ] Semua tombol memiliki fungsi nyata.
- [ ] Layout responsif di mobile dan desktop.
- [ ] Website dapat dijalankan dengan `npm run dev`.
- [ ] Website dapat di-build dengan `npm run build`.

---

## 10. Development Milestones

### Phase 1 — Foundation
- Setup React, Vite, dan Tailwind CSS.
- Buat struktur komponen.
- Tentukan konfigurasi tema dan konten.
- Implementasikan state dan navigasi antartahap.

### Phase 2 — Core Experience
- Buat form input.
- Implementasikan perhitungan usia.
- Buat opening animation.
- Implementasikan pemutar musik.

### Phase 3 — Gacha and Story
- Buat komponen kado.
- Implementasikan animasi unboxing.
- Hubungkan foto dan pesan.
- Implementasikan progress tracking.
- Buat surat dengan typewriter effect.

### Phase 4 — Certificate and Celebration
- Buat layout sertifikat.
- Implementasikan ekspor PNG.
- Tambahkan confetti.
- Tambahkan peluk virtual.

### Phase 5 — Polish and Deployment
- Perbaiki tampilan mobile dan desktop.
- Optimalkan gambar dan animasi.
- Jalankan acceptance tests.
- Build dan deploy ke hosting statis.

---

## 11. Out of Scope — Version 1

Fitur berikut tidak wajib untuk versi pertama:

- Login dan registrasi pengguna.
- Database atau backend.
- Dashboard admin.
- Upload foto melalui server.
- Editor konten visual.
- Multi-penerima dengan database.
- Analytics dan tracking pengguna.
- Integrasi media sosial untuk posting otomatis.
- Pengiriman sertifikat langsung ke WhatsApp.

Konten dapat diubah melalui file konfigurasi dan aset lokal.

---

## 12. Definition of Done

Website dinyatakan selesai apabila:

1. Seluruh alur utama dapat dijalankan dari awal sampai akhir.
2. Data penerima konsisten di seluruh halaman.
3. Perhitungan umur dan hari berfungsi dengan benar.
4. Semua foto Gacha dapat dibuka dengan animasi.
5. Pesan utama memiliki typewriter effect dan opsi skip.
6. Sertifikat dapat diunduh sebagai PNG.
7. Confetti dan peluk virtual berfungsi.
8. Tampilan responsif dan tidak memiliki bug kritis.
9. Website berhasil di-build dan siap di-deploy.
10. Seluruh aset dapat diganti melalui konfigurasi tanpa mengubah logika inti.

**Final Product Goal:** Sebuah website hadiah ulang tahun yang terasa personal, interaktif, menyenangkan, dan layak dibagikan sebagai kenang-kenangan digital.

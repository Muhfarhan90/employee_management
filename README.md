# 📂 Aplikasi Manajemen Karyawan

Aplikasi ini adalah **sistem manajemen karyawan** berbasis web untuk mempermudah pengelolaan data karyawan, kehadiran, dan perhitungan gaji. Dibangun menggunakan **Laravel** sebagai backend dan **Inertia.js + React** sebagai frontend.

---

## ✨ Fitur Utama

### 🧑‍💼 Manajemen Karyawan
- **Tambah karyawan baru** (nama, email, alamat, telepon, foto profil)
- **Edit data karyawan**
- **Hapus data karyawan**
- Tampilan daftar karyawan lengkap

---

### 📅 Kehadiran Karyawan
- **Input presensi karyawan** (tanggal masuk, jam masuk, jam keluar)
- Hitung **keterlambatan** dan **pulang cepat** secara otomatis
- Fitur CRUD untuk data presensi

---

### 💰 Perhitungan Gaji
- Perhitungan gaji karyawan per periode (`month`, `year`)
- Komponen perhitungan:
  - Gaji pokok
  - Bonus (otomatis dikurangi denda keterlambatan dan pulang cepat)
  - Potongan (BPJS, JP, pinjaman)
- Fitur **Simulasi perhitungan gaji** untuk melihat hasil sebelum disimpan
- Fitur **CRUD data gaji** untuk menyimpan, edit, dan hapus gaji karyawan

---

## 🧠 Fitur Tambahan
- **Autentikasi & Autentorisasi** (Laravel Breeze + Inertia.js)
- Desain responsive dan dark mode menggunakan **Tailwind CSS**
- Form validasi sisi server dan sisi klien
- Struktur kode rapi dan mudah dikembangkan

---

## ⚙️ Instalasi & Setup

1. Clone repositori:
    ```bash
    git clone https://github.com/user/employee-management.git
    cd employee-management
    ```

2. Install dependency PHP & NPM:
    ```bash
    composer install
    npm install
    ```

3. Salin file `.env` dan sesuaikan konfigurasi database:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. Jalankan migrasi dan seed data:
    ```bash
    php artisan migrate --seed
    ```

5. Jalankan server:
    ```bash
    php artisan serve
    npm run dev
    ```

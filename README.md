# UjikomIsmaHaa
# Aplikasi Pemesanan Tiket Travel

Project ini adalah sistem pemesanan tiket travel sederhana yang terdiri dari:

- Backend: ElysiaJS (Bun/Node) + Prisma + SQLite
- Frontend: React + TypeScript
- Fitur: kelola layanan, pelanggan, pemesanan, transaksi, dan unduh PDF bukti pembayaran

---

## Fitur Utama

- Manajemen **Layanan Travel**  
  Tambah, ubah data rute, jadwal berangkat, harga tiket, dan stok kursi.

- Manajemen **Pelanggan**  
  Simpan data pelanggan (nama, no HP, email).

- **Pemesanan Tiket**  
  - Halaman pelanggan: pilih layanan, isi data, dan pesan kursi.  
  - Stok kursi otomatis berkurang saat pemesanan berhasil.

- **Transaksi Pembayaran**  
  - Catat pembayaran untuk pemesanan.  
  - Status pemesanan berubah menjadi `LUNAS`.  
  - Generate & unduh **PDF bukti pembayaran** (jsPDF).

- **Dashboard Admin**  
  - Lihat daftar layanan, pelanggan, pemesanan, dan riwayat transaksi.  
  - CRUD sederhana untuk layanan dan pelanggan.

---

## Teknologi yang Digunakan

- Backend:
  - [ElysiaJS](https://elysiajs.com) [web:515]
  - [Prisma ORM](https://www.prisma.io/) [web:482]
  - SQLite (default Prisma)

- Frontend:
  - React + TypeScript
  - Fetch API untuk komunikasi dengan backend
  - jsPDF untuk generate PDF invoice [web:630]

---

## Cara Menjalankan

### 1. Clone & Install

```bash
# clone repo
git clone <url-repo-kamu>
cd <nama-folder-repo>

cd backend
npm install
# atau bun install (kalau pakai Bun)

cd frontend
npm install

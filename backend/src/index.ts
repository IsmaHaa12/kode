import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { layananController } from './routes/layanan.route';
import { pelangganController } from './routes/pelanggan.route';
import { pemesananController } from './routes/pemesanan.route';
import { authController } from './routes/auth.route';
import { transaksiController } from './routes/transaksi.route';

const app = new Elysia()
  .use(cors())
  .onError(({ code, error, set }) => {
    if (code === 'VALIDATION') {
      set.status = 400;
      return {
        message: 'Data yang dikirim tidak valid, periksa kembali isian form.',
        detail: error.message,
      };
    }

    set.status = 500;
    return {
      message: 'Terjadi kesalahan pada server. Silakan coba lagi atau hubungi admin.',
    };
  })
  .use(layananController)
  .use(pelangganController)
  .use(pemesananController)
  .use(authController)
  .use(transaksiController) // ← tambahin ini
  .get('/', () => ({
    message: 'API Pemesanan Tiket Travel',
  }))
  .listen(3000);

console.log('🦊 Backend Elysia jalan di http://localhost:3000');

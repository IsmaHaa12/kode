// src/routes/transaksi.route.ts
import { Elysia, t } from 'elysia';
import { prisma } from '../db';

export const transaksiController = (app: Elysia) =>
  app
    .get('/transaksi', async () => {
      return prisma.tbTransaksi.findMany({
        include: {
          pemesanan: {
            include: {
              layanan: true,
              pelanggan: true,
            },
          },
        },
        orderBy: { tglTransaksi: 'desc' },
      });
    })
    .post(
      '/transaksi',
      async ({ body, set }) => {
        try {
          const pemesanan = await prisma.tbPemesanan.findUnique({
            where: { idPemesanan: body.idPemesanan },
          });

          if (!pemesanan) {
            set.status = 400;
            return { message: 'Pemesanan tidak ditemukan' };
          }

          if (body.jumlahBayar <= 0) {
            set.status = 400;
            return { message: 'Jumlah bayar harus lebih dari 0' };
          }

          const transaksi = await prisma.tbTransaksi.create({
            data: {
              idPemesanan: body.idPemesanan,
              jumlahBayar: body.jumlahBayar,
              metodeBayar: body.metodeBayar,
              tglTransaksi: new Date(),
            },
          });

          await prisma.tbPemesanan.update({
            where: { idPemesanan: body.idPemesanan },
            data: { status: 'LUNAS' },
          });

          return transaksi;
        } catch (err: any) {
          set.status = 500;
          return { message: 'Gagal membuat transaksi', detail: err?.message };
        }
      },
      {
        body: t.Object({
          idPemesanan: t.Number(),
          jumlahBayar: t.Number(),
          metodeBayar: t.String(),
        }),
      },
    );

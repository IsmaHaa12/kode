import { prisma } from '../db';

export class TransaksiService {
  async create(data: {
    idPemesanan: number;
    jumlahBayar: number;
    metodeBayar: string;
  }) {
    // cek pemesanan ada
    const pemesanan = await prisma.tbPemesanan.findUnique({
      where: { idPemesanan: data.idPemesanan },
    });

    if (!pemesanan) {
      throw new Error('Pemesanan tidak ditemukan');
    }

    if (data.jumlahBayar <= 0) {
      throw new Error('Jumlah bayar harus lebih dari 0');
    }

    const transaksi = await prisma.tbTransaksi.create({
      data: {
        idPemesanan: data.idPemesanan,
        jumlahBayar: data.jumlahBayar,
        metodeBayar: data.metodeBayar,
        tglTransaksi: new Date(),
      },
    });

    // opsional: update status pemesanan jadi LUNAS
    await prisma.tbPemesanan.update({
      where: { idPemesanan: data.idPemesanan },
      data: { status: 'LUNAS' },
    });

    return transaksi;
  }

  async findAll() {
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
  }

  async findById(id: number) {
    return prisma.tbTransaksi.findUnique({
      where: { idTransaksi: id },
      include: {
        pemesanan: {
          include: {
            layanan: true,
            pelanggan: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return prisma.tbTransaksi.delete({
      where: { idTransaksi: id },
    });
  }
}

export const transaksiService = new TransaksiService();

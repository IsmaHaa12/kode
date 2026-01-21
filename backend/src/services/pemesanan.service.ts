import { prisma } from '../db';

export class PemesananService {
  async create(data: {
    idLayanan: number;
    idPelanggan: number;
    jumlahKursi: number;
  }) {
    const layanan = await prisma.masterLayanan.findUnique({
      where: { idLayanan: data.idLayanan },
    });

    if (!layanan) {
      throw new Error('Layanan tidak ditemukan');
    }

    if (data.jumlahKursi <= 0) {
      throw new Error('Jumlah kursi harus lebih dari 0');
    }

    if (layanan.stokKursi < data.jumlahKursi) {
      throw new Error('Stok kursi tidak mencukupi');
    }

    const totalBiaya = layanan.hargaTiket * data.jumlahKursi;

    return prisma.$transaction(async (tx) => {
      const pemesanan = await tx.tbPemesanan.create({
        data: {
          idLayanan: data.idLayanan,
          idPelanggan: data.idPelanggan,
          jumlahKursi: data.jumlahKursi,
          totalBiaya,
          status: 'DIBOOKING',
        },
      });

      await tx.masterLayanan.update({
        where: { idLayanan: data.idLayanan },
        data: {
          stokKursi: {
            decrement: data.jumlahKursi,
          },
        },
      });

      return pemesanan;
    });
  }

  async findAll() {
    return prisma.tbPemesanan.findMany({
      include: {
        layanan: true,
        pelanggan: true,
      },
      orderBy: { tglPemesanan: 'desc' },
    });
  }

  async findById(id: number) {
    return prisma.tbPemesanan.findUnique({
      where: { idPemesanan: id },
      include: {
        layanan: true,
        pelanggan: true,
        transaksi: true,
      },
    });
  }

  async updateStatus(id: number, status: string) {
    return prisma.tbPemesanan.update({
      where: { idPemesanan: id },
      data: { status },
    });
  }

  async delete(id: number) {
    await prisma.tbTransaksi.deleteMany({
      where: { idPemesanan: id },
    });

    const pemesanan = await prisma.tbPemesanan.delete({
      where: { idPemesanan: id },
    });

    await prisma.masterLayanan.update({
      where: { idLayanan: pemesanan.idLayanan },
      data: {
        stokKursi: {
          increment: pemesanan.jumlahKursi,
        },
      },
    });

    return pemesanan;
  }
}

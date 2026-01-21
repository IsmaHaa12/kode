import { prisma } from '../db';

export class LayananService {
  async create(data: {
    namaLayanan: string;
    rute: string;
    jadwalBerangkat: string;
    hargaTiket: number;
    stokKursi: number;
  }) {
    if (!data.namaLayanan || !data.rute) {
      throw new Error('Nama layanan dan rute wajib diisi');
    }

    return prisma.masterLayanan.create({
      data: {
        namaLayanan: data.namaLayanan,
        rute: data.rute,
        jadwalBerangkat: data.jadwalBerangkat,
        hargaTiket: data.hargaTiket,
        stokKursi: data.stokKursi,
      },
    });
  }

  async findAll() {
    return prisma.masterLayanan.findMany();
  }

  async update(
    id: number,
    data: Partial<{
      namaLayanan: string;
      rute: string;
      jadwalBerangkat: string;
      hargaTiket: number;
      stokKursi: number;
    }>,
  ) {
    return prisma.masterLayanan.update({
      where: { idLayanan: id },
      data: {
        ...data,
      },
    });
  }

  async delete(id: number) {
    return prisma.masterLayanan.delete({ where: { idLayanan: id } });
  }

  async search(keyword: string) {
    return prisma.masterLayanan.findMany({
      where: {
        OR: [
          { namaLayanan: { contains: keyword } },
          { rute: { contains: keyword } },
        ],
      },
    });
  }
}

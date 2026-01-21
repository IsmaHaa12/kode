import { prisma } from '../db';

export class PelangganService {
  async create(data: {
    namaPelanggan: string;
    noHp?: string;
    email?: string;
  }) {
    if (!data.namaPelanggan) {
      throw new Error('Nama pelanggan wajib diisi');
    }

    return prisma.tbPelanggan.create({
      data: {
        namaPelanggan: data.namaPelanggan,
        noHp: data.noHp,
        email: data.email,
      },
    });
  }

  async findAll() {
    return prisma.tbPelanggan.findMany({
      orderBy: { idPelanggan: 'asc' },
    });
  }

  async findById(id: number) {
    return prisma.tbPelanggan.findUnique({
      where: { idPelanggan: id },
    });
  }

  async update(
    id: number,
    data: Partial<{
      namaPelanggan: string;
      noHp: string;
      email: string;
    }>,
  ) {
    return prisma.tbPelanggan.update({
      where: { idPelanggan: id },
      data,
    });
  }

  async delete(id: number) {
    // opsional: hapus juga pemesanan terkait
    await prisma.tbPemesanan.deleteMany({
      where: { idPelanggan: id },
    });

    return prisma.tbPelanggan.delete({
      where: { idPelanggan: id },
    });
  }
}

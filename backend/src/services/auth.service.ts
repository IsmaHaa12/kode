// src/services/auth.service.ts
import { prisma } from '../db';

export class AuthService {
  async login(data: { username: string; password: string }) {
    if (!data.username || !data.password) {
      throw new Error('Username dan password wajib diisi');
    }

    const user = await prisma.user.findUnique({
      where: { username: data.username },
    });

    if (!user) {
      throw new Error('Username atau password salah');
    }

    const ok = await Bun.password.verify(
      data.password,
      user.passwordHash,
      'bcrypt',
    );

    if (!ok) {
      throw new Error('Username atau password salah');
    }

    return {
      id: user.id,
      nama: user.nama,
      role: user.role,
    };
  }
}

// src/routes/auth.route.ts
import { Elysia, t } from 'elysia';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export const authController = new Elysia({ prefix: '/auth' })
  .post(
    '/login',
    async ({ body }) => {
      const user = await authService.login(body);
      return { success: true, data: user };
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    },
  );

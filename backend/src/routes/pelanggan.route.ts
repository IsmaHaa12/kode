import { Elysia, t } from 'elysia';
import { PelangganService } from '../services/pelanggan.service';

const pelangganService = new PelangganService();

export const pelangganController = new Elysia({ prefix: '/pelanggan' })
  .get('/', async () => {
    return pelangganService.findAll();
  })
  .get(
    '/:id',
    async ({ params }) => {
      const id = Number(params.id);
      return pelangganService.findById(id);
    },
    {
      params: t.Object({ id: t.String() }),
    },
  )
  .post(
    '/',
    async ({ body }) => {
      return pelangganService.create(body);
    },
    {
      body: t.Object({
        namaPelanggan: t.String(),
        noHp: t.Optional(t.String()),
        email: t.Optional(t.String()),
      }),
    },
  )
  .put(
    '/:id',
    async ({ params, body }) => {
      const id = Number(params.id);
      return pelangganService.update(id, body);
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Partial(
        t.Object({
          namaPelanggan: t.String(),
          noHp: t.String(),
          email: t.String(),
        }),
      ),
    },
  )
  .delete(
    '/:id',
    async ({ params }) => {
      const id = Number(params.id);
      await pelangganService.delete(id);
      return { success: true };
    },
    {
      params: t.Object({ id: t.String() }),
    },
  );

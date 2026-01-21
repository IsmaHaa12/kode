import { Elysia, t } from 'elysia';
import { LayananService } from '../services/layanan.service';

const layananService = new LayananService();

export const layananController = new Elysia({ prefix: '/layanan' })
  .get('/', async () => {
    return layananService.findAll();
  })
  .get('/search', async ({ query }) => {
    const keyword = (query.q as string) ?? '';
    return layananService.search(keyword);
  })
  .post(
    '/',
    async ({ body }) => {
      return layananService.create(body);
    },
    {
      body: t.Object({
        namaLayanan: t.String(),
        rute: t.String(),
        jadwalBerangkat: t.String(),
        hargaTiket: t.Number(),
        stokKursi: t.Number(),
      }),
    },
  )
  .put(
    '/:id',
    async ({ params, body }) => {
      const id = Number(params.id);
      return layananService.update(id, body);
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Object({
        rute: t.String(),
        namaLayanan: t.String(),
        hargaTiket: t.Number(),
        jadwalBerangkat: t.String(),
        stokKursi: t.Number(),
      }),
    },
  )
  .delete(
    '/:id',
    async ({ params }) => {
      const id = Number(params.id);
      await layananService.delete(id);
      return { success: true };
    },
    {
      params: t.Object({ id: t.String() }),
    },
  );

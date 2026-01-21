import { Elysia, t } from 'elysia';
import { PemesananService } from '../services/pemesanan.service';

const pemesananService = new PemesananService();

export const pemesananController = new Elysia({ prefix: '/pemesanan' })
  .get('/', () => pemesananService.findAll())
  .get(
    '/:id',
    ({ params }) => pemesananService.findById(Number(params.id)),
    { params: t.Object({ id: t.String() }) }
  )
  .post(
    '/',
    ({ body }) =>
      pemesananService.create({
        idLayanan: body.idLayanan,
        idPelanggan: body.idPelanggan,
        jumlahKursi: body.jumlahKursi,
      }),
    {
      body: t.Object({
        idLayanan: t.Number(),
        idPelanggan: t.Number(),
        jumlahKursi: t.Number(),
      }),
    },
  );

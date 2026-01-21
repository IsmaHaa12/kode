// src/PelangganPage.tsx
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000';

interface Layanan {
  idLayanan: number;
  namaLayanan: string;
  rute: string;
  jadwalBerangkat: string;
  hargaTiket: number;
}

interface PemesananResponse {
  idPemesanan?: number;
  message?: string;
  totalBiaya?: number;
}

interface PelangganPageProps {
  onLogout: () => void;
}

// --- API helpers: SAMA endpoint dengan admin ---
async function getLayanan() {
  const res = await fetch(`${API_URL}/layanan`);
  return res.json();
}

async function createPemesanan(body: {
  idLayanan: number;
  idPelanggan: number;
  jumlahKursi: number;
}): Promise<PemesananResponse> {
  const res = await fetch(`${API_URL}/pemesanan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

const PelangganPage: React.FC<PelangganPageProps> = ({ onLogout }) => {
  const [layanan, setLayanan] = useState<Layanan[]>([]);
  const [selectedLayananId, setSelectedLayananId] = useState<number>(0);
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [noHp, setNoHp] = useState('');
  const [email, setEmail] = useState('');
  const [jumlahKursi, setJumlahKursi] = useState(1);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getLayanan();
        setLayanan(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setMsg('Gagal memuat layanan, coba refresh.');
      }
    })();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');

    if (!selectedLayananId || !namaPelanggan || !noHp || jumlahKursi <= 0) {
      setMsg('Lengkapi semua data dan pilih layanan.');
      return;
    }

    // NOTE: sementara hardcode idPelanggan = 1
    // Pastikan di TbPelanggan ada baris dengan idPelanggan = 1.
    const idPelangganTetap = 1;

    setLoading(true);
    try {
      const res = await createPemesanan({
        idLayanan: selectedLayananId,
        idPelanggan: idPelangganTetap,
        jumlahKursi: Number(jumlahKursi),
      });

      if (res.idPemesanan) {
        setMsg(
          `Pemesanan berhasil! ID: ${res.idPemesanan} · Total: Rp ${res.totalBiaya?.toLocaleString(
            'id-ID',
          )}`,
        );
        setSelectedLayananId(0);
        setNamaPelanggan('');
        setNoHp('');
        setEmail('');
        setJumlahKursi(1);
      } else {
        setMsg(res.message || 'Pemesanan gagal.');
      }
    } catch (err) {
      console.error(err);
      setMsg('Terjadi kesalahan pada server.');
    } finally {
      setLoading(false);
    }
  }

  const selectedLayanan = layanan.find(l => l.idLayanan === selectedLayananId);
  const perkiraanTotal =
    selectedLayanan && jumlahKursi > 0
      ? selectedLayanan.hargaTiket * jumlahKursi
      : 0;

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'radial-gradient(circle at top, #111827 0, #020617 60%)',
        color: 'white',
        padding: '24px 32px',
        boxSizing: 'border-box',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <header
        style={{
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700 }}>Halaman Pelanggan</h1>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>
            Pilih layanan travel dan lakukan pemesanan tiket.
          </p>
        </div>

        <button
          onClick={onLogout}
          style={{
            padding: '6px 12px',
            borderRadius: 999,
            border: '1px solid #4b5563',
            background: 'transparent',
            color: '#e5e7eb',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Keluar
        </button>
      </header>

      {msg && (
        <div
          style={{
            marginBottom: 16,
            padding: '8px 12px',
            borderRadius: 10,
            background: 'rgba(59,130,246,0.12)',
            border: '1px solid rgba(59,130,246,0.5)',
            fontSize: 12,
          }}
        >
          {msg}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: 16,
          alignItems: 'flex-start',
        }}
      >
        {/* Form Pemesanan */}
        <section
          style={{
            padding: 16,
            borderRadius: 16,
            background: 'rgba(15,23,42,0.9)',
            border: '1px solid rgba(148,163,184,0.18)',
            boxShadow: '0 18px 45px rgba(15,23,42,0.8)',
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Form Pemesanan
          </h2>
          <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 12 }}>
            Isi data diri dan pilih layanan yang ingin dipesan.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#9ca3af',
                  marginBottom: 4,
                }}
              >
                Nama lengkap
              </div>
              <input
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 999,
                  border: '1px solid #374151',
                  background: '#020617',
                  color: 'white',
                  fontSize: 13,
                }}
                value={namaPelanggan}
                onChange={e => setNamaPelanggan(e.target.value)}
              />
            </div>

            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#9ca3af',
                  marginBottom: 4,
                }}
              >
                No HP
              </div>
              <input
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 999,
                  border: '1px solid #374151',
                  background: '#020617',
                  color: 'white',
                  fontSize: 13,
                }}
                value={noHp}
                onChange={e => setNoHp(e.target.value)}
              />
            </div>

            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#9ca3af',
                  marginBottom: 4,
                }}
              >
                Email (opsional)
              </div>
              <input
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 999,
                  border: '1px solid #374151',
                  background: '#020617',
                  color: 'white',
                  fontSize: 13,
                }}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#9ca3af',
                  marginBottom: 4,
                }}
              >
                Layanan
              </div>
              <select
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 999,
                  border: '1px solid #374151',
                  background: '#020617',
                  color: 'white',
                  fontSize: 13,
                }}
                value={selectedLayananId}
                onChange={e => setSelectedLayananId(Number(e.target.value))}
              >
                <option value={0}>Pilih layanan</option>
                {layanan.map(l => (
                  <option key={l.idLayanan} value={l.idLayanan}>
                    {l.namaLayanan} — {l.rute}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#9ca3af',
                  marginBottom: 4,
                }}
              >
                Jumlah kursi
              </div>
              <input
                type="number"
                min={1}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 999,
                  border: '1px solid #374151',
                  background: '#020617',
                  color: 'white',
                  fontSize: 13,
                }}
                value={jumlahKursi}
                onChange={e => setJumlahKursi(Number(e.target.value))}
              />
            </div>

            {selectedLayanan && (
              <div
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  color: '#9ca3af',
                }}
              >
                Harga per kursi: Rp{' '}
                {selectedLayanan.hargaTiket.toLocaleString('id-ID')} · Perkiraan
                total: Rp {perkiraanTotal.toLocaleString('id-ID')}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 8,
                padding: '8px 16px',
                borderRadius: 999,
                border: 'none',
                background:
                  'linear-gradient(135deg, rgb(59,130,246), rgb(147,51,234))',
                color: 'white',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Memproses...' : 'Pesan Sekarang'}
            </button>
          </form>
        </section>

        {/* Daftar layanan */}
        <section
          style={{
            padding: 16,
            borderRadius: 16,
            background: 'rgba(15,23,42,0.9)',
            border: '1px solid rgba(148,163,184,0.18)',
            boxShadow: '0 18px 45px rgba(15,23,42,0.8)',
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Daftar Layanan
          </h2>
          <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 12 }}>
            Klik pada pilihan di form untuk memilih layanan.
          </p>

          <ul style={{ paddingLeft: 18, margin: 0, fontSize: 13 }}>
            {layanan.map(l => (
              <li key={l.idLayanan} style={{ marginBottom: 4 }}>
                [{l.idLayanan}] {l.namaLayanan} · {l.rute} · {l.jadwalBerangkat} · Rp{' '}
                {l.hargaTiket.toLocaleString('id-ID')}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PelangganPage;

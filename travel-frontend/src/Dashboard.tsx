// src/Dashboard.tsx
import { useEffect, useState, type CSSProperties } from 'react';
import { generateInvoicePDF } from './utils/generateInvoicePDF';

const API_URL = 'http://localhost:3000';

interface Layanan {
  idLayanan: number;
  namaLayanan: string;
  rute: string;
  jadwalBerangkat: string;
  hargaTiket: number;
  stokKursi: number;
}

interface Pelanggan {
  idPelanggan: number;
  namaPelanggan: string;
  noHp: string;
  email: string;
}

interface Pemesanan {
  idPemesanan: number;
  idLayanan: number;
  idPelanggan: number;
  jumlahKursi: number;
  totalBiaya: number;
  status: string;
  layanan?: Layanan;
  pelanggan?: Pelanggan;
}

interface Transaksi {
  idTransaksi: number;
  idPemesanan: number;
  jumlahBayar: number;
  metodeBayar: string;
  tglTransaksi: string;
  pemesanan?: Pemesanan;
}

interface DashboardProps {
  onBack: () => void;
}

// ---------- API helpers ----------
async function getLayanan() {
  const res = await fetch(`${API_URL}/layanan`);
  return res.json();
}

async function createLayanan(body: {
  namaLayanan: string;
  rute: string;
  jadwalBerangkat: string;
  hargaTiket: number;
  stokKursi: number;
}) {
  const res = await fetch(`${API_URL}/layanan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function updateLayanan(
  id: number,
  body: {
    namaLayanan: string;
    rute: string;
    jadwalBerangkat: string;
    hargaTiket: number;
    stokKursi: number;
  },
) {
  const res = await fetch(`${API_URL}/layanan/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function getPelanggan() {
  const res = await fetch(`${API_URL}/pelanggan`);
  return res.json();
}

async function createPelanggan(body: {
  namaPelanggan: string;
  noHp: string;
  email: string;
}) {
  const res = await fetch(`${API_URL}/pelanggan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function updatePelanggan(
  id: number,
  body: {
    namaPelanggan: string;
    noHp: string;
    email: string;
  },
) {
  const res = await fetch(`${API_URL}/pelanggan/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function getPemesanan() {
  const res = await fetch(`${API_URL}/pemesanan`);
  return res.json();
}

async function createPemesanan(body: {
  idLayanan: number;
  idPelanggan: number;
  jumlahKursi: number;
}) {
  const res = await fetch(`${API_URL}/pemesanan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function updatePemesanan(
  id: number,
  body: {
    idLayanan: number;
    idPelanggan: number;
    jumlahKursi: number;
  },
) {
  const res = await fetch(`${API_URL}/pemesanan/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function getTransaksi() {
  const res = await fetch(`${API_URL}/transaksi`);
  return res.json();
}

async function createTransaksi(body: {
  idPemesanan: number;
  jumlahBayar: number;
  metodeBayar: string;
}) {
  const res = await fetch(`${API_URL}/transaksi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

// ---------- Reusable styles ----------
const cardStyle: CSSProperties = {
  marginBottom: 24,
  padding: 16,
  borderRadius: 16,
  background: 'rgba(15,23,42,0.9)',
  border: '1px solid rgba(148,163,184,0.18)',
  boxShadow: '0 18px 45px rgba(15,23,42,0.8)',
};

const sectionTitle: CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
};

const sectionDesc: CSSProperties = {
  fontSize: 12,
  color: '#9ca3af',
};

const labelStyle: CSSProperties = {
  fontSize: 12,
  color: '#9ca3af',
  marginBottom: 4,
};

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  borderRadius: 999,
  border: '1px solid #374151',
  background: '#020617',
  color: 'white',
  fontSize: 13,
};

const selectStyle: CSSProperties = {
  ...inputStyle,
};

const buttonPrimary: CSSProperties = {
  padding: '8px 16px',
  borderRadius: 999,
  border: 'none',
  background: 'linear-gradient(135deg, rgb(59,130,246), rgb(147,51,234))',
  color: 'white',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 8px 20px rgba(59,130,246,0.45)',
};

const smallActionButton: CSSProperties = {
  padding: '2px 8px',
  borderRadius: 999,
  border: '1px solid #3b82f6',
  background: 'transparent',
  color: '#bfdbfe',
  fontSize: 11,
  cursor: 'pointer',
};

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [layanan, setLayanan] = useState<Layanan[]>([]);
  const [pelanggan, setPelanggan] = useState<Pelanggan[]>([]);
  const [pemesanan, setPemesanan] = useState<Pemesanan[]>([]);
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [msg, setMsg] = useState<string>('');

  const [formLayanan, setFormLayanan] = useState({
    namaLayanan: '',
    rute: '',
    jadwalBerangkat: '',
    hargaTiket: 0,
    stokKursi: 0,
  });
  const [editingLayananId, setEditingLayananId] = useState<number | null>(null);

  const [formPelanggan, setFormPelanggan] = useState({
    namaPelanggan: '',
    noHp: '',
    email: '',
  });
  const [editingPelangganId, setEditingPelangganId] = useState<number | null>(null);

  const [formPemesanan, setFormPemesanan] = useState({
    idLayanan: 0,
    idPelanggan: 0,
    jumlahKursi: 1,
  });
  const [editingPemesananId, setEditingPemesananId] = useState<number | null>(null);

  const [formTransaksi, setFormTransaksi] = useState({
    idPemesanan: 0,
    jumlahBayar: 0,
    metodeBayar: '',
  });

  async function refreshAll() {
    try {
      const [l, p, pm, tr] = await Promise.all([
        getLayanan(),
        getPelanggan(),
        getPemesanan(),
        getTransaksi(),
      ]);

      setLayanan(Array.isArray(l) ? l : []);
      setPelanggan(Array.isArray(p) ? p : []);
      setPemesanan(Array.isArray(pm) ? pm : []);
      setTransaksi(Array.isArray(tr) ? tr : []);
    } catch (e) {
      console.error(e);
      setMsg('Gagal memuat data, cek backend.');
    }
  }

  useEffect(() => {
    (async () => {
      await refreshAll();
    })();
  }, []);

  // -------- LAYANAN --------
  async function handleSubmitLayanan(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');

    let res;
    if (editingLayananId === null) {
      res = await createLayanan(formLayanan);
    } else {
      res = await updateLayanan(editingLayananId, formLayanan);
    }

    if (res.message && !res.idLayanan) setMsg(res.message);

    setFormLayanan({
      namaLayanan: '',
      rute: '',
      jadwalBerangkat: '',
      hargaTiket: 0,
      stokKursi: 0,
    });
    setEditingLayananId(null);
    await refreshAll();
  }

  function handleEditLayanan(l: Layanan) {
    setEditingLayananId(l.idLayanan);
    setFormLayanan({
      namaLayanan: l.namaLayanan,
      rute: l.rute,
      jadwalBerangkat: l.jadwalBerangkat,
      hargaTiket: l.hargaTiket,
      stokKursi: l.stokKursi,
    });
  }

  // -------- PELANGGAN --------
  async function handleSubmitPelanggan(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');

    let res;
    if (editingPelangganId === null) {
      res = await createPelanggan(formPelanggan);
    } else {
      res = await updatePelanggan(editingPelangganId, formPelanggan);
    }

    if (res.message && !res.idPelanggan) setMsg(res.message);

    setFormPelanggan({
      namaPelanggan: '',
      noHp: '',
      email: '',
    });
    setEditingPelangganId(null);
    await refreshAll();
  }

  function handleEditPelanggan(p: Pelanggan) {
    setEditingPelangganId(p.idPelanggan);
    setFormPelanggan({
      namaPelanggan: p.namaPelanggan,
      noHp: p.noHp,
      email: p.email,
    });
  }

  // -------- PEMESANAN --------
  async function handleSubmitPemesanan(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');

    const payload = {
      idLayanan: Number(formPemesanan.idLayanan),
      idPelanggan: Number(formPemesanan.idPelanggan),
      jumlahKursi: Number(formPemesanan.jumlahKursi),
    };

    let res;
    if (editingPemesananId === null) {
      res = await createPemesanan(payload);
    } else {
      res = await updatePemesanan(editingPemesananId, payload);
    }

    if (res.message && !res.idPemesanan) setMsg(res.message);

    setFormPemesanan({
      idLayanan: 0,
      idPelanggan: 0,
      jumlahKursi: 1,
    });
    setEditingPemesananId(null);
    await refreshAll();
  }

  function handleEditPemesanan(pm: Pemesanan) {
    setEditingPemesananId(pm.idPemesanan);
    setFormPemesanan({
      idLayanan: pm.idLayanan,
      idPelanggan: pm.idPelanggan,
      jumlahKursi: pm.jumlahKursi,
    });
  }

  // -------- TRANSAKSI --------
  async function handleSubmitTransaksi(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');

    if (!formTransaksi.idPemesanan || !formTransaksi.jumlahBayar || !formTransaksi.metodeBayar) {
      setMsg('Semua field transaksi harus diisi.');
      return;
    }

    try {
      const res = await createTransaksi({
        idPemesanan: Number(formTransaksi.idPemesanan),
        jumlahBayar: Number(formTransaksi.jumlahBayar),
        metodeBayar: formTransaksi.metodeBayar,
      });

      if (res.idTransaksi) {
        const pemesananData = pemesanan.find(
          pm => pm.idPemesanan === Number(formTransaksi.idPemesanan),
        );

        if (pemesananData && pemesananData.layanan && pemesananData.pelanggan) {
          await generateInvoicePDF({
            transaksiId: res.idTransaksi,
            pemesananId: pemesananData.idPemesanan,
            namaLayanan: pemesananData.layanan.namaLayanan,
            namaPelanggan: pemesananData.pelanggan.namaPelanggan,
            rute: pemesananData.layanan.rute,
            jumlahKursi: pemesananData.jumlahKursi,
            hargaSatuan: pemesananData.layanan.hargaTiket,
            jumlahBayar: Number(formTransaksi.jumlahBayar),
            metodeBayar: formTransaksi.metodeBayar,
            tanggalTransaksi: new Date().toISOString(),
          });
          setMsg('✓ Transaksi berhasil! PDF bukti pembayaran sudah diunduh.');
        } else {
          setMsg('Transaksi berhasil, tetapi data pemesanan tidak lengkap untuk membuat PDF.');
        }

        setFormTransaksi({
          idPemesanan: 0,
          jumlahBayar: 0,
          metodeBayar: '',
        });

        await refreshAll();
      } else {
        setMsg(res.message || 'Gagal membuat transaksi.');
      }
    } catch (err) {
      console.error(err);
      setMsg('Error saat membuat transaksi.');
    }
  }

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
          <h1 style={{ fontSize: 30, fontWeight: 700 }}>Travel Booking Admin</h1>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>
            Dashboard untuk mengelola layanan, pelanggan, pemesanan, dan transaksi tiket travel.
          </p>
        </div>

        <button
          onClick={onBack}
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
          ← Kembali ke Beranda
        </button>
      </header>

      {msg && (
        <div
          style={{
            marginBottom: 16,
            padding: '8px 12px',
            borderRadius: 10,
            background: 'rgba(248,113,113,0.12)',
            border: '1px solid rgba(248,113,113,0.4)',
            fontSize: 12,
          }}
        >
          {msg}
        </div>
      )}

      {/* LAYANAN */}
      <section style={cardStyle}>
        <div style={{ marginBottom: 12 }}>
          <div style={sectionTitle}>Layanan</div>
          <div style={sectionDesc}>
            Atur rute travel, jadwal berangkat, harga tiket, dan stok kursi.
          </div>
        </div>

        <form
          onSubmit={handleSubmitLayanan}
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1.4fr 1.1fr 1fr 1fr auto',
            gap: 10,
            marginBottom: 12,
          }}
        >
          <div>
            <div style={labelStyle}>Nama layanan</div>
            <input
              style={inputStyle}
              value={formLayanan.namaLayanan}
              onChange={e =>
                setFormLayanan(f => ({ ...f, namaLayanan: e.target.value }))
              }
            />
          </div>
          <div>
            <div style={labelStyle}>Rute</div>
            <input
              style={inputStyle}
              value={formLayanan.rute}
              onChange={e => setFormLayanan(f => ({ ...f, rute: e.target.value }))}
            />
          </div>
          <div>
            <div style={labelStyle}>Jadwal</div>
            <input
              style={inputStyle}
              placeholder="07:00"
              value={formLayanan.jadwalBerangkat}
              onChange={e =>
                setFormLayanan(f => ({ ...f, jadwalBerangkat: e.target.value }))
              }
            />
          </div>
          <div>
            <div style={labelStyle}>Harga</div>
            <input
              style={inputStyle}
              type="number"
              value={formLayanan.hargaTiket}
              onChange={e =>
                setFormLayanan(f => ({ ...f, hargaTiket: Number(e.target.value) }))
              }
            />
          </div>
          <div>
            <div style={labelStyle}>Stok kursi</div>
            <input
              style={inputStyle}
              type="number"
              value={formLayanan.stokKursi}
              onChange={e =>
                setFormLayanan(f => ({ ...f, stokKursi: Number(e.target.value) }))
              }
            />
          </div>
          <div style={{ alignSelf: 'flex-end', textAlign: 'right' }}>
            <button type="submit" style={buttonPrimary}>
              {editingLayananId === null ? 'Simpan' : 'Update'}
            </button>
          </div>
        </form>

        <ul style={{ paddingLeft: 18, margin: 0, fontSize: 13 }}>
          {layanan.map(l => (
            <li
              key={l.idLayanan}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span>
                [{l.idLayanan}] {l.namaLayanan} · {l.rute} · stok {l.stokKursi} · harga{' '}
                {l.hargaTiket}
              </span>
              <button
                type="button"
                style={smallActionButton}
                onClick={() => handleEditLayanan(l)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* PELANGGAN */}
      <section style={cardStyle}>
        <div style={{ marginBottom: 12 }}>
          <div style={sectionTitle}>Pelanggan</div>
          <div style={sectionDesc}>
            Data pelanggan yang akan melakukan pemesanan tiket.
          </div>
        </div>

        <form
          onSubmit={handleSubmitPelanggan}
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1.4fr 2fr auto',
            gap: 10,
            marginBottom: 12,
          }}
        >
          <div>
            <div style={labelStyle}>Nama</div>
            <input
              style={inputStyle}
              value={formPelanggan.namaPelanggan}
              onChange={e =>
                setFormPelanggan(f => ({ ...f, namaPelanggan: e.target.value }))
              }
            />
          </div>
          <div>
            <div style={labelStyle}>No HP</div>
            <input
              style={inputStyle}
              value={formPelanggan.noHp}
              onChange={e => setFormPelanggan(f => ({ ...f, noHp: e.target.value }))}
            />
          </div>
          <div>
            <div style={labelStyle}>Email</div>
            <input
              style={inputStyle}
              value={formPelanggan.email}
              onChange={e => setFormPelanggan(f => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div style={{ alignSelf: 'flex-end', textAlign: 'right' }}>
            <button type="submit" style={buttonPrimary}>
              {editingPelangganId === null ? 'Simpan' : 'Update'}
            </button>
          </div>
        </form>

        <ul style={{ paddingLeft: 18, margin: 0, fontSize: 13 }}>
          {pelanggan.map(p => (
            <li
              key={p.idPelanggan}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span>
                [{p.idPelanggan}] {p.namaPelanggan} · {p.noHp}
              </span>
              <button
                type="button"
                style={smallActionButton}
                onClick={() => handleEditPelanggan(p)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* PEMESANAN */}
      <section style={cardStyle}>
        <div style={{ marginBottom: 12 }}>
          <div style={sectionTitle}>Pemesanan</div>
          <div style={sectionDesc}>
            Pilih layanan dan pelanggan, lalu tentukan jumlah kursi yang dipesan.
          </div>
        </div>

        <form
          onSubmit={handleSubmitPemesanan}
          style={{
            display: 'grid',
            gridTemplateColumns: '2.2fr 2.2fr 1fr auto',
            gap: 10,
            marginBottom: 12,
          }}
        >
          <div>
            <div style={labelStyle}>Layanan</div>
            <select
              style={selectStyle}
              value={formPemesanan.idLayanan}
              onChange={e =>
                setFormPemesanan(f => ({
                  ...f,
                  idLayanan: Number(e.target.value),
                }))
              }
            >
              <option value={0}>Pilih layanan</option>
              {layanan.map(l => (
                <option key={l.idLayanan} value={l.idLayanan}>
                  {l.namaLayanan}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div style={labelStyle}>Pelanggan</div>
            <select
              style={selectStyle}
              value={formPemesanan.idPelanggan}
              onChange={e =>
                setFormPemesanan(f => ({
                  ...f,
                  idPelanggan: Number(e.target.value),
                }))
              }
            >
              <option value={0}>Pilih pelanggan</option>
              {pelanggan.map(p => (
                <option key={p.idPelanggan} value={p.idPelanggan}>
                  {p.namaPelanggan}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div style={labelStyle}>Jumlah kursi</div>
            <input
              style={inputStyle}
              type="number"
              value={formPemesanan.jumlahKursi}
              onChange={e =>
                setFormPemesanan(f => ({
                  ...f,
                  jumlahKursi: Number(e.target.value),
                }))
              }
            />
          </div>

          <div style={{ alignSelf: 'flex-end', textAlign: 'right' }}>
            <button
              type="submit"
              style={buttonPrimary}
              disabled={!formPemesanan.idLayanan || !formPemesanan.idPelanggan}
            >
              {editingPemesananId === null ? 'Buat' : 'Update'}
            </button>
          </div>
        </form>

        <h3 style={{ marginBottom: 8, fontSize: 14 }}>Data Pemesanan</h3>
        <div
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid #1f2937',
          }}
        >
          <table
            cellPadding={8}
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 13,
              background: '#020617',
            }}
          >
            <thead style={{ background: '#0f172a' }}>
              <tr>
                <th align="left">ID</th>
                <th align="left">Layanan</th>
                <th align="left">Pelanggan</th>
                <th align="right">Kursi</th>
                <th align="right">Total</th>
                <th align="center">Status</th>
                <th align="center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pemesanan.map(pm => (
                <tr key={pm.idPemesanan}>
                  <td>{pm.idPemesanan}</td>
                  <td>{pm.layanan?.namaLayanan}</td>
                  <td>{pm.pelanggan?.namaPelanggan}</td>
                  <td align="right">{pm.jumlahKursi}</td>
                  <td align="right">{pm.totalBiaya}</td>
                  <td align="center">{pm.status}</td>
                  <td align="center">
                    <button
                      type="button"
                      style={smallActionButton}
                      onClick={() => handleEditPemesanan(pm)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* TRANSAKSI */}
      <section style={cardStyle}>
        <div style={{ marginBottom: 12 }}>
          <div style={sectionTitle}>Transaksi</div>
          <div style={sectionDesc}>
            Catat pembayaran pemesanan. Setelah transaksi, status akan berubah dan PDF bukti pembayaran otomatis diunduh.
          </div>
        </div>

        <form
          onSubmit={handleSubmitTransaksi}
          style={{
            display: 'grid',
            gridTemplateColumns: '2.2fr 1.4fr 1.4fr auto',
            gap: 10,
            marginBottom: 12,
          }}
        >
          <div>
            <div style={labelStyle}>Pemesanan</div>
            <select
              style={selectStyle}
              value={formTransaksi.idPemesanan}
              onChange={e =>
                setFormTransaksi(f => ({
                  ...f,
                  idPemesanan: Number(e.target.value),
                }))
              }
            >
              <option value={0}>Pilih pemesanan</option>
              {pemesanan.map(pm => (
                <option key={pm.idPemesanan} value={pm.idPemesanan}>
                  #{pm.idPemesanan} - {pm.layanan?.namaLayanan} - {pm.pelanggan?.namaPelanggan}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div style={labelStyle}>Jumlah bayar</div>
            <input
              style={inputStyle}
              type="number"
              value={formTransaksi.jumlahBayar}
              onChange={e =>
                setFormTransaksi(f => ({
                  ...f,
                  jumlahBayar: Number(e.target.value),
                }))
              }
            />
          </div>

          <div>
            <div style={labelStyle}>Metode bayar</div>
            <input
              style={inputStyle}
              placeholder="Cash / Transfer / e-Wallet"
              value={formTransaksi.metodeBayar}
              onChange={e =>
                setFormTransaksi(f => ({
                  ...f,
                  metodeBayar: e.target.value,
                }))
              }
            />
          </div>

          <div style={{ alignSelf: 'flex-end', textAlign: 'right' }}>
            <button type="submit" style={buttonPrimary}>
              Simpan & Unduh PDF
            </button>
          </div>
        </form>

        <h3 style={{ marginBottom: 8, fontSize: 14 }}>Riwayat Transaksi</h3>
        <div
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid #1f2937',
          }}
        >
          <table
            cellPadding={8}
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 13,
              background: '#020617',
            }}
          >
            <thead style={{ background: '#0f172a' }}>
              <tr>
                <th align="left">ID</th>
                <th align="left">Pemesanan</th>
                <th align="right">Jumlah</th>
                <th align="left">Metode</th>
                <th align="left">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {transaksi.map(tr => (
                <tr key={tr.idTransaksi}>
                  <td>{tr.idTransaksi}</td>
                  <td>#{tr.idPemesanan}</td>
                  <td align="right">{tr.jumlahBayar}</td>
                  <td>{tr.metodeBayar}</td>
                  <td>
                    {new Date(tr.tglTransaksi).toLocaleString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

const API_URL = 'http://localhost:3000';

export async function getLayanan() {
  const res = await fetch(`${API_URL}/layanan`);
  return res.json();
}

export async function createLayanan(body: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/layanan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function getPelanggan() {
  const res = await fetch(`${API_URL}/pelanggan`);
  return res.json();
}

export async function createPelanggan(body: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/pelanggan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function createPemesanan(body: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/pemesanan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function getPemesanan() {
  const res = await fetch(`${API_URL}/pemesanan`);
  return res.json();
}

// ====== Tambahan untuk transaksi ======

export async function getTransaksi() {
  const res = await fetch(`${API_URL}/transaksi`);
  return res.json();
}

export async function createTransaksi(body: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/transaksi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

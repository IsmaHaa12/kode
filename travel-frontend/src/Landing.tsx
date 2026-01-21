// src/Landing.tsx
import React from 'react';

interface LandingProps {
  onEnterDashboard: () => void;
}

const Landing: React.FC<LandingProps> = ({ onEnterDashboard }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background:
          'radial-gradient(circle at top, #111827 0, #020617 60%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 32px',
        boxSizing: 'border-box',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: 40,
          alignItems: 'center',
        }}
      >
        <div>
          <h1 style={{ fontSize: 36, marginBottom: 12 }}>
            Kelola pemesanan travel dalam satu dashboard.
          </h1>
          <p
            style={{
              fontSize: 14,
              color: '#9ca3af',
              marginBottom: 16,
              maxWidth: 520,
            }}
          >
            Catat layanan, pelanggan, pemesanan, dan transaksi pembayaran
            dengan alur yang rapi dan terintegrasi.
          </p>
          <button
            onClick={onEnterDashboard}
            style={{
              padding: '10px 18px',
              borderRadius: 999,
              border: 'none',
              background:
                'linear-gradient(135deg, rgb(59,130,246), rgb(147,51,234))',
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(59,130,246,0.5)',
            }}
          >
            Masuk ke Booking Admin
          </button>
        </div>

        {/* Kartu ringkasan kanan boleh isi bebas */}
        <div>{/* ...optional summary card... */}</div>
      </div>
    </div>
  );
};

export default Landing;

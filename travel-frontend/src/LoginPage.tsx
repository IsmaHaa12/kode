// src/LoginPage.tsx
import React, { useState } from 'react';

type Role = 'admin' | 'pelanggan' | null;

interface LoginPageProps {
  onLogin: (role: Role) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // HARD CODE CREDENTIALS
    if (username === 'admin' && password === 'admin123') {
      onLogin('admin');
      return;
    }

    if (username === 'Hardin' && password === 'user123') {
      onLogin('pelanggan');
      return;
    }

    setError('Username atau password salah');
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at top, #111827 0, #020617 60%)',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          width: 420,
          padding: 24,
          borderRadius: 16,
          background: 'rgba(15,23,42,0.9)',
          border: '1px solid rgba(148,163,184,0.25)',
          boxShadow: '0 20px 55px rgba(15,23,42,0.9)',
        }}
      >
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>
          Login Sistem Travel
        </h1>
        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>
          Masuk menggunakan akun admin atau pelanggan (hardcode).
        </p>

        {error && (
          <div
            style={{
              marginBottom: 12,
              padding: '6px 10px',
              borderRadius: 10,
              background: 'rgba(248,113,113,0.12)',
              border: '1px solid rgba(248,113,113,0.4)',
              fontSize: 12,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                color: '#9ca3af',
                marginBottom: 4,
              }}
            >
              Username
            </label>
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
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                color: '#9ca3af',
                marginBottom: 4,
              }}
            >
              Password
            </label>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: 999,
                border: '1px solid #374151',
                background: '#020617',
                color: 'white',
                fontSize: 13,
              }}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 999,
              border: 'none',
              background:
                'linear-gradient(135deg, rgb(59,130,246), rgb(147,51,234))',
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: 8,
            }}
          >
            Login
          </button>

          <p style={{ fontSize: 11, color: '#6b7280', marginTop: 8 }}>
            Admin: admin / admin123 — Pelanggan: user / user123
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

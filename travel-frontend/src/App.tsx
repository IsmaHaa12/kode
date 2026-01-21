// src/App.tsx
import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import PelangganPage from './PelangganPage';
import LoginPage from './LoginPage';

type Role = 'admin' | 'pelanggan' | null;

function App() {
  const [role, setRole] = useState<Role>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('role') as Role | null;
    if (savedRole === 'admin' || savedRole === 'pelanggan') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRole(savedRole);
    }
  }, []);

  function handleLogin(selectedRole: Role) {
    setRole(selectedRole);
    if (selectedRole) {
      localStorage.setItem('role', selectedRole);
    } else {
      localStorage.removeItem('role');
    }
  }

  function handleLogout() {
    setRole(null);
    localStorage.removeItem('role');
  }

  if (!role) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (role === 'admin') {
    return <Dashboard onBack={handleLogout} />;
  }

  return <PelangganPage onLogout={handleLogout} />;
}

export default App;

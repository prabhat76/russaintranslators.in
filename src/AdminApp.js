import React, { useState, useEffect } from 'react';
import SimpleAdminLogin from './components/SimpleAdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function AdminApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(adminLoggedIn);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-app">
      {!isLoggedIn ? (
        <SimpleAdminLogin onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <AdminDashboard onLogout={() => {
          localStorage.removeItem('adminLoggedIn');
          setIsLoggedIn(false);
        }} />
      )}
    </div>
  );
}

export default AdminApp;
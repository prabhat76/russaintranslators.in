import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import AdminLogin from './AdminLogin';
import QuoteManager from './QuoteManager';
import AnalyticsDashboard from './AnalyticsDashboard';
import RealtimeData from './RealtimeData';
import ContentEditor from './ContentEditor';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('quotes');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) return <div>Loading...</div>;

  if (!isAdmin) {
    return (
      <div className="admin-page">
        <h1>Admin Access</h1>
        <AdminLogin onLogin={() => {}} />
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Language Liberty - Admin Dashboard</h1>
        <div className="admin-tabs">
          <button 
            className={activeTab === 'quotes' ? 'active' : ''}
            onClick={() => setActiveTab('quotes')}
          >
            Quotes
          </button>
          <button 
            className={activeTab === 'analytics' ? 'active' : ''}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button 
            className={activeTab === 'realtime' ? 'active' : ''}
            onClick={() => setActiveTab('realtime')}
          >
            Live Data
          </button>
          <button 
            className={activeTab === 'content' ? 'active' : ''}
            onClick={() => setActiveTab('content')}
          >
            Content
          </button>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      
      {activeTab === 'quotes' && <QuoteManager />}
      {activeTab === 'analytics' && <AnalyticsDashboard />}
      {activeTab === 'realtime' && <RealtimeData />}
      {activeTab === 'content' && <ContentEditor />}
    </div>
  );
};

export default AdminDashboard;
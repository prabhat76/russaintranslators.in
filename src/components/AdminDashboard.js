import React, { useState, useEffect } from 'react';
import QuoteManager from './QuoteManager';
import AnalyticsDashboard from './AnalyticsDashboard';
import RealtimeData from './RealtimeData';
import ContentEditor from './ContentEditor';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalQuotes: 0,
    pendingQuotes: 0,
    completedQuotes: 0,
    totalVisitors: 0
  });

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalQuotes: 47,
        pendingQuotes: 12,
        completedQuotes: 35,
        totalVisitors: 1247
      });
    }, 1000);
  }, []);

  const renderOverview = () => (
    <div className="admin-content">
      <div className="quick-stats">
        <div className="quick-stat">
          <div className="stat-number">{stats.totalQuotes}</div>
          <div className="stat-label">Total Quotes</div>
        </div>
        <div className="quick-stat">
          <div className="stat-number">{stats.pendingQuotes}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="quick-stat">
          <div className="stat-number">{stats.completedQuotes}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="quick-stat">
          <div className="stat-number">{stats.totalVisitors}</div>
          <div className="stat-label">Visitors</div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon">📋</div>
            <h3 className="card-title">Quote Management</h3>
          </div>
          <p>Manage customer quote requests and track project status.</p>
          <div className="action-buttons">
            <button className="action-btn primary" onClick={() => setActiveTab('quotes')}>
              View Quotes
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon">📊</div>
            <h3 className="card-title">Analytics</h3>
          </div>
          <p>Track website performance and user engagement metrics.</p>
          <div className="action-buttons">
            <button className="action-btn primary" onClick={() => setActiveTab('analytics')}>
              View Analytics
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon">⚡</div>
            <h3 className="card-title">Live Data</h3>
          </div>
          <p>Monitor real-time database activity and user interactions.</p>
          <div className="action-buttons">
            <button className="action-btn primary" onClick={() => setActiveTab('realtime')}>
              View Live Data
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon">✏️</div>
            <h3 className="card-title">Content Editor</h3>
          </div>
          <p>Edit website content and manage translations.</p>
          <div className="action-buttons">
            <button className="action-btn primary" onClick={() => setActiveTab('content')}>
              Edit Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Language Liberty Admin</h1>
        <div className="admin-tabs">
          <button 
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
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
        <button onClick={onLogout} className="logout-btn">Sign Out</button>
      </header>
      
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'quotes' && <div className="admin-content"><QuoteManager /></div>}
      {activeTab === 'analytics' && <div className="admin-content"><AnalyticsDashboard /></div>}
      {activeTab === 'realtime' && <div className="admin-content"><RealtimeData /></div>}
      {activeTab === 'content' && <div className="admin-content"><ContentEditor /></div>}
    </div>
  );
};

export default AdminDashboard;
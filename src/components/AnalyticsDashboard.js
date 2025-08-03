import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState([]);
  const [stats, setStats] = useState({
    totalVisitors: 0,
    formSubmissions: 0,
    phoneClicks: 0,
    whatsappClicks: 0,
    languageSwitches: 0
  });

  useEffect(() => {
    const q = query(collection(db, 'analytics'), orderBy('timestamp', 'desc'), limit(100));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAnalytics(data);
      
      // Calculate stats
      const uniqueUsers = new Set(data.map(item => item.userId)).size;
      const formSubs = data.filter(item => item.event === 'form_submit').length;
      const phoneCalls = data.filter(item => item.event === 'contact_attempt' && item.properties?.method === 'phone').length;
      const whatsapp = data.filter(item => item.event === 'contact_attempt' && item.properties?.method === 'whatsapp').length;
      const langSwitches = data.filter(item => item.event === 'language_switch').length;
      
      setStats({
        totalVisitors: uniqueUsers,
        formSubmissions: formSubs,
        phoneClicks: phoneCalls,
        whatsappClicks: whatsapp,
        languageSwitches: langSwitches
      });
    });
    
    return unsubscribe;
  }, []);

  return (
    <div className="analytics-dashboard">
      <h2>📊 Analytics Dashboard</h2>
      
      <div className="analytics-stats">
        <div className="stat-card">
          <h3>{stats.totalVisitors}</h3>
          <p>Unique Visitors</p>
        </div>
        <div className="stat-card">
          <h3>{stats.formSubmissions}</h3>
          <p>Form Submissions</p>
        </div>
        <div className="stat-card">
          <h3>{stats.phoneClicks}</h3>
          <p>Phone Clicks</p>
        </div>
        <div className="stat-card">
          <h3>{stats.whatsappClicks}</h3>
          <p>WhatsApp Clicks</p>
        </div>
        <div className="stat-card">
          <h3>{stats.languageSwitches}</h3>
          <p>Language Switches</p>
        </div>
      </div>
      
      <div className="analytics-events">
        <h3>Recent Events</h3>
        <div className="events-list">
          {analytics.slice(0, 20).map(event => (
            <div key={event.id} className="event-item">
              <span className="event-name">{event.event}</span>
              <span className="event-time">
                {event.timestamp?.toDate?.()?.toLocaleString() || 'Just now'}
              </span>
              <span className="event-details">
                {JSON.stringify(event.properties || {})}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
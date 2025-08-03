import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import QuoteResponse from './QuoteResponse';
import './QuoteManager.css';

const QuoteManager = () => {
  const [quotes, setQuotes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const q = query(collection(db, 'quotes'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setQuotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, 'quotes', id), { status });
  };

  const deleteQuote = async (id) => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      await deleteDoc(doc(db, 'quotes', id));
    }
  };

  const getPriority = (quote) => {
    const daysOld = (Date.now() - quote.timestamp?.toDate?.()?.getTime()) / (1000 * 60 * 60 * 24);
    if (daysOld > 7) return 'high';
    if (daysOld > 3) return 'medium';
    return 'low';
  };

  const filteredQuotes = quotes
    .filter(q => filter === 'all' || q.status === filter)
    .filter(q => 
      q.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.service?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return b.timestamp?.toDate?.()?.getTime() - a.timestamp?.toDate?.()?.getTime();
      if (sortBy === 'oldest') return a.timestamp?.toDate?.()?.getTime() - b.timestamp?.toDate?.()?.getTime();
      if (sortBy === 'name') return a.name?.localeCompare(b.name);
      return 0;
    });

  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === 'pending').length,
    contacted: quotes.filter(q => q.status === 'contacted').length,
    completed: quotes.filter(q => q.status === 'completed').length
  };

  return (
    <div className="quote-manager">
      <div className="quote-manager-header">
        <h2 className="quote-manager-title">Quote Management</h2>
        <p className="quote-manager-subtitle">Manage customer quote requests and track project status</p>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div className="quote-stats">
          <div className="quote-stat">
            <span className="quote-stat-number">{stats.total}</span>
            <span className="quote-stat-label">Total Quotes</span>
          </div>
          <div className="quote-stat">
            <span className="quote-stat-number">{stats.pending}</span>
            <span className="quote-stat-label">Pending</span>
          </div>
          <div className="quote-stat">
            <span className="quote-stat-number">{stats.contacted}</span>
            <span className="quote-stat-label">Contacted</span>
          </div>
          <div className="quote-stat">
            <span className="quote-stat-number">{stats.completed}</span>
            <span className="quote-stat-label">Completed</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search quotes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.5rem',
              border: '1px solid #ced4da',
              borderRadius: '6px',
              fontSize: '0.875rem',
              minWidth: '200px'
            }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.5rem',
              border: '1px solid #ced4da',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      <div className="quote-filters">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
          All ({stats.total})
        </button>
        <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>
          Pending ({stats.pending})
        </button>
        <button onClick={() => setFilter('contacted')} className={filter === 'contacted' ? 'active' : ''}>
          Contacted ({stats.contacted})
        </button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>
          Completed ({stats.completed})
        </button>
      </div>

      <div className="quotes-list">
        {filteredQuotes.length === 0 ? (
          <div className="empty-state">
            <h3>No quotes found</h3>
            <p>No quotes match your current filter criteria.</p>
          </div>
        ) : (
          filteredQuotes.map(quote => (
            <div key={quote.id} className={`quote-card ${quote.status || 'pending'}`}>
              <div className={`priority-badge ${getPriority(quote)}`}>
                {getPriority(quote)} priority
              </div>
              
              <div className="quote-header">
                <h4>{quote.name || 'Unknown'}</h4>
                <span className="quote-service">{quote.service || 'General'}</span>
                <span className="quote-date">
                  {quote.timestamp?.toDate?.()?.toLocaleDateString() || 'Just now'}
                </span>
              </div>
              
              <div className="quote-details">
                <p><strong>Email:</strong> {quote.email || 'Not provided'}</p>
                <p><strong>Phone:</strong> {quote.phone || 'Not provided'}</p>
                <p><strong>Language:</strong> {quote.language || 'English'}</p>
                {quote.message && (
                  <div className="quote-message">
                    <strong>Message:</strong> {quote.message}
                  </div>
                )}
              </div>

              <div className="quote-actions">
                <select 
                  value={quote.status || 'pending'} 
                  onChange={(e) => updateStatus(quote.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                </select>
                
                <button onClick={() => setSelectedQuote(quote)} className="action-btn quote">
                  Send Quote
                </button>
                {quote.phone && (
                  <a href={`tel:${quote.phone}`} className="action-btn call">
                    Call
                  </a>
                )}
                {quote.email && (
                  <a href={`mailto:${quote.email}`} className="action-btn email">
                    Email
                  </a>
                )}
                {quote.phone && (
                  <a href={`https://wa.me/${quote.phone?.replace(/[^0-9]/g, '')}`} className="action-btn whatsapp" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                )}
                <button onClick={() => deleteQuote(quote.id)} className="action-btn delete">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {selectedQuote && (
        <div className="quote-response-modal">
          <QuoteResponse 
            quote={selectedQuote} 
            onClose={() => setSelectedQuote(null)} 
          />
        </div>
      )}
    </div>
  );
};

export default QuoteManager;
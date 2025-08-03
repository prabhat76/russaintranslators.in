import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import QuoteResponse from './QuoteResponse';

const QuoteManager = () => {
  const [quotes, setQuotes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState(null);

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
    await deleteDoc(doc(db, 'quotes', id));
  };

  const filteredQuotes = quotes.filter(q => filter === 'all' || q.status === filter);

  return (
    <div className="quote-manager">
      <div className="quote-filters">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
          All ({quotes.length})
        </button>
        <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>
          Pending ({quotes.filter(q => q.status === 'pending').length})
        </button>
        <button onClick={() => setFilter('contacted')} className={filter === 'contacted' ? 'active' : ''}>
          Contacted ({quotes.filter(q => q.status === 'contacted').length})
        </button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>
          Completed ({quotes.filter(q => q.status === 'completed').length})
        </button>
      </div>

      <div className="quotes-list">
        {filteredQuotes.map(quote => (
          <div key={quote.id} className={`quote-card ${quote.status}`}>
            <div className="quote-header">
              <h4>{quote.name}</h4>
              <span className="quote-service">{quote.service}</span>
              <span className="quote-date">
                {quote.timestamp?.toDate?.()?.toLocaleDateString() || 'Just now'}
              </span>
            </div>
            
            <div className="quote-details">
              <p><strong>Email:</strong> {quote.email}</p>
              <p><strong>Phone:</strong> {quote.phone}</p>
              <p><strong>Message:</strong> {quote.message}</p>
              <p><strong>Language:</strong> {quote.language}</p>
            </div>

            <div className="quote-actions">
              <select 
                value={quote.status} 
                onChange={(e) => updateStatus(quote.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
              </select>
              
              <button onClick={() => setSelectedQuote(quote)} className="action-btn quote">💰 Send Quote</button>
              <a href={`tel:${quote.phone}`} className="action-btn call">📞 Call</a>
              <a href={`mailto:${quote.email}`} className="action-btn email">✉️ Email</a>
              <a href={`https://wa.me/${quote.phone?.replace(/[^0-9]/g, '')}`} className="action-btn whatsapp">💬 WhatsApp</a>
              <button onClick={() => deleteQuote(quote.id)} className="action-btn delete">🗑️ Delete</button>
            </div>
          </div>
        ))}
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
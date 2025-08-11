import React, { useState, useEffect } from 'react';

const QuoteManager = () => {
  const [quotes, setQuotes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading quotes data
    setTimeout(() => {
      setQuotes([
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah@company.com',
          service: 'Document Translation',
          message: 'Need legal documents translated from English to Russian.',
          status: 'pending',
          date: '2024-01-15',
          priority: 'high'
        },
        {
          id: 2,
          name: 'Michael Chen',
          email: 'michael.chen@business.com',
          service: 'Business Translation',
          message: 'Looking for marketing materials translation for Russian market.',
          status: 'in-progress',
          date: '2024-01-14',
          priority: 'medium'
        },
        {
          id: 3,
          name: 'Elena Rodriguez',
          email: 'elena@startup.io',
          service: 'Website Localization',
          message: 'Complete website localization for Russian audience.',
          status: 'completed',
          date: '2024-01-12',
          priority: 'high'
        },
        {
          id: 4,
          name: 'David Kim',
          email: 'david.kim@tech.com',
          service: 'Express Translation',
          message: 'Urgent technical documentation translation needed.',
          status: 'pending',
          date: '2024-01-16',
          priority: 'urgent'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredQuotes = quotes.filter(quote => {
    if (filter === 'all') return true;
    return quote.status === filter;
  });

  const updateQuoteStatus = (id, newStatus) => {
    setQuotes(quotes.map(quote => 
      quote.id === id ? { ...quote, status: newStatus } : quote
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#d97706';
      default: return '#65a30d';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'in-progress': return '#3b82f6';
      case 'completed': return '#10b981';
      default: return '#6b7280';
    }
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px',
        fontSize: '1.1rem',
        color: '#64748b'
      }}>
        Loading quotes...
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1e293b',
          margin: 0
        }}>
          Quote Management
        </h2>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'pending', 'in-progress', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                background: filter === status ? '#3b82f6' : '#f1f5f9',
                color: filter === status ? 'white' : '#64748b',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease'
              }}
            >
              {status === 'all' ? 'All' : status.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gap: '1rem'
      }}>
        {filteredQuotes.map(quote => (
          <div
            key={quote.id}
            style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: '0 0 0.25rem 0'
                }}>
                  {quote.name}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  margin: '0 0 0.5rem 0'
                }}>
                  {quote.email}
                </p>
                <div style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  background: '#f1f5f9',
                  color: '#475569',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  {quote.service}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  background: getPriorityColor(quote.priority),
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                }}>
                  {quote.priority}
                </span>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  background: getStatusColor(quote.status),
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  textTransform: 'capitalize'
                }}>
                  {quote.status.replace('-', ' ')}
                </span>
              </div>
            </div>

            <p style={{
              fontSize: '0.875rem',
              color: '#374151',
              lineHeight: '1.5',
              marginBottom: '1rem'
            }}>
              {quote.message}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '1rem'
            }}>
              <span style={{
                fontSize: '0.75rem',
                color: '#64748b'
              }}>
                {new Date(quote.date).toLocaleDateString()}
              </span>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {quote.status === 'pending' && (
                  <button
                    onClick={() => updateQuoteStatus(quote.id, 'in-progress')}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#2563eb'}
                    onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
                  >
                    Start Work
                  </button>
                )}
                
                {quote.status === 'in-progress' && (
                  <button
                    onClick={() => updateQuoteStatus(quote.id, 'completed')}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#059669'}
                    onMouseLeave={(e) => e.target.style.background = '#10b981'}
                  >
                    Mark Complete
                  </button>
                )}
                
                <button
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    color: '#64748b',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f8fafc';
                    e.target.style.borderColor = '#9ca3af';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = '#d1d5db';
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredQuotes.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#64748b'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
            No quotes found
          </h3>
          <p>No quotes match the current filter.</p>
        </div>
      )}
    </div>
  );
};

export default QuoteManager;

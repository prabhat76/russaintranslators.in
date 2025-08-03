import React, { useState } from 'react';

const SimpleAdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple hardcoded check
    if (credentials.email === 'prabhatprabhakr918@gmail.com' && credentials.password === 'klj206king') {
      localStorage.setItem('adminLoggedIn', 'true');
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        background: '#ffffff',
        padding: '2.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid #e9ecef'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ 
            margin: '0 0 0.5rem 0',
            color: '#1a1a1a',
            fontSize: '1.5rem',
            fontWeight: '600',
            letterSpacing: '-0.025em'
          }}>Admin Portal</h2>
          <p style={{ 
            margin: 0,
            color: '#6c757d',
            fontSize: '0.875rem'
          }}>Language Liberty Management System</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              placeholder="Email address"
              value={credentials.email}
              onChange={(e) => setCredentials(prev => ({...prev, email: e.target.value}))}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '6px',
                fontSize: '0.875rem',
                background: '#ffffff',
                transition: 'border-color 0.15s ease-in-out',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0d6efd'}
              onBlur={(e) => e.target.style.borderColor = '#ced4da'}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({...prev, password: e.target.value}))}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '6px',
                fontSize: '0.875rem',
                background: '#ffffff',
                transition: 'border-color 0.15s ease-in-out',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0d6efd'}
              onBlur={(e) => e.target.style.borderColor = '#ced4da'}
            />
          </div>
          {error && (
            <div style={{ 
              color: '#dc3545', 
              marginBottom: '1rem',
              textAlign: 'center',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#0d6efd',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease-in-out'
            }}
            onMouseEnter={(e) => e.target.style.background = '#0b5ed7'}
            onMouseLeave={(e) => e.target.style.background = '#0d6efd'}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SimpleAdminLogin;
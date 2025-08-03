import React, { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { rtdb } from '../firebase';

const RealtimeData = () => {
  const [liveData, setLiveData] = useState({
    quotes: [],
    analytics: [],
    emails: []
  });

  useEffect(() => {
    // Listen to quotes
    const quotesRef = ref(rtdb, 'quotes');
    const quotesListener = onValue(quotesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const quotesArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setLiveData(prev => ({ ...prev, quotes: quotesArray.slice(-10) }));
      }
    });

    // Listen to analytics
    const analyticsRef = ref(rtdb, 'analytics');
    const analyticsListener = onValue(analyticsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const analyticsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setLiveData(prev => ({ ...prev, analytics: analyticsArray.slice(-20) }));
      }
    });

    // Listen to emails
    const emailsRef = ref(rtdb, 'emails');
    const emailsListener = onValue(emailsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const emailsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setLiveData(prev => ({ ...prev, emails: emailsArray.slice(-10) }));
      }
    });

    return () => {
      off(quotesRef, 'value', quotesListener);
      off(analyticsRef, 'value', analyticsListener);
      off(emailsRef, 'value', emailsListener);
    };
  }, []);

  return (
    <div className="realtime-data">
      <h2>🔴 Live Data Stream</h2>
      
      <div className="realtime-sections">
        <div className="realtime-section">
          <h3>📋 Recent Quotes ({liveData.quotes.length})</h3>
          <div className="data-stream">
            {liveData.quotes.map(quote => (
              <div key={quote.id} className="stream-item">
                <strong>{quote.name}</strong> - {quote.service}
                <span className="timestamp">
                  {new Date(quote.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="realtime-section">
          <h3>📊 Live Analytics ({liveData.analytics.length})</h3>
          <div className="data-stream">
            {liveData.analytics.map(event => (
              <div key={event.id} className="stream-item">
                <strong>{event.event}</strong>
                <span className="timestamp">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="realtime-section">
          <h3>📧 Email Status ({liveData.emails.length})</h3>
          <div className="data-stream">
            {liveData.emails.map(email => (
              <div key={email.id} className="stream-item">
                <strong>{email.to}</strong> - {email.status}
                <span className="timestamp">
                  {new Date(email.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeData;
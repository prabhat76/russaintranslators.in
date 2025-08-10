import React, { useState, useEffect, useRef } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { rtdb } from '../firebase';

const RealtimeData = () => {
  const [liveData, setLiveData] = useState({
    quotes: [],
    analytics: [],
    emails: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlighted, setHighlighted] = useState({ quotes: null, analytics: null, emails: null });
  const quotesEndRef = useRef(null);
  const analyticsEndRef = useRef(null);
  const emailsEndRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Listen to quotes
    const quotesRef = ref(rtdb, 'quotes');
    const quotesListener = onValue(quotesRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const quotesArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value
          }));
          setLiveData(prev => {
            const prevIds = prev.quotes.map(q => q.id);
            const newArr = quotesArray.slice(-10);
            // Highlight if new item
            if (newArr.length && (!prevIds.length || newArr[newArr.length-1].id !== prevIds[prevIds.length-1])) {
              setHighlighted(h => ({ ...h, quotes: newArr[newArr.length-1].id }));
              setTimeout(() => setHighlighted(h => ({ ...h, quotes: null })), 1200);
            }
            return { ...prev, quotes: newArr };
          });
        }
        setLoading(false);
      } catch (e) {
        setError('Failed to load quotes');
        setLoading(false);
      }
    }, (err) => { setError('Quotes stream error'); setLoading(false); });

    // Listen to analytics
    const analyticsRef = ref(rtdb, 'analytics');
    const analyticsListener = onValue(analyticsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const analyticsArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value
          }));
          setLiveData(prev => {
            const prevIds = prev.analytics.map(a => a.id);
            const newArr = analyticsArray.slice(-20);
            if (newArr.length && (!prevIds.length || newArr[newArr.length-1].id !== prevIds[prevIds.length-1])) {
              setHighlighted(h => ({ ...h, analytics: newArr[newArr.length-1].id }));
              setTimeout(() => setHighlighted(h => ({ ...h, analytics: null })), 1200);
            }
            return { ...prev, analytics: newArr };
          });
        }
        setLoading(false);
      } catch (e) {
        setError('Failed to load analytics');
        setLoading(false);
      }
    }, (err) => { setError('Analytics stream error'); setLoading(false); });

    // Listen to emails
    const emailsRef = ref(rtdb, 'emails');
    const emailsListener = onValue(emailsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const emailsArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value
          }));
          setLiveData(prev => {
            const prevIds = prev.emails.map(e => e.id);
            const newArr = emailsArray.slice(-10);
            if (newArr.length && (!prevIds.length || newArr[newArr.length-1].id !== prevIds[prevIds.length-1])) {
              setHighlighted(h => ({ ...h, emails: newArr[newArr.length-1].id }));
              setTimeout(() => setHighlighted(h => ({ ...h, emails: null })), 1200);
            }
            return { ...prev, emails: newArr };
          });
        }
        setLoading(false);
      } catch (e) {
        setError('Failed to load emails');
        setLoading(false);
      }
    }, (err) => { setError('Emails stream error'); setLoading(false); });

    return () => {
      off(quotesRef, 'value', quotesListener);
      off(analyticsRef, 'value', analyticsListener);
      off(emailsRef, 'value', emailsListener);
    };
  }, []);

  // Auto-scroll to newest item
  useEffect(() => {
    if (quotesEndRef.current) quotesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    if (analyticsEndRef.current) analyticsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    if (emailsEndRef.current) emailsEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [liveData]);

  return (
    <div className="realtime-data">
      <h2 style={{display:'flex',alignItems:'center',gap:8}}>
        <span className="live-dot" style={{animation:'livePulse 1s infinite',background:'#e53e3e',borderRadius:'50%',width:12,height:12,display:'inline-block'}}></span>
        Live Data Stream
      </h2>
      {loading && <div className="loading">Loading live data...</div>}
      {error && <div className="error">{error}</div>}
      <div className="realtime-sections">
        <div className="realtime-section">
          <h3>📋 Recent Quotes ({liveData.quotes.length})</h3>
          <div className="data-stream">
            {liveData.quotes.map(quote => (
              <div key={quote.id} className={`stream-item${highlighted.quotes===quote.id?' highlight':''}`}>
                <strong>{quote.name}</strong> - {quote.service}
                <span className="timestamp">
                  {quote.timestamp ? new Date(quote.timestamp).toLocaleString() : '—'}
                </span>
              </div>
            ))}
            <div ref={quotesEndRef}></div>
          </div>
        </div>

        <div className="realtime-section">
          <h3>📊 Live Analytics ({liveData.analytics.length})</h3>
          <div className="data-stream">
            {liveData.analytics.map(event => (
              <div key={event.id} className={`stream-item${highlighted.analytics===event.id?' highlight':''}`}>
                <strong>{event.event}</strong>
                <span className="timestamp">
                  {event.timestamp ? new Date(event.timestamp).toLocaleString() : '—'}
                </span>
              </div>
            ))}
            <div ref={analyticsEndRef}></div>
          </div>
        </div>

        <div className="realtime-section">
          <h3>📧 Email Status ({liveData.emails.length})</h3>
          <div className="data-stream">
            {liveData.emails.map(email => (
              <div key={email.id} className={`stream-item${highlighted.emails===email.id?' highlight':''}`}>
                <strong>{email.to}</strong> - {email.status}
                <span className="timestamp">
                  {email.timestamp ? new Date(email.timestamp).toLocaleString() : '—'}
                </span>
              </div>
            ))}
            <div ref={emailsEndRef}></div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes livePulse { 0%{opacity:1;} 50%{opacity:0.3;} 100%{opacity:1;} }
        .stream-item.highlight { background: #fffbe6; transition: background 0.7s; }
        .loading { color: #3182ce; margin: 1rem 0; }
        .error { color: #e53e3e; margin: 1rem 0; }
      `}</style>
    </div>
  );
};

export default RealtimeData;
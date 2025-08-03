import React, { useState } from 'react';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { sendQuoteEmail } from '../utils/emailService';

const QuoteResponse = ({ quote, onClose }) => {
  const [response, setResponse] = useState({
    price: '',
    timeline: '',
    message: '',
    terms: ''
  });

  const handleSendQuote = async () => {
    try {
      // Create quote response
      await addDoc(collection(db, 'quote_responses'), {
        quoteId: quote.id,
        clientName: quote.name,
        clientEmail: quote.email,
        service: quote.service,
        ...response,
        timestamp: new Date(),
        status: 'sent'
      });

      // Update original quote status
      await updateDoc(doc(db, 'quotes', quote.id), {
        status: 'quoted',
        quotedAt: new Date()
      });

      // Send emails to both client and admin
      await sendQuoteEmail(quote, response);
      
      console.log('Quote and emails sent to:', quote.email);
      onClose();
    } catch (error) {
      console.error('Error sending quote:', error);
    }
  };

  return (
    <div className="quote-response">
      <h3>Send Quote to {quote.name}</h3>
      <div className="quote-form">
        <input
          type="text"
          placeholder="Price (e.g., ₹5,000)"
          value={response.price}
          onChange={(e) => setResponse(prev => ({...prev, price: e.target.value}))}
        />
        <input
          type="text"
          placeholder="Timeline (e.g., 2-3 days)"
          value={response.timeline}
          onChange={(e) => setResponse(prev => ({...prev, timeline: e.target.value}))}
        />
        <textarea
          placeholder="Custom message..."
          value={response.message}
          onChange={(e) => setResponse(prev => ({...prev, message: e.target.value}))}
          rows="4"
        />
        <textarea
          placeholder="Terms & conditions..."
          value={response.terms}
          onChange={(e) => setResponse(prev => ({...prev, terms: e.target.value}))}
          rows="3"
        />
        <div className="quote-actions">
          <button onClick={handleSendQuote} className="send-quote-btn">
            📧 Send Quote
          </button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default QuoteResponse;
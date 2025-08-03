const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();
const db = admin.database();

const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'prabhatprabhakar918@gmail.com',
    pass: 'NituPrabhat010307'
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.sendEmail = functions.firestore
  .document('mail/{docId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    
    console.log('Processing email:', data);
    
    try {
      const info = await transporter.sendMail({
        from: '"Language Liberty" <prabhatprabhakar918@gmail.com>',
        to: data.to,
        cc: data.cc,
        subject: data.message.subject,
        html: data.message.html
      });
      
      console.log('Email sent successfully:', info.messageId);
      await snap.ref.update({ status: 'sent', sentAt: new Date(), messageId: info.messageId });
      
      // Push to Realtime Database
      await db.ref('emails').push({
        to: data.to,
        subject: data.message.subject,
        status: 'sent',
        timestamp: admin.database.ServerValue.TIMESTAMP,
        messageId: info.messageId
      });
    } catch (error) {
      console.error('Email error:', error);
      await snap.ref.update({ status: 'error', error: error.message, errorTime: new Date() });
    }
  });
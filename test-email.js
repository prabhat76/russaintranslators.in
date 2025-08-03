const nodemailer = require('nodemailer');

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

async function testEmail() {
  try {
    const info = await transporter.sendMail({
      from: '"Language Liberty" <prabhatprabhakar918@gmail.com>',
      to: 'prabhatprabhakar918@gmail.com',
      subject: 'Test Email from Language Liberty',
      html: '<h1>Test Email</h1><p>This is a test email from the Russian translator app.</p>'
    });
    
    console.log('✅ Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('❌ Email error:', error.message);
  }
}

testEmail();
export const sendEmail = async (to, subject, html, cc = null) => {
  // Log email for now - will be sent when Firebase Functions are deployed
  console.log('📧 Email to send:', {
    to,
    subject,
    from: 'prabhatprabhakar918@gmail.com',
    timestamp: new Date().toISOString()
  });
  
  // For immediate testing, you can manually send these emails
  alert(`Email would be sent to: ${to}\nSubject: ${subject}`);
};

export const sendQuoteEmail = async (quote, response) => {
  const clientEmail = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2c3e50;">Quote from Language Liberty</h2>
      <p>Dear ${quote.name},</p>
      <p>Thank you for your interest in our Russian translation services. Here's your custom quote:</p>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Service Details:</h3>
        <p><strong>Service:</strong> ${quote.service}</p>
        <p><strong>Price:</strong> ${response.price}</p>
        <p><strong>Timeline:</strong> ${response.timeline}</p>
        ${response.message ? `<p><strong>Message:</strong> ${response.message}</p>` : ''}
      </div>
      
      ${response.terms ? `
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4>Terms & Conditions:</h4>
          <p>${response.terms}</p>
        </div>
      ` : ''}
      
      <p>To proceed with this quote, please reply to this email or contact us:</p>
      <ul>
        <li>Phone: +91-8789389223</li>
        <li>WhatsApp: <a href="https://wa.me/918789389223">Message us</a></li>
        <li>Email: prabhatprabhakar918@gmail.com</li>
      </ul>
      
      <p>Best regards,<br>Prabhat Kumar<br>Language Liberty</p>
    </div>
  `;

  const adminEmail = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #e74c3c;">Quote Sent - Admin Notification</h2>
      <p>A quote has been sent to: <strong>${quote.name}</strong></p>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Client Details:</h3>
        <p><strong>Name:</strong> ${quote.name}</p>
        <p><strong>Email:</strong> ${quote.email}</p>
        <p><strong>Phone:</strong> ${quote.phone}</p>
        <p><strong>Service:</strong> ${quote.service}</p>
        <p><strong>Message:</strong> ${quote.message}</p>
      </div>
      
      <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Quote Sent:</h3>
        <p><strong>Price:</strong> ${response.price}</p>
        <p><strong>Timeline:</strong> ${response.timeline}</p>
        ${response.message ? `<p><strong>Message:</strong> ${response.message}</p>` : ''}
        ${response.terms ? `<p><strong>Terms:</strong> ${response.terms}</p>` : ''}
      </div>
    </div>
  `;

  await sendEmail(quote.email, `Quote for ${quote.service} - Language Liberty`, clientEmail);
  await sendEmail('prabhatprabhakar918@gmail.com', `Quote Sent to ${quote.name} - Admin Copy`, adminEmail);
};

export const sendContactEmail = async (formData) => {
  const clientEmail = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2c3e50;">Thank you for contacting Language Liberty</h2>
      <p>Dear ${formData.name},</p>
      <p>Thank you for your inquiry about our Russian translation services. We have received your message and will get back to you within 24 hours.</p>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Your Request Details:</h3>
        <p><strong>Service:</strong> ${formData.service}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      </div>
      
      <p>For immediate assistance, you can reach us at:</p>
      <ul>
        <li>Phone: +91-8789389223</li>
        <li>WhatsApp: <a href="https://wa.me/918789389223">Message us</a></li>
      </ul>
      
      <p>Best regards,<br>Prabhat Kumar<br>Language Liberty</p>
    </div>
  `;

  const adminEmail = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #e74c3c;">New Contact Form Submission</h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Client Details:</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Service:</strong> ${formData.service}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
        <p><strong>Language:</strong> ${formData.language}</p>
      </div>
      
      <p><strong>Action Required:</strong> Please respond to this client within 24 hours.</p>
    </div>
  `;

  await sendEmail(formData.email, 'Thank you for contacting Language Liberty', clientEmail);
  await sendEmail('prabhatprabhakar918@gmail.com', `New Contact: ${formData.name} - ${formData.service}`, adminEmail);
};
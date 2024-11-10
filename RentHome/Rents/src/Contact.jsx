// src/components/Contact.jsx
import React from 'react';

function Contact() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Contact Us</h2>
      <p>
        We’re here to help! If you have any questions, feedback, or need assistance with our platform, please feel free 
        to reach out. Our support team is available to ensure you have the best experience possible on HomeRental.
      </p>

      <h3>Customer Support</h3>
      <p>
        For general inquiries and support, please email us at: <a href="mailto:support@homerental.com">support@homerental.com</a>
      </p>

      <h3>Business Inquiries</h3>
      <p>
        For partnership opportunities, press inquiries, or other business-related questions, contact us at: 
        <a href="mailto:business@homerental.com">business@homerental.com</a>
      </p>

      <h3>Phone Support</h3>
      <p>
        You can also reach us by phone at: <strong>(123) 456-7890</strong><br />
        Our phone support is available Monday to Friday, 9:00 AM to 6:00 PM (EST).
      </p>

      <h3>Head Office</h3>
      <p>
        HomeRental Inc.<br />
        123 Main Street<br />
        Citytown, ST 12345<br />
        United States
      </p>

      <h3>Follow Us</h3>
      <p>
        Stay connected with us on social media for the latest updates and news:
      </p>
      <ul>
        <li><a href="https://www.facebook.com/homerental" target="_blank" rel="noopener noreferrer">Facebook</a></li>
        <li><a href="https://www.twitter.com/homerental" target="_blank" rel="noopener noreferrer">Twitter</a></li>
        <li><a href="https://www.instagram.com/homerental" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://www.linkedin.com/company/homerental" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
      </ul>
    </div>
  );
}

export default Contact;

import React from 'react';
import './ContactForm.css'; // Assuming you'll create a CSS file for styling

const ContactPage = () => {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Get in Touch</h1>
        <p className="subtitle">You can reach us anytime</p>
      </header>

      <main className="contact-content">
        <div className="contact-details">
          <div className="contact-item email-item">
            <div className="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="contact-text">Velocitycodes@gmail.com</span>
          </div>

          <div className="contact-item phone-item">
            <div className="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92C16.04 20.92 12 16.88 12 11.92C12 6.96 16.04 2.92 21 2.92C21.55 2.92 22 3.37 22 3.92V6.92C22 7.47 21.55 7.92 21 7.92C19.24 7.92 17.57 8.45 16.22 9.41C15.17 10.17 14.31 11.15 13.69 12.29C13.07 13.43 12.7 14.69 12.61 15.99C12.57 16.6 12.97 17.14 13.58 17.22C15.23 17.46 16.94 17.24 18.49 16.58C19.64 16.08 20.67 15.37 21.5 14.5C21.82 14.16 22 13.73 22 13.28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="contact-text">+91 999 999 9999</span>
          </div>

          <div className="contact-item phone-item">
            <div className="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92C16.04 20.92 12 16.88 12 11.92C12 6.96 16.04 2.92 21 2.92C21.55 2.92 22 3.37 22 3.92V6.92C22 7.47 21.55 7.92 21 7.92C19.24 7.92 17.57 8.45 16.22 9.41C15.17 10.17 14.31 11.15 13.69 12.29C13.07 13.43 12.7 14.69 12.61 15.99C12.57 16.6 12.97 17.14 13.58 17.22C15.23 17.46 16.94 17.24 18.49 16.58C19.64 16.08 20.67 15.37 21.5 14.5C21.82 14.16 22 13.73 22 13.28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="contact-text">+91 999 999 9999</span>
          </div>
        </div>

        <div className="contact-message">
          <h2>Need help with something? Want a demo?</h2>
          <p>Get in touch with our friendly team and</p>
          <p>we'll get in touch within 2 hours.</p>
        </div>
      </main>

      <footer className="contact-footer">
        <button className="contact-button">
          Contact Us Now
        </button>
      </footer>
    </div>
  );
};

export default ContactPage;
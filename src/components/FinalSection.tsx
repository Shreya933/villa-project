import React, { useState } from 'react';
import { SCROLLYTELLING_CONFIG } from '../config/scrollytelling';

export const FinalSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setFormSubmitted(true);
    }
  };

  return (
    <section className="final-showcase-section" id="consultation">
      <div className="final-container">
        {/* Architectural Stats Grid */}
        <div className="stats-grid">
          {SCROLLYTELLING_CONFIG.companyStats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-number">{stat.value}</div>
              <div className="stat-title">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Master CTA Banner */}
        <div className="consultation-cta-card">
          <div className="cta-eyebrow">BEGIN YOUR COMMISSION</div>
          <h2 className="cta-headline">
            <span>READY TO BUILD</span>
            <span className="cta-headline-italic">YOUR VISION?</span>
          </h2>
          <p className="cta-description">
            We partner with discerning private clients worldwide to engineer one-of-a-kind
            monolithic villas. Schedule an initial confidential architectural review.
          </p>

          {formSubmitted ? (
            <div className="inquiry-success-message">
              <span className="success-icon">✓</span>
              <div>
                <strong>Thank you for your inquiry.</strong>
                <p>Our senior partner will reach out within 24 hours to coordinate your consultation.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="consultation-form">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="consultation-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="consultation-submit-btn">
                <span>REQUEST CONSULTATION</span>
              </button>
            </form>
          )}
        </div>

        {/* Minimal Luxury Footer */}
        <footer className="luxury-footer">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="footer-dot" />
              <span className="footer-title">FORM / ARCHITECTURE</span>
            </div>
            <div className="footer-locations">
              <span>ZÜRICH</span>
              <span className="dot-divider">•</span>
              <span>LONDON</span>
              <span className="dot-divider">•</span>
              <span>NEW YORK</span>
              <span className="dot-divider">•</span>
              <span>DUBAI</span>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} FORM Architecture & Construction Studio. All rights reserved.</p>
            <div className="footer-sublinks">
              <span>Privacy Policy</span>
              <span>Terms of Commission</span>
              <span>Architectural Monograph</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};


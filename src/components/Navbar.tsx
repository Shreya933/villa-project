import React from 'react';

interface NavbarProps {
  onScrollToContact: () => void;
  onScrollToPhase: (phaseIndex: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToContact, onScrollToPhase }) => {
  return (
    <nav className="site-navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-dot" />
          <span className="brand-title">FORM</span>
          <span className="brand-divider">/</span>
          <span className="brand-sub">ARCHITECTURE</span>
        </div>

        <div className="nav-links">
          <button type="button" className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Vision
          </button>
          <button type="button" className="nav-link" onClick={() => onScrollToPhase(1)}>
            Groundwork
          </button>
          <button type="button" className="nav-link" onClick={() => onScrollToPhase(2)}>
            Structure
          </button>
          <button type="button" className="nav-link" onClick={() => onScrollToPhase(4)}>
            Completion
          </button>
        </div>

        <div className="nav-actions">
          <button type="button" className="nav-cta-btn" onClick={onScrollToContact}>
            <span>COMMISSION RESIDENCE</span>
          </button>
        </div>
      </div>
    </nav>
  );
};


import React from 'react';

export type PageId = 'experience' | 'residences' | 'about';

interface TopNavProps {
  activePage: PageId;
  onSelectPage: (page: PageId) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ activePage, onSelectPage }) => {
  return (
    <nav className={`luxury-topnav ${activePage === 'experience' ? 'topnav-transparent' : 'topnav-solid'}`}>
      <div className="topnav-inner">
        {/* Brand Logo - Floating Glass Pill */}
        <div className="topnav-brand" onClick={() => onSelectPage('experience')}>
          <span className="brand-gem" />
          <span className="brand-main">FORM</span>
          <span className="brand-slash">/</span>
          <span className="brand-tag">ARCHITECTURE</span>
        </div>

        {/* Page Switcher - Floating Glass Pill */}
        <div className="topnav-menu">
          <button
            type="button"
            className={`nav-btn ${activePage === 'experience' ? 'active' : ''}`}
            onClick={() => onSelectPage('experience')}
          >
            <span>THE EXPERIENCE</span>
            {activePage === 'experience' && <span className="nav-glow-indicator" />}
          </button>

          <button
            type="button"
            className={`nav-btn ${activePage === 'residences' ? 'active' : ''}`}
            onClick={() => onSelectPage('residences')}
          >
            <span>RESIDENCES</span>
            {activePage === 'residences' && <span className="nav-glow-indicator" />}
          </button>

          <button
            type="button"
            className={`nav-btn ${activePage === 'about' ? 'active' : ''}`}
            onClick={() => onSelectPage('about')}
          >
            <span>ABOUT US</span>
            {activePage === 'about' && <span className="nav-glow-indicator" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

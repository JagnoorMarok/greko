import React, { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on ESC or resize to desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 900) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="site-header">
        <a href="#" className="brand-logo">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              {/* 3 Coffee Beans in flower / clover arrangement */}
              <ellipse cx="8" cy="14" rx="4.5" ry="3.2" transform="rotate(-30 8 14)" fill="#F5B82E" />
              <path d="M5.5 15.5C7 14 9 14 10.5 12.5" stroke="#061938" strokeWidth="1.2" strokeLinecap="round" />
              
              <ellipse cx="16" cy="14" rx="4.5" ry="3.2" transform="rotate(30 16 14)" fill="#F5B82E" />
              <path d="M13.5 12.5C15 14 17 14 18.5 15.5" stroke="#061938" strokeWidth="1.2" strokeLinecap="round" />
              
              <ellipse cx="12" cy="7.5" rx="3.2" ry="4.5" fill="#F5B82E" />
              <path d="M12 4.5C11.5 6.5 12.5 8.5 12 10.5" stroke="#061938" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <span>GREKO</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li><a href="#about" className="nav-link">ABOUT</a></li>
            <li><a href="#menu" className="nav-link">MENU</a></li>
            <li><a href="#branch" className="nav-link">BRANCH</a></li>
            <li><a href="#blog" className="nav-link">BLOG</a></li>
            <li><a href="#contact" className="nav-link">CONTACT</a></li>
          </ul>
        </nav>

        {/* Desktop CTA Action */}
        <div className="header-cta-desktop">
          <a href="#reservation" className="btn-yellow">
            RESERVATION
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line line-top" />
          <span className="hamburger-line line-middle" />
          <span className="hamburger-line line-bottom" />
        </button>
      </header>

      {/* Luxury Mobile Navigation Drawer */}
      <div 
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
        
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <span className="mobile-drawer-brand">GREKO</span>
            <button 
              className="mobile-drawer-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation"
            >
              ✕
            </button>
          </div>

          <ul className="mobile-nav-list">
            <li>
              <a 
                href="#about" 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>01</span> ABOUT
              </a>
            </li>
            <li>
              <a 
                href="#menu" 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>02</span> MENU & BREWS
              </a>
            </li>
            <li>
              <a 
                href="#features" 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>03</span> CRAFT & PROCESS
              </a>
            </li>
            <li>
              <a 
                href="#gallery" 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>04</span> ATMOSPHERE
              </a>
            </li>
            <li>
              <a 
                href="#branch" 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>05</span> BRANCHES
              </a>
            </li>
            <li>
              <a 
                href="#blog" 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>06</span> GREKO JOURNAL
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>07</span> CONTACT
              </a>
            </li>
          </ul>

          <div className="mobile-drawer-footer">
            <a 
              href="#reservation" 
              className="btn-yellow btn-mobile-reserve"
              onClick={() => setMobileMenuOpen(false)}
            >
              TABLE RESERVATION
            </a>
            <span className="mobile-hours-tag">DAILY 7:00 AM — 10:00 PM</span>
          </div>
        </div>
      </div>
    </>
  );
}

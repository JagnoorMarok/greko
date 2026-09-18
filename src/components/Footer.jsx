import React, { useRef, useEffect, useState } from 'react';

export default function Footer() {
  const tickerItems = [
    "AMERICANO", "CAPPUCCINO", "LATTE", "FLAT WHITE",
    "MACCHIATO", "MOCHA", "AFFOGATO", "CORTADO", "COLD BREW", "ESPRESSO"
  ];

  const footerTextPathRef = useRef(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    let offset = 0;
    let animId;

    const animate = () => {
      offset -= 1.25;
      if (offset <= -2400) {
        offset += 2400;
      }
      if (footerTextPathRef.current) {
        footerTextPathRef.current.setAttribute('startOffset', `${offset}px`);
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const repeatedText = Array(12).fill(tickerItems.join("   •   ")).join("   •   ");

  return (
    <footer className="site-footer" id="contact">
      {/* Top S-Curved Ribbon Ticker */}
      <div className="footer-curved-ticker-wrap">
        <svg
          viewBox="0 0 1800 320"
          className="curved-ribbon-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="footerRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#061938" stopOpacity="0.92" />
              <stop offset="20%" stopColor="#0D2C5E" stopOpacity="0.98" />
              <stop offset="50%" stopColor="#184C98" stopOpacity="1" />
              <stop offset="80%" stopColor="#0D2C5E" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#061938" stopOpacity="0.92" />
            </linearGradient>

            {/* Dynamic S-Curve Path undulating across the footer */}
            <path
              id="footerSCurvePath"
              d="M -150,60 C 250,300 650,-20 950,160 C 1280,320 1650,-10 2000,160"
            />
          </defs>

          {/* 3D Drop Shadow */}
          <filter id="footerSRibbonShadow" x="-20%" y="-30%" width="140%" height="160%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#000000" floodOpacity="0.65" />
          </filter>

          {/* Golden Outer Border Outline */}
          <use
            href="#footerSCurvePath"
            fill="none"
            stroke="rgba(245, 184, 46, 0.7)"
            strokeWidth="86"
            filter="url(#footerSRibbonShadow)"
          />

          {/* Deep Navy Ribbon Solid Body */}
          <use
            href="#footerSCurvePath"
            fill="none"
            stroke="url(#footerRibbonGrad)"
            strokeWidth="80"
          />

          {/* Subtle Center Guide Highlight */}
          <use
            href="#footerSCurvePath"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="2"
          />

          {/* Text Marquee Flowing Along the S-Curve */}
          <text className="curved-ribbon-text" dy="7">
            <textPath
              ref={footerTextPathRef}
              href="#footerSCurvePath"
              startOffset="0px"
            >
              {repeatedText}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Main Footer Center Layout */}
      <div className="footer-main-content">
        {/* Left Nav Column */}
        <div className="footer-nav-col">
          <a href="#about" className="footer-link">ABOUT</a>
          <a href="#menu" className="footer-link">MENU</a>
          <a href="#branch" className="footer-link">BRANCH</a>
          <a href="#blog" className="footer-link">BLOG</a>
          <a href="#contact" className="footer-link">CONTACT</a>
        </div>

        {/* Center Blue Greko Cup Illustration with Splash (Transparent) */}
        <div className="footer-center-cup-wrap">
          <img
            src="/assets/greko_cup_splash.png"
            alt="Blue Greko Coffee Cup with Splash"
            style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.7))' }}
            loading="lazy"
          />
        </div>

        {/* Right Social Column */}
        <div className="footer-social-col">
          <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">FACEBOOK</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">INSTAGRAM</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">X (TWITTER)</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">TIKTOK</a>
        </div>
      </div>

      {/* Newsletter Signup: Join God's Own Coffee Club */}


      {/* Sub Bar */}
      <div className="footer-sub-bar">
        <span>© 2026 GREKO. ALL RIGHTS RESERVED.</span>
        <div className="footer-sub-links">
          <a href="#privacy">PRIVACY POLICY</a>
          <a href="#terms">TERMS & CONDITIONS</a>
        </div>
      </div>

      {/* Giant Bottom Watermark */}
      <div className="footer-giant-watermark">
        GREKO
      </div>
    </footer>
  );
}

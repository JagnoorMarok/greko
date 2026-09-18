import React from 'react';

export default function Statement() {
  return (
    <section className="statement-section">
      <h2 className="statement-badge-title reveal-up">
        <span>MORE THAN A</span>
        <span className="inline-cup-badge">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" stroke="#FAF8F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" stroke="#FAF8F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="6" y1="1" x2="6" y2="4" stroke="#FAF8F2" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="10" y1="1" x2="10" y2="4" stroke="#FAF8F2" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="14" y1="1" x2="14" y2="4" stroke="#FAF8F2" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </span>
        <span>MOMENT TO PAUSE,</span>
        <span>CONNECT, AND ENJOY LIFE.</span>
      </h2>

      <div className="cup-3d-display reveal-scale delay-200">
        <img 
          src="/assets/cup_3d_text_transparent.png" 
          alt="3D CUP Lettering with Coffee Cup" 
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Curved Bottom Arch Divider */}
      <div className="section-bottom-curve curve-to-navy" />
    </section>
  );
}

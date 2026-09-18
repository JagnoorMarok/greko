import React from 'react';

export default function Testimonial() {
  return (
    <section className="testimonial-section">
      <h2 className="heading-section reveal-up">
        LOVED BY<br />GREKO LOVERS
      </h2>

      <div className="testimonial-plaque-container reveal-scale delay-200">
        <img 
          src="/assets/testimonial_plaque.jpg" 
          alt="Testimonial Mahogany Plaque with Espresso Splash" 
          style={{ width: '100%', height: 'auto', display: 'block' }}
          loading="lazy"
        />

        <div className="testimonial-overlay-content">
          <p className="testimonial-quote">
            “A TRULY POLISHED EXPERIENCE. THE SERVICE FEELS EFFORTLESS, RELIABLE, AND CAREFULLY DESIGNED. EVERYTHING WORKS TOGETHER PERFECTLY. I WOULD HIGHLY RECOMMEND IT.”
          </p>
          <h4 className="testimonial-author-name">DANIEL BROOKS</h4>
          <p className="testimonial-author-role">PRODUCT DESIGNER</p>
        </div>
      </div>

      {/* Curved Bottom Arch Divider */}
      <div className="section-bottom-curve curve-to-ivory" />
    </section>
  );
}

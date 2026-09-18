import React, { useState } from 'react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "DO YOU OFFER TAKEAWAY AND GRAB-TO-GO ORDERS?",
      a: "Yes! We offer convenient takeaway and grab-and-go orders for your busy days. Simply place your order and enjoy your favorite coffee wherever you go.",
      delay: "delay-100"
    },
    {
      q: "ARE YOUR COFFEE BEANS FRESHLY ROASTED EVERY DAY?",
      a: "Yes, our master roasters small-batch roast our single-origin and signature blends daily to ensure peak aroma, nuanced flavors, and maximum freshness in every cup.",
      delay: "delay-200"
    },
    {
      q: "DO YOU PROVIDE DAIRY-FREE AND VEGAN MILK OPTIONS?",
      a: "Absolutely! We offer organic oat milk, almond milk, soy milk, and coconut milk, all specially formulated for silky latte art and balanced taste.",
      delay: "delay-300"
    },
    {
      q: "DO YOU OFFER COMPLIMENTARY WI-FI FOR CUSTOMERS?",
      a: "Yes, all our locations feature high-speed complimentary Wi-Fi and plenty of comfortable seating with power outlets for work and study.",
      delay: "delay-400"
    },
    {
      q: "DO YOU SERVE FRESH PASTRIES AND LIGHT SNACKS?",
      a: "We partner with local artisan bakeries to bring you freshly baked croissants, sourdough toasts, cookies, and gourmet breakfast bites every morning.",
      delay: "delay-500"
    }
  ];

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="faq-section">
      <h2 className="heading-section reveal-up">
        EVERYTHING YOU<br />NEED TO KNOW
      </h2>

      <div className="faq-list">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className={`faq-item reveal-up ${faq.delay} ${isOpen ? 'active' : ''}`}>
              <button 
                className="faq-header" 
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
              >
                <span className="faq-question">{faq.q}</span>
                <span className="faq-icon">
                  {isOpen ? '↑' : '↓'}
                </span>
              </button>
              {isOpen && (
                <div className="faq-body">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Curved Bottom Arch Divider */}
      <div className="section-bottom-curve curve-to-white" />
    </section>
  );
}

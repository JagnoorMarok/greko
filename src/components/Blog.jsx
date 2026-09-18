import React from 'react';

export default function Blog() {
  const posts = [
    {
      id: 1,
      category: "BREWING GUIDE",
      date: "JULY 18, 2026",
      title: "MASTER THE PERFECT POUR-OVER COFFEE AT HOME TODAY",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
      link: "#",
      delay: "delay-100"
    },
    {
      id: 2,
      category: "COFFEE BEANS",
      date: "JULY 10, 2026",
      title: "CHOOSING THE RIGHT COFFEE BEANS FOR YOUR UNIQUE TASTE",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop&q=80",
      link: "#",
      delay: "delay-200"
    },
    {
      id: 3,
      category: "COFFEE GUIDE",
      date: "JULY 03, 2026",
      title: "ESPRESSO VS LATTE: WHICH ONE IS RIGHT FOR YOU TODAY?",
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&auto=format&fit=crop&q=80",
      link: "#",
      delay: "delay-300"
    }
  ];

  return (
    <section className="blog-section" id="blog">
      <h2 className="heading-section reveal-up">
        DISCOVER THE<br />COFFEE WORLD
      </h2>

      <div className="blog-grid">
        {posts.map((post) => (
          <a key={post.id} href={post.link} className={`blog-card reveal-up ${post.delay}`}>
            <div className="blog-img-wrap">
              <img 
                src={post.image} 
                alt={post.title} 
                className="blog-img"
                loading="lazy"
              />
            </div>
            <div className="blog-content">
              <div className="blog-meta">
                <span>{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h3 className="blog-title">{post.title}</h3>
            </div>
          </a>
        ))}
      </div>

      {/* Curved Bottom Arch Divider */}
      <div className="section-bottom-curve curve-to-navy-dark" />
    </section>
  );
}

import React from 'react';

export default function Branches() {
  const branches = [
    {
      id: 1,
      name: "GREKO RESERVE ROASTERY",
      image: "/assets/branch_reserve.jpg",
      address: "245 MADISON AVENUE",
      city: "NEW YORK, NY 10016",
      scheduleDay: "MONDAY - SUNDAY",
      scheduleHours: "7:00 AM - 9:00 PM",
      mapUrl: "#",
      delay: "delay-100"
    },
    {
      id: 2,
      name: "GREKO THE ROAST STUDIO",
      image: "/assets/branch_roast_studio.jpg",
      address: "742 SUNSET BOULEVARD",
      city: "LOS ANGELES, CA 90028",
      scheduleDay: "MONDAY - SUNDAY",
      scheduleHours: "6:30 AM - 10:00 PM",
      mapUrl: "#",
      delay: "delay-300"
    }
  ];

  return (
    <section className="branches-section" id="branch">
      <h2 className="heading-section reveal-up">
        FIND YOUR<br />PERFECT BREW
      </h2>

      <div className="branches-grid">
        {branches.map((branch) => (
          <div key={branch.id} className={`branch-card reveal-up ${branch.delay}`}>
            <div className="branch-img-wrap">
              <img 
                src={branch.image} 
                alt={branch.name} 
                className="branch-img"
                loading="lazy"
              />
            </div>
            <div className="branch-info">
              <div className="branch-header">
                <h3 className="branch-name">{branch.name}</h3>
                <a href={branch.mapUrl} className="btn-yellow" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                  GET DIRECTIONS
                </a>
              </div>

              <div className="branch-meta">
                <div>
                  <p>{branch.address}</p>
                  <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{branch.city}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p>{branch.scheduleDay}</p>
                  <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{branch.scheduleHours}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Curved Bottom Arch Divider */}
      <div className="section-bottom-curve curve-to-white" />
    </section>
  );
}

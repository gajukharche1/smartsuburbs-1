'use client';
import { useEffect, useRef, useState } from 'react';

const services = [
  { emoji: '📍', title: 'Local Business Directories', desc: 'Premium listings across 60+ hyperlocal directories in Pune & Mumbai to dominate suburb-level searches.' },
  { emoji: '📱', title: 'Social Media Marketing', desc: '16 Local Social Media Posts per year across Facebook, Instagram, and Twitter for local audience reach.' },
  { emoji: '🔍', title: 'Search Engine Marketing', desc: 'Google Ads & local search campaigns that drive high-intent traffic from your neighbourhood.' },
  { emoji: '🌐', title: 'Website Development', desc: 'Professional, SEO-optimized websites designed to convert local visitors into loyal customers.' },
  { emoji: '🎬', title: 'Video Marketing', desc: 'Compelling video content that tells your brand story and engages your local community.' },
  { emoji: '📣', title: 'Paid Local Lead Generation', desc: 'Precision campaigns to help you reach the right local audience and generate qualified leads.' },
  { emoji: '✍️', title: 'Content Marketing', desc: 'High-quality articles, blogs, and local content that build authority and drive organic traffic.' },
  { emoji: '🎪', title: 'Event Management', desc: 'Local and virtual event planning, management, and ticketing solutions for community engagement.' },
  { emoji: '⭐', title: 'Social Proofing', desc: 'Build trust and credibility through reviews, ratings, and social proof across all platforms.' },
];

export default function ServicesSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" style={{ background: 'var(--section-light)', paddingTop: '100px', paddingBottom: '100px', transition: 'background 0.3s ease' }} ref={ref}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="badge badge-orange" style={{ marginBottom: '14px' }}>🛡️ One Umbrella</div>
          <h2 className="section-title" style={{ marginBottom: '14px' }}>
            Get All Your Digital Services<br />
            <span className="gradient-text">Under One Umbrella</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            If you're ready to grow smarter, faster, and hyperlocal — we're here to make it happen. Simplify your digital marketing efforts with our comprehensive suite of services.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="services-grid">
          {services.map((svc, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: '28px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.55s ease ${i * 0.07}s`,
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(255,107,0,0.1), rgba(255,107,0,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                {svc.emoji}
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>{svc.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="https://smartsuburbs.in/go/smart-suburbs-whatapp-button" className="btn-primary" style={{ marginRight: '14px' }}>
            💬 Enquire Now
          </a>
          <a href="https://smartsuburbs.in/go/smart-suburbs-paid-listing-button" className="btn-outline">
            Learn More
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .services-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

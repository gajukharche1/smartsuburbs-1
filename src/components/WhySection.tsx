'use client';
import { useEffect, useRef, useState } from 'react';
import { MapPin, Target, Award } from 'lucide-react';

const advantages = [
  {
    icon: <MapPin size={28} />,
    title: 'Local Search = Local Customers',
    desc: 'Your customers live within 3–5 km. Smart Suburbs helps your business appear exactly where your audience is searching — in their own neighbourhood.',
    color: '#FF6B00',
    bg: 'linear-gradient(135deg, rgba(255,107,0,0.08), rgba(255,107,0,0.02))',
    border: 'rgba(255,107,0,0.15)',
  },
  {
    icon: <Target size={28} />,
    title: '60+ Local Area Directories',
    desc: 'Wakad.in, BanerBalewadi.com, Kothrud.com, DadarWest.in, Borivli.in, CharniRoad.com and more — giving unmatched local visibility across Pune & Mumbai.',
    color: '#4A90D9',
    bg: 'linear-gradient(135deg, rgba(74,144,217,0.10), rgba(74,144,217,0.03))',
    border: 'rgba(74,144,217,0.18)',
  },
  {
    icon: <Award size={28} />,
    title: 'Assured Google 1st Page / AI Search Presence',
    desc: 'AI-powered SEO, high-authority directory pages, and neighbourhood relevance ensure results — with a 30-day performance commitment.',
    color: '#8B5CF6',
    bg: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(139,92,246,0.02))',
    border: 'rgba(139,92,246,0.15)',
  },
];

export default function WhySection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: 'var(--section-light)', paddingTop: '100px', paddingBottom: '100px', transition: 'background 0.3s ease' }} ref={ref}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="badge badge-orange" style={{ marginBottom: '14px' }}>💡 3-Step Hyperlocal Advantage</div>
          <h2 className="section-title" style={{ marginBottom: '14px' }}>
            Why Smart Suburbs is a Smart Digital<br />
            <span className="gradient-text">Choice for Local Businesses</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="why-grid">
          {advantages.map((item, i) => (
            <div
              key={i}
              style={{
                background: item.bg,
                border: `1.5px solid ${item.border}`,
                borderRadius: '24px',
                padding: '36px 28px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.65s ease ${i * 0.15}s`,
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-6px)';
                el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Step number */}
              <div style={{ position: 'absolute', top: '20px', right: '24px', fontSize: '48px', fontWeight: 900, color: item.color, opacity: 0.1, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                0{i + 1}
              </div>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, marginBottom: '20px' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)', lineHeight: '1.25' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.65' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .why-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

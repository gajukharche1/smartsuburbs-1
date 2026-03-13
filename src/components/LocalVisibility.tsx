'use client';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle, ArrowRight, Search, Globe, Bot } from 'lucide-react';

export default function LocalVisibility() {
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="two-col-grid">
          {/* Left */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-40px)', transition: 'all 0.7s ease' }}>
            <div className="badge badge-orange" style={{ marginBottom: '16px' }}>
              🌐 LOCAL Visibility: Google + Social + AI
            </div>
            <h2 className="section-title" style={{ marginBottom: '18px' }}>
              Get your business listed on Smart Suburbs Directories and seen where{' '}
              <span className="gradient-text">generic directories fall short.</span>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: '32px' }}>
              Our network of 60+ Hyperlocal Directories ensures you appear on the First page of search results for your specific business location and not 10 kms away.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a href="https://smartsuburbs.in" className="btn-primary">Compare Plans</a>
              <a href="https://wakad.in/competitor-comparison/" className="btn-outline">View Full Comparison</a>
            </div>
          </div>

          {/* Right – Visual cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(40px)', transition: 'all 0.7s ease 0.2s' }}>
            {[
              {
                icon: <Search size={24} />,
                color: '#FF6B00',
                bg: 'rgba(255,107,0,0.08)',
                title: 'Google Search',
                desc: 'Appear on Google 1st Page for hyperlocal searches in your suburb',
                badge: 'Assured',
              },
              {
                icon: <Globe size={24} />,
                color: '#4A90D9',
                bg: 'rgba(74,144,217,0.10)',
                title: 'Social Reach',
                desc: '16 Local Social Media Posts per year across FB, Instagram & Twitter',
                badge: '16 Posts/Year',
              },
              {
                icon: <Bot size={24} />,
                color: '#8B5CF6',
                bg: 'rgba(139,92,246,0.08)',
                title: 'AI Overview',
                desc: 'Featured in Google AI Overview & ChatGPT local search answers',
                badge: 'AI Powered',
              },
              {
                icon: <CheckCircle size={24} />,
                color: '#00C851',
                bg: 'rgba(0,200,81,0.08)',
                title: '60+ Directories',
                desc: 'Listed across 60+ hyperlocal directories in Pune & Mumbai suburbs',
                badge: 'Growing',
              },
            ].map((card, i) => (
              <div key={i} className="card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '46px', height: '46px', background: card.bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, marginBottom: '14px' }}>
                  {card.icon}
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>{card.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '12px' }}>{card.desc}</div>
                <div style={{ display: 'inline-block', padding: '3px 9px', background: card.bg, color: card.color, borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>
                  {card.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .two-col-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

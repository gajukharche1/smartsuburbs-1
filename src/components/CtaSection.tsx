'use client';

export default function CtaSection() {
  return (
    <section id="contact" style={{ background: 'var(--section-white)', paddingTop: '100px', paddingBottom: '100px', transition: 'background 0.3s ease' }}>
      <div className="container">
        {/* Questions Banner */}
        <div style={{ background: 'var(--bg-light)', borderRadius: '24px', padding: '48px', marginBottom: '64px', textAlign: 'center', border: '1px solid var(--border)' }}>
          <div className="badge badge-orange" style={{ marginBottom: '16px' }}>❓ Self Assessment</div>
          <h2 className="section-title" style={{ marginBottom: '12px' }}>
            5 Questions Every Business Should<br />
            <span className="gradient-text">Ask to Check its Digital Success.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginTop: '32px', textAlign: 'left' }} className="questions-grid">
            {[
              { q: '1', text: 'Can your customers find you when they search locally on Google?' },
              { q: '2', text: 'Are you visible in your specific suburb, not just city-wide?' },
              { q: '3', text: 'Do you have an active social media presence with regular local posts?' },
              { q: '4', text: 'Is your business listed on high-authority local directories?' },
              { q: '5', text: 'Are you getting quality leads from within 5 km of your business?' },
            ].map((item) => (
              <div key={item.q} style={{ background: 'var(--bg-card)', borderRadius: '14px', padding: '20px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', transition: 'background 0.3s ease' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(255,107,0,0.1)', color: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', marginBottom: '10px' }}>
                  {item.q}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.55' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #0F3460 100%)', borderRadius: '28px', padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="badge" style={{ marginBottom: '20px', background: 'rgba(255,107,0,0.15)', color: '#FF8C35', border: '1px solid rgba(255,107,0,0.25)', display: 'inline-flex' }}>
              🚀 You're Just One Step Away
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 900, color: 'white', marginBottom: '16px', fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: '1.15' }}>
              If you've reached here, You're just one step<br />
              <span style={{ background: 'linear-gradient(135deg, #FFB800, #FF6B00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                away from going Hyperlocal.
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px', maxWidth: '580px', margin: '0 auto 36px', lineHeight: '1.65' }}>
              When local customers search, they want local businesses — and Smart Suburbs helps them find you. From managing your listing to ranking you on Google's 1st page, our team ensures you get real, meaningful visibility within your neighbourhood.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://smartsuburbs.in/go/smart-suburbs-paid-listing-button" className="btn-primary" style={{ fontSize: '16px', padding: '16px 36px' }}>
                🏠 Get Your Business Listed Now
              </a>
              <a href="https://smartsuburbs.in/go/smart-suburbs-call-button" className="btn-secondary" style={{ fontSize: '16px', padding: '16px 28px' }}>
                📞 Call for More Details
              </a>
            </div>

            {/* Contact Info */}
            <div style={{ marginTop: '40px', padding: '24px 32px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', display: 'inline-block' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>Our Office</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '10px' }}>
                📍 Nandan Acura, B1-503, Opposite Manali Restaurant, Baner, Pune – 411045
              </p>
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="tel:8329693840" style={{ color: '#FF6B00', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>📞 8329693840</a>
                <a href="tel:8888658447" style={{ color: '#FF6B00', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>📞 8888658447</a>
                <a href="mailto:Contact@smartsuburbs.in" style={{ color: '#FF6B00', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>✉️ Contact@smartsuburbs.in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .questions-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 480px) { .questions-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

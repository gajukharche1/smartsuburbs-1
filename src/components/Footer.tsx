'use client';

const footerLinks = {
  'Useful Links': [
    { label: 'Lead Generation', href: 'https://smartsuburbs.in/lead-generation-services-agency-pune-mumbai/' },
    { label: 'Video Marketing', href: 'https://smartsuburbs.in/video-marketing-packages/' },
    { label: 'Google Ad Packages', href: 'https://smartsuburbs.in/google-ad-packages/' },
    { label: 'Facebook Ad Packages', href: 'https://smartsuburbs.in/facebook-ads-management-packages/' },
    { label: 'Local Digital Marketing', href: 'https://smartsuburbs.in' },
    { label: 'Social Media Services', href: 'https://smartsuburbs.in/social-media-services-agency-pune-mumbai/' },
    { label: 'Website Packages', href: 'https://smartsuburbs.in/website-packages-in-pune/' },
    { label: 'Social Proofing', href: 'https://smartsuburbs.in/social-proofing-services-local-businesses-agency-pune-wp001/' },
    { label: 'Social Media Optimisation', href: 'https://smartsuburbs.in/social-media-optimization/' },
  ],
  'Pune Directories': [
    { label: 'Wakad.in', href: 'https://wakad.in' },
    { label: 'BanerBalewadi.com', href: 'https://baner.balewadibalewadi.com' },
    { label: 'Kothrud.com', href: 'https://kothrud.com' },
    { label: 'Hinjewadi.in', href: 'https://hinjewadi.in' },
    { label: 'Aundh.in', href: 'https://aundh.in' },
    { label: 'Shivaji Nagar Directory', href: '#' },
  ],
  'Mumbai Directories': [
    { label: 'DadarWest.in', href: 'https://dadarwest.in' },
    { label: 'Borivli.in', href: 'https://borivli.in' },
    { label: 'CharniRoad.com', href: 'https://charniroad.com' },
    { label: 'More Coming Soon...', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: '#0D0D1A', color: 'rgba(255,255,255,0.7)' }}>
      {/* Top footer */}
      <div className="container" style={{ paddingTop: '64px', paddingBottom: '48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: '48px' }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #FF6B00, #FF8C35)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: '15px' }}>SS</div>
              <div>
                <div style={{ color: 'white', fontWeight: 800, fontSize: '18px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Smart<span style={{ color: '#FF6B00' }}>Suburbs</span></div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase' }}>Digital Marketing Agency</div>
              </div>
            </div>
            <p style={{ fontSize: '13px', lineHeight: '1.7', maxWidth: '280px', marginBottom: '20px' }}>
              Smart Suburbs offers Brand Monitoring and Competitor Analysis Service to boost the social engagement and provides all insights about your competitors brand.
            </p>
            <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '6px' }}>📍 Nandan Acura, B1-503, Opposite of Manali Restaurant, Baner, Pune – 411045</p>
              <p><a href="tel:8329693840" style={{ color: '#FF6B00', textDecoration: 'none' }}>📞 8329693840</a> / <a href="tel:8888658447" style={{ color: '#FF6B00', textDecoration: 'none' }}>8888658447</a></p>
              <p><a href="mailto:Contact@smartsuburbs.in" style={{ color: '#FF6B00', textDecoration: 'none' }}>✉️ Contact@smartsuburbs.in</a></p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '14px', marginBottom: '20px', letterSpacing: '0.5px' }}>{category}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {links.map(link => (
                  <li key={link.label} style={{ marginBottom: '10px' }}>
                    <a
                      href={link.href}
                      style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FF6B00'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}
                    >
                      <span style={{ color: 'rgba(255,107,0,0.4)', fontSize: '10px' }}>▸</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
            © 2026 Smart Suburbs · All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
            Joh Dikhta Hai Woh Bikta Hai 🇮🇳
          </p>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  );
}

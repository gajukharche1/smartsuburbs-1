'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { 
      label: 'Home', 
      href: '/',
      subLinks: [
        { label: 'About Us', href: '/about-us' }
      ]
    },
    {
      label: 'Local Marketing',
      href: '#',
      subLinks: [
        { label: 'Paid Listing', href: 'https://sspaidlisting.smartsuburbs.in/' },
        { label: 'Join Residents Portal', href: 'https://residents.smartsuburbs.in/' },
        { label: 'Featured Articles', href: 'https://bizportal.smartsuburbs.in/' }
      ]
    },
    {
      label: 'Lead Generation',
      href: '#',
      subLinks: [
        { label: 'Lead Generation', href: '/lead-generation-services-agency-pune-mumbai' },
        { label: 'Facebook Ads Management', href: '/facebook-ads-management-packages' },
        { label: 'Google Ad Packages', href: '/google-ad-packages' }
      ]
    },
    { label: 'Contact', href: '/contact_us' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(12,12,30,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.25)' : 'none',
      }}
    >
      <nav className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '38px', height: '38px',
            background: 'linear-gradient(135deg, #FF6B00, #FF8C35)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, color: 'white', fontSize: '16px',
            boxShadow: '0 4px 16px rgba(255,107,0,0.4)',
          }}>SS</div>
          <div>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '17px', lineHeight: '1.1', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Smart<span style={{ color: '#FF6B00' }}>Suburbs</span>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Joh Dikhta Hai Woh Bikta Hai
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '4px', listStyle: 'none', margin: 0, padding: 0 }} className="hidden-mobile">
          {navLinks.map(link => (
            <li key={link.label} style={{ position: 'relative' }} className="nav-item">
              <a
                href={link.href}
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  padding: '8px 14px',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = '#FF6B00';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,107,0,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {link.label} {link.subLinks && <span style={{ fontSize: '10px' }}>▼</span>}
              </a>
              {link.subLinks && (
                <ul className="dropdown-menu">
                  {link.subLinks.map(subLink => (
                    <li key={subLink.label}>
                      <a href={subLink.href} className="dropdown-item">
                        {subLink.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Right side: Theme toggle + phone + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="hidden-mobile">
          <a href="tel:8329693840" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FF6B00'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
          >
            <Phone size={15} /> 8329693840
          </a>
          <a href="https://sspaidlisting.smartsuburbs.in/" className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>
            Get Listed
          </a>
        </div>

        {/* Mobile: hamburger only */}
        <div style={{ display: 'none', alignItems: 'center', gap: '10px' }} className="mobile-right">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(12,12,30,0.98)',
          backdropFilter: 'blur(20px)',
          padding: '24px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          {navLinks.map(link => (
            <div key={link.label}>
              <a
                href={link.href}
                onClick={() => !link.subLinks && setMenuOpen(false)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '16px',
                  fontWeight: 500,
                  padding: '14px 0',
                  borderBottom: link.subLinks ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
              {link.subLinks && (
                <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                  {link.subLinks.map(subLink => (
                    <a
                      key={subLink.label}
                      href={subLink.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                         color: 'rgba(255,255,255,0.6)',
                         fontSize: '15px',
                         padding: '10px 0',
                         textDecoration: 'none',
                      }}
                    >
                      {subLink.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="https://sspaidlisting.smartsuburbs.in/" className="btn-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
            Get Listed Now
          </a>
        </div>
      )}

      <style>{`
        .nav-item:hover .dropdown-menu {
          display: block;
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: rgba(12,12,30,0.98);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 8px 0;
          min-width: 180px;
          list-style: none;
          margin: 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.2s ease;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .dropdown-item {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 20px;
          display: block;
          transition: all 0.2s;
        }
        .dropdown-item:hover {
          color: #FF6B00;
          background: rgba(255,107,0,0.1);
        }

        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .mobile-right { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

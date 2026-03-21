'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pathname = usePathname();

  const isActive = (link: any) => {
    if (link.href === pathname && link.href !== '#') return true;
    if (link.subLinks?.some((s: any) => s.href === pathname)) return true;
    if (link.megaMenu?.some((m: any) => m.items.some((i: any) => i.href === pathname))) return true;
    return false;
  };

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
      label: 'Services',
      href: '/digital-marketing-packages-pune-mumbai',
      megaMenu: [
        {
          title: 'Lead Generation',
          items: [
            { label: 'Lead Generation', href: '/lead-generation-services-agency-pune-mumbai' },
            { label: 'Facebook Ads Management', href: '/facebook-ads-management-packages' },
            { label: 'Google Ad Packages', href: '/google-ad-packages' }
          ]
        },
        {
          title: 'Digital Marketing Services',
          items: [
            { label: 'Video Marketing', href: 'https://Marketingvideos.smartsuburbs.in' },
            { label: 'Content Marketing', href: '/content-marketing-local-businesses-pune-sm001' },
            { label: 'Website Packages', href: '/website-packages-in-pune' },
            { label: 'Social Media Creatives', href: '/social-media-creatives-packages-in-pune' },
            { label: 'Digital Tools', href: 'https://digital.ipsense.com/' },
            { label: 'Pay Now', href: '/pay-us' }
          ]
        }
      ]
    },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'Happy Clients', href: '/happy-clients' },
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
        background: scrolled ? 'var(--bg-white)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
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
            <div style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '17px', lineHeight: '1.1', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Smart<span style={{ color: '#FF6B00' }}>Suburbs</span>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
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
                  color: isActive(link) ? '#FF6B00' : 'var(--text-primary)',
                  background: isActive(link) ? 'var(--bg-light)' : 'transparent',
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
                className="nav-link-anchor"
              >
                {link.label} {(link.subLinks || link.megaMenu) && <span style={{ fontSize: '10px' }}>▼</span>}
              </a>
              
              {/* Standard Dropdown */}
              {link.subLinks && (
                <ul className="dropdown-menu">
                  {link.subLinks.map((subLink: any) => {
                    const isSubActive = subLink.href === pathname;
                    return (
                      <li key={subLink.label}>
                        <a href={subLink.href} className="dropdown-item" style={isSubActive ? { color: '#FF6B00', background: 'var(--bg-light)' } : {}}>
                          {subLink.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
              
              {/* Mega Menu Dropdown */}
              {link.megaMenu && (
                <div className="mega-menu">
                  <div style={{ display: 'flex', gap: '32px' }}>
                    {link.megaMenu.map((col: any) => (
                      <div key={col.title} style={{ flex: 1, minWidth: '220px' }}>
                        <div style={{ color: '#FF6B00', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>
                          {col.title}
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {col.items.map((megaItem: any) => {
                            const isMegaActive = megaItem.href === pathname;
                            return (
                              <li key={megaItem.label}>
                                <a href={megaItem.href} className="dropdown-item" style={{ padding: '8px 12px', borderRadius: '6px', ...(isMegaActive ? { color: '#FF6B00', background: 'var(--bg-light)' } : {}) }}>
                                  {megaItem.label}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right side: phone + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="hidden-mobile">
          <a href="tel:8329693840" className="top-phone-link" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>
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
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--bg-white)',
          backdropFilter: 'blur(20px)',
          padding: '24px',
          borderTop: '1px solid var(--border)',
          maxHeight: 'calc(100vh - 72px)',
          overflowY: 'auto'
        }}>
          {navLinks.map(link => (
            <div key={link.label}>
              <a
                href={link.href}
                onClick={() => !(link.subLinks || link.megaMenu) && setMenuOpen(false)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: isActive(link) ? '#FF6B00' : 'var(--text-primary)',
                  fontSize: '16px',
                  fontWeight: 500,
                  padding: '14px 0',
                  borderBottom: (link.subLinks || link.megaMenu) ? 'none' : '1px solid var(--border)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
              
              {link.subLinks && (
                <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                  {link.subLinks.map((subLink: any) => {
                    const isSubActive = subLink.href === pathname;
                    return (
                      <a
                        key={subLink.label}
                        href={subLink.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          color: isSubActive ? '#FF6B00' : 'var(--text-secondary)',
                          fontSize: '15px',
                          padding: '10px 0',
                          textDecoration: 'none',
                        }}
                      >
                        {subLink.label}
                      </a>
                    );
                  })}
                </div>
              )}

              {link.megaMenu && (
                <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--border)', paddingBottom: '16px', gap: '16px' }}>
                  {link.megaMenu.map((megaCol: any) => (
                    <div key={megaCol.title}>
                      <div style={{ color: '#FF6B00', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                        {megaCol.title}
                      </div>
                      {megaCol.items.map((subLink: any) => {
                        const isMegaActive = subLink.href === pathname;
                        return (
                          <a
                            key={subLink.label}
                            href={subLink.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                              color: isMegaActive ? '#FF6B00' : 'var(--text-secondary)',
                              fontSize: '15px',
                              padding: '8px 0',
                              textDecoration: 'none',
                              display: 'block'
                            }}
                          >
                            {subLink.label}
                          </a>
                        );
                      })}
                    </div>
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
        .nav-link-anchor:hover {
          color: #FF6B00 !important;
          background: rgba(255,107,0,0.1) !important;
        }
        
        .top-phone-link:hover {
           color: #FF6B00 !important;
        }

        .nav-item:hover .dropdown-menu {
          display: block;
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .nav-item:hover .mega-menu {
          display: block;
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
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

        .mega-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px); /* Center mega menu by default */
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          min-width: 500px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          box-shadow: 0 10px 50px rgba(0,0,0,0.4);
        }
        
        /* Specific override: if Left position pushes it off screen */
        .nav-item:nth-last-child(-n+2) .mega-menu {
           left: auto;
           right: 0;
           transform: translateX(0) translateY(10px);
        }
        .nav-item:nth-last-child(-n+2):hover .mega-menu {
           transform: translateX(0) translateY(0);
        }

        .dropdown-item {
          color: var(--text-primary);
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

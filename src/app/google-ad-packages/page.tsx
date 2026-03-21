'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Target, Search, AlertTriangle, ShieldCheck, Phone } from 'lucide-react';
import Link from 'next/link';

export default function GoogleAdsPage() {
  const pricingData = [
    { feature: 'Ad Duration', basic: '2 Months', growth: '4 Months', booster: '6 Months' },
    { feature: 'Ad Setup Fee (Onetime)', basic: 'Rs. 10000/-', growth: 'Rs. 8000/-', booster: 'Rs. 6000/-' },
    { feature: 'Ad Budget ((incl. of 18% GST)', basic: 'Rs. 12000/-\\nmonth', growth: 'Rs. 12000/-\\nmonth', booster: 'Rs. 12000/-\\nmonth' },
    { feature: 'Ad Maintenance Fee (On Ad Budget per mth)', basic: '30%', growth: '20%', booster: '15%' },
    { feature: 'New Landing Page Setup (Onetime)', basic: 'Rs. 10000/-', growth: 'Rs. 9000/-', booster: 'Rs. 8000/-' },
    { feature: 'Client Landing Page Optimization (Onetime)', basic: 'Rs. 8000/-', growth: 'Rs. 8000/-', booster: 'Rs. 8000/-' },
    { feature: 'Lead Capture Popup Form (Onetime)', basic: 'Rs. 8000/-', growth: 'Rs. 7000/-', booster: 'Rs. 6000/-' },
  ];

  const packageTotals = [
    { feature: 'Package Total', basic: 'Rs. 57400/-', growth: 'Rs. 79200/-', booster: 'Rs. 100100/-' },
    { feature: 'Package cost covers', basic: '2 Months', growth: '4 Months', booster: '6 Months' }
  ];

  return (
    <>
      <ThemeToggle />
      <Navbar />
      
      <main style={{ minHeight: '100vh', paddingTop: '72px', backgroundColor: 'var(--bg-white)', color: 'var(--text-primary)' }}>
        
        {/* Page Header */}
        <section style={{ backgroundColor: 'var(--section-light)', paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: '#EA4335', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(234, 67, 53, 0.4)' }}>
                <Search size={32} strokeWidth={2.5} />
              </div>
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.5px' }}>
              Google AD Management <span className="gradient-text">Packages</span>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.6, maxWidth: '700px', margin: '0 auto', marginBottom: '24px' }}>
              Being Google Ad Experts, we believe that your business should grow as fast as you want. Offering a wide variety of PPC packages all over the world.
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-white)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            


            {/* Pricing Packages Table */}
            <div style={{ marginBottom: '80px' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                  Google Ad Management Packages
                </h2>
              </div>
              <div style={{ padding: '0', backgroundColor: 'transparent' }}>
                <div style={{ overflowX: 'auto', borderRadius: '20px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-white)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                  <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', textAlign: 'center' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '24px', borderBottom: '2px solid var(--border)', borderRight: '1px solid var(--border)', backgroundColor: 'var(--section-light)', color: 'var(--text-primary)', fontSize: '18px', fontWeight: 700, textAlign: 'left', width: '35%' }}></th>
                        <th style={{ padding: '24px', borderBottom: '2px solid var(--border)', borderRight: '1px solid var(--border)', backgroundColor: '#135C3E', color: 'white', fontSize: '20px', fontWeight: 800, borderRadius: '0 0 40px 40px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', margin: '0 10px' }}>BASIC<br /><span style={{fontSize: '14px', fontWeight: 600}}>PLAN</span></th>
                        <th style={{ padding: '24px', borderBottom: '2px solid var(--border)', borderRight: '1px solid var(--border)', backgroundColor: '#135C3E', color: 'white', fontSize: '20px', fontWeight: 800, borderRadius: '0 0 40px 40px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', margin: '0 10px' }}>GROWTH<br /><span style={{fontSize: '14px', fontWeight: 600}}>PLAN</span></th>
                        <th style={{ padding: '24px', borderBottom: '2px solid var(--border)', backgroundColor: '#135C3E', color: 'white', fontSize: '20px', fontWeight: 800, borderRadius: '0 0 40px 40px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', margin: '0 10px' }}>BOOSTER<br /><span style={{fontSize: '14px', fontWeight: 600}}>PLAN</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingData.map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s', backgroundColor: i % 2 === 0 ? 'var(--bg-white)' : 'var(--section-light)' }}>
                          <td style={{ padding: '16px 24px', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)', borderRight: '1px solid var(--border)' }}>{row.feature}</td>
                          <td style={{ padding: '16px 24px', color: 'var(--text-primary)', fontWeight: 800, borderRight: '1px solid var(--border)', whiteSpace: 'pre-line' }}>{row.basic}</td>
                          <td style={{ padding: '16px 24px', color: 'var(--text-primary)', fontWeight: 800, borderRight: '1px solid var(--border)', whiteSpace: 'pre-line' }}>{row.growth}</td>
                          <td style={{ padding: '16px 24px', color: 'var(--text-primary)', fontWeight: 800, whiteSpace: 'pre-line' }}>{row.booster}</td>
                        </tr>
                      ))}
                      {/* Totals */}
                      {packageTotals.map((row, i) => (
                        <tr key={'total-'+i} style={{ borderBottom: i === 0 ? '1px solid var(--border)' : 'none', backgroundColor: 'var(--section-light)' }}>
                          <td style={{ padding: i === 0 ? '24px 24px 16px 24px' : '16px 24px 24px 24px', textAlign: 'right', fontWeight: 800, color: 'var(--text-primary)', borderRight: '1px solid var(--border)' }}>{row.feature}</td>
                          <td style={{ padding: i === 0 ? '24px 24px 16px 24px' : '16px 24px 24px 24px', color: 'var(--text-primary)', fontWeight: 900, fontSize: '18px', borderRight: '1px solid var(--border)' }}>{row.basic}</td>
                          <td style={{ padding: i === 0 ? '24px 24px 16px 24px' : '16px 24px 24px 24px', color: 'var(--text-primary)', fontWeight: 900, fontSize: '18px', borderRight: '1px solid var(--border)' }}>{row.growth}</td>
                          <td style={{ padding: i === 0 ? '24px 24px 16px 24px' : '16px 24px 24px 24px', color: 'var(--text-primary)', fontWeight: 900, fontSize: '18px' }}>{row.booster}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ padding: '20px 24px', backgroundColor: 'var(--section-light)', color: 'var(--text-secondary)', fontSize: '13px', borderTop: '2px solid var(--text-primary)' }}>
                    <div style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}><strong>*</strong> We share Google invoices along with our services invoices with our clients.</div>
                    <div style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}><strong>*</strong> Ad performance report will be shared with clients.</div>
                    <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}><strong>*</strong> The final pricing of packages mentioned above vary by +/- 10% - 20%</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#135C3E' }}>
                        <Phone size={18} /> 8888658447 / 8329693840
                      </div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        www.Smartsuburbs.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Click Fraud Section */}
            <div style={{ padding: '60px', backgroundColor: 'var(--section-light)', borderRadius: '24px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={24} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  How to minimise Google Ad Click fraud?
                </h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7, marginBottom: '24px' }}>
                Google Ad Click fraud occurs when someone intentionally clicks on your ads to waste your advertising budget, artificially inflate your ad metrics, or try to damage your business. Here are ways we minimize this:
              </p>
              
              <div className="fraud-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <div style={{ padding: '20px', backgroundColor: 'var(--bg-white)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Monitor Campaigns</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>Regularly checking ad metrics like CTR and conversion rate to spot unusual patterns.</span>
                </div>
                <div style={{ padding: '20px', backgroundColor: 'var(--bg-white)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>IP Exclusions</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>Excluding IP addresses that repeatedly click on your ads from seeing them in the future.</span>
                </div>
                <div style={{ padding: '20px', backgroundColor: 'var(--bg-white)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Fraud Detection Software</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>We use advanced Click fraud detection software (Fraud Blocker) which blocks fraudulent clicks instantly.</span>
                </div>
                <div style={{ padding: '20px', backgroundColor: 'var(--bg-white)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Location Targeting</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>Targeting ads to specific geographic locations where genuine customers are.</span>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px' }}>
                  Hurry up & Curate Your Google Ad with Us
                </h3>
                <Link href="/contact_us" className="btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
                  Contact Us Now
                </Link>
              </div>

            </div>
          </div>
        </section>

      </main>
      
      <Footer />

      <style>{`
        /* Responsive Overrides */
        @media (max-width: 900px) {
          .mission-grid { grid-template-columns: 1fr !important; }
          .fraud-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

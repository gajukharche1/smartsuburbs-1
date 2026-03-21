'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Building, CreditCard, HelpCircle } from 'lucide-react';

export default function PayUsPage() {
  return (
    <>
      <ThemeToggle />
      <Navbar />
      
      <main style={{ minHeight: '100vh', paddingTop: '72px', backgroundColor: 'var(--bg-white)', color: 'var(--text-primary)' }}>
        
        {/* Page Header */}
        <section style={{ backgroundColor: 'var(--section-light)', paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ color: '#FF6B00', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '14px', marginBottom: '16px' }}>
              Secure Payment
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '24px', letterSpacing: '-0.5px' }}>
              Pay Us <span className="gradient-text">Securely</span>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
              Choose your preferred method below to make a payment to IPSense Consultancy Pvt Ltd for Smart Suburbs services.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-white)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              
              {/* Account Transfer Card */}
              <div className="card" style={{ padding: '40px', borderRadius: '24px', border: '1px solid var(--border)', backgroundColor: 'var(--section-light)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building size={24} />
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>Via Account Transfer</h2>
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>Account Name</span>
                    <strong style={{ fontSize: '18px', color: 'var(--text-primary)' }}>IPSense Consultancy Pvt Ltd</strong>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>Current Account Number</span>
                    <strong style={{ fontSize: '18px', color: 'var(--text-primary)', fontFamily: 'monospace' }}>345805000027</strong>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>Bank</span>
                    <strong style={{ fontSize: '18px', color: 'var(--text-primary)' }}>ICICI Bank</strong>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>IFSC Code</span>
                    <strong style={{ fontSize: '18px', color: 'var(--text-primary)', fontFamily: 'monospace' }}>ICIC0003458</strong>
                  </div>
                </div>
              </div>

              {/* Other Options / Contact Card */}
              <div className="card" style={{ padding: '40px', borderRadius: '24px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-white)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(0, 102, 255, 0.1)', color: '#0066FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <HelpCircle size={24} />
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>Need Help?</h2>
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
                  If you have any questions regarding your invoice, payment terms, or need an alternative payment method, please don't hesitate to reach out to our team.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: 'auto' }}>
                  <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'var(--section-light)', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Call Us At</span>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      <a href="tel:8329693840" style={{ color: 'inherit', textDecoration: 'none' }}>8329693840</a> / <a href="tel:8888658447" style={{ color: 'inherit', textDecoration: 'none' }}>8888658447</a>
                    </div>
                  </div>
                  <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'var(--section-light)', border: '1px solid var(--border)' }}>
                     <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Email Us At</span>
                     <a href="mailto:Contact@smartsuburbs.in" style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}>Contact@smartsuburbs.in</a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>
      
      <Footer />
    </>
  );
}

'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you shortly.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ThemeToggle />
      <Navbar />
      
      <main style={{ minHeight: '100vh', paddingTop: '72px', backgroundColor: 'var(--bg-white)', color: 'var(--text-primary)' }}>
        
        {/* Page Header */}
        <section style={{ backgroundColor: 'var(--section-light)', paddingTop: '60px', paddingBottom: '60px', borderBottom: '1px solid var(--border)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.5px' }}>
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
              Have questions or want to discuss a project? We're here to help you grow your local business visibility.
            </p>
          </div>
        </section>

        {/* Main Content Area */}
        <section style={{ padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)', gap: '60px' }}>
              
              {/* Left Column: Contact Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Get In Touch</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
                    Reach out to our team in Pune. We are always ready to discuss your business needs and provide the best local marketing solutions.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Address */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Our Office</h3>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '15px' }}>
                        Nandan Acura, B1-503,<br />
                        Opposite of Manali Restaurant, Baner,<br />
                        Pune – 411045
                      </p>
                      <a 
                        href="https://www.google.com/maps/dir//Smart+Suburbs+Biz+Directories" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="map-link-hover"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--primary)', fontWeight: 600, fontSize: '14px', marginTop: '8px', textDecoration: 'none' }}
                      >
                        Get Direction <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Phone Number</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <a href="tel:8329693840" className="phone-link-hover" style={{ color: 'var(--text-secondary)', fontSize: '16px', fontWeight: 500, textDecoration: 'none' }}>8329693840</a>
                        <a href="tel:8888658447" className="phone-link-hover" style={{ color: 'var(--text-secondary)', fontSize: '16px', fontWeight: 500, textDecoration: 'none' }}>8888658447</a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Email Address</h3>
                      <a href="mailto:Contact@smartsuburbs.in" className="email-link-hover" style={{ color: 'var(--text-secondary)', fontSize: '16px', fontWeight: 500, textDecoration: 'none' }}>
                        Contact@smartsuburbs.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="card" style={{ padding: '40px', borderRadius: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px' }}>Send us a Message</h2>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '20px' }} className="form-row-mobile">
                    {/* Name */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="name" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Full Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="custom-input"
                        placeholder="John Doe" 
                      />
                    </div>
                    {/* Company */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="company" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Company Name</label>
                      <input 
                        type="text" 
                        id="company" 
                        name="company" 
                        value={formData.company}
                        onChange={handleChange}
                        className="custom-input"
                        placeholder="Your Business Ltd." 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '20px' }} className="form-row-mobile">
                    {/* Email */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="email" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="custom-input"
                        placeholder="john@example.com" 
                      />
                    </div>
                    {/* Phone */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="phone" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="custom-input"
                        placeholder="+91 98765 43210" 
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="message" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Your Message *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="custom-input"
                      style={{ minHeight: '120px', resize: 'vertical' }}
                      placeholder="Tell us how we can help you..." 
                    />
                  </div>

                  <button type="submit" className="btn-primary custom-submit-btn" style={{ marginTop: '10px', justifyContent: 'center', width: '100%', padding: '16px' }}>
                    <Send size={18} /> Send Message
                  </button>

                </form>
              </div>

            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      <style>{`
        /* Form Inputs */
        .custom-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1.5px solid var(--border);
          background-color: var(--bg-light);
          color: var(--text-primary);
          font-family: inherit;
          font-size: 15px;
          transition: all 0.2s ease;
          outline: none;
        }
        .custom-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.15);
          background-color: var(--bg-white);
        }
        .custom-input::placeholder {
          color: var(--text-muted);
        }
        
        /* Hover Effects */
        .map-link-hover:hover { text-decoration: underline !important; }
        .phone-link-hover:hover, .email-link-hover:hover { color: var(--primary) !important; }
        
        /* Responsive Overrides */
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
           .form-row-mobile { grid-template-columns: 1fr !important; gap: 20px !important; }
           .card { padding: 24px !important; }
        }
      `}</style>
    </>
  );
}

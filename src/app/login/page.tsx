'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        fontFamily: "'Poppins', sans-serif",
        background: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Left side – Illustration Panel */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f2027 0%, #203a43 40%, #2c5364 100%)',
          padding: '60px 48px',
          position: 'relative',
          overflow: 'hidden',
        }} className="login-left-panel">
          {/* Blobs */}
          <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,107,0,0.15)', top: '-100px', left: '-100px', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(50,190,143,0.2)', bottom: '-60px', right: '-60px', filter: 'blur(60px)' }} />

          {/* Logo */}
          <div style={{ position: 'absolute', top: '32px', left: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #FF6B00, #FF8C35)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: '16px' }}>SS</div>
            <div>
              <div style={{ color: 'white', fontWeight: 800, fontSize: '16px', lineHeight: 1.1 }}>Smart<span style={{ color: '#FF6B00' }}>Suburbs</span></div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Joh Dikhta Hai Woh Bikta Hai</div>
            </div>
          </div>

          {/* SVG Illustration */}
          <svg viewBox="0 0 400 320" style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1 }} xmlns="http://www.w3.org/2000/svg">
            {/* Laptop base */}
            <rect x="60" y="180" width="280" height="16" rx="8" fill="#32be8f" opacity="0.8"/>
            {/* Laptop body */}
            <rect x="90" y="80" width="220" height="105" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
            {/* Screen content */}
            <rect x="106" y="94" width="188" height="77" rx="4" fill="rgba(255,255,255,0.05)"/>
            {/* Code lines */}
            {[0,1,2,3,4].map(i => (
              <rect key={i} x={118} y={104 + i * 14} width={[80, 120, 60, 100, 70][i]} height="6" rx="3" fill="rgba(50,190,143,0.6)" />
            ))}
            {/* Lock icon in center */}
            <circle cx="200" cy="135" r="28" fill="rgba(255,107,0,0.15)" stroke="#FF6B00" strokeWidth="2"/>
            <rect x="189" y="134" width="22" height="16" rx="3" fill="#FF6B00"/>
            <path d="M193 134 C193 126 207 126 207 134" fill="none" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="200" cy="141" r="2.5" fill="white"/>
            <rect x="199" y="143" width="2" height="4" rx="1" fill="white"/>
            {/* Floating elements */}
            <circle cx="330" cy="100" r="8" fill="rgba(50,190,143,0.4)" className="float-1"/>
            <circle cx="80" cy="150" r="5" fill="rgba(255,107,0,0.4)" className="float-2"/>
            <rect x="310" y="160" width="30" height="5" rx="2.5" fill="rgba(255,255,255,0.2)"/>
            <rect x="310" y="170" width="20" height="5" rx="2.5" fill="rgba(255,255,255,0.15)"/>
            {/* Decorative dots */}
            {[0,1,2,3,4].map(i => [0,1,2,3].map(j => (
              <circle key={`${i}-${j}`} cx={340 + i * 10} cy={60 + j * 10} r="1.5" fill="rgba(255,255,255,0.15)"/>
            )))}
            {/* Wave at bottom */}
            <path d="M0 260 Q100 230 200 260 Q300 290 400 260 L400 320 L0 320Z" fill="rgba(50,190,143,0.12)"/>
          </svg>

          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, marginTop: '24px' }}>
            <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 700, margin: '0 0 8px' }}>Smart Suburbs CMS</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', maxWidth: '280px', lineHeight: 1.7 }}>
              Manage your content, blog posts, categories, and site settings from one place.
            </p>
          </div>
        </div>

        {/* Right side – Login Form */}
        <div style={{
          width: '460px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 48px',
          background: '#fff',
          position: 'relative',
        }} className="login-right-panel">

          {/* Wave decoration */}
          <svg viewBox="0 0 460 200" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', opacity: 0.07 }} xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100 Q115 40 230 100 Q345 160 460 100 L460 200 L0 200Z" fill="#32be8f"/>
          </svg>

          <div style={{ width: '100%', maxWidth: '360px', position: 'relative', zIndex: 1 }}>
            {/* Avatar */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{
                width: '80px', height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #32be8f, #0f9973)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 12px 32px rgba(50,190,143,0.35)',
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#2d2d2d', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>
                WELCOME
              </h1>
              <p style={{ color: '#a0a0a0', fontSize: '13px', marginTop: '6px', fontWeight: 400 }}>Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div style={{ marginBottom: '32px', position: 'relative' }} className="input-group">
                <div style={{ display: 'flex', alignItems: 'flex-end', borderBottom: '2px solid #e0e0e0', paddingBottom: '8px', transition: 'border-color 0.3s' }} className="input-border-wrap">
                  <span style={{ marginRight: '12px', color: '#d0d0d0', transition: 'color 0.3s' }} className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <label htmlFor="email" style={{
                      position: 'absolute',
                      top: email ? '-18px' : '0',
                      left: 0,
                      fontSize: email ? '11px' : '14px',
                      fontWeight: 600,
                      color: email ? '#32be8f' : '#b0b0b0',
                      transition: 'all 0.3s ease',
                      pointerEvents: 'none',
                      letterSpacing: '0.5px',
                    }}>
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        fontSize: '15px',
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
                        color: '#2d2d2d',
                        background: 'transparent',
                        paddingTop: '4px',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div style={{ marginBottom: '40px', position: 'relative' }} className="input-group">
                <div style={{ display: 'flex', alignItems: 'flex-end', borderBottom: '2px solid #e0e0e0', paddingBottom: '8px', transition: 'border-color 0.3s' }} className="input-border-wrap">
                  <span style={{ marginRight: '12px', color: '#d0d0d0', transition: 'color 0.3s' }} className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <label htmlFor="password" style={{
                      position: 'absolute',
                      top: password ? '-18px' : '0',
                      left: 0,
                      fontSize: password ? '11px' : '14px',
                      fontWeight: 600,
                      color: password ? '#32be8f' : '#b0b0b0',
                      transition: 'all 0.3s ease',
                      pointerEvents: 'none',
                      letterSpacing: '0.5px',
                    }}>
                      Password
                    </label>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={{
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        fontSize: '15px',
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
                        color: '#2d2d2d',
                        background: 'transparent',
                        paddingTop: '4px',
                        paddingRight: '32px',
                      }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 0, top: '4px', background: 'none', border: 'none', color: '#b0b0b0', cursor: 'pointer', padding: 0 }}>
                      {showPassword ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={{ background: '#fff5f5', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '50px',
                  border: 'none',
                  background: loading ? '#a7e7d3' : 'linear-gradient(135deg, #32be8f, #0f9973)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 8px 24px rgba(50,190,143,0.4)',
                  transition: 'all 0.3s ease',
                }}
                className="login-btn"
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    Signing in...
                  </span>
                ) : 'LOGIN'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <Link href="/" style={{ color: '#32be8f', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
                  ← Back to website
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .login-left-panel { display: none !important; }
          .login-right-panel { width: 100% !important; padding: 40px 28px !important; }
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(50,190,143,0.5) !important;
        }

        .input-group:focus-within .input-border-wrap {
          border-bottom-color: #32be8f !important;
        }

        .input-group:focus-within .input-icon {
          color: #32be8f !important;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin { animation: spin 0.8s linear infinite; }

        @keyframes float1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        .float-1 { animation: float1 3s ease-in-out infinite; }
        .float-2 { animation: float2 2.5s ease-in-out infinite; }
      `}</style>
    </>
  );
}

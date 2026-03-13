'use client';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      className="theme-float-btn"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 1100,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1.5px solid rgba(255,255,255,0.2)',
        background: theme === 'dark'
          ? 'rgba(26,26,46,0.85)'
          : 'rgba(255,255,255,0.85)',
        color: theme === 'dark' ? '#FFB800' : '#0F3460',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'scale(1.12)';
        el.style.boxShadow = '0 6px 28px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'scale(1)';
        el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
      }}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      <style>{`
        .theme-float-btn {
          top: 16px !important;
          right: 16px !important;
        }
        @media (max-width: 640px) {
          .theme-float-btn {
            top: 50% !important;
            right: 0px !important;
            transform: translateY(-50%) !important;
            border-radius: 12px 0 0 12px !important;
            width: 40px !important;
            height: 40px !important;
          }
          .theme-float-btn:hover {
            transform: translateY(-50%) scale(1.05) !important;
          }
        }
      `}</style>
    </button>
  );
}

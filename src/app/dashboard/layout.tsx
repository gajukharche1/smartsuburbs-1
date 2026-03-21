'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Tags,
  Image as ImageIcon,
  Briefcase,
  HelpCircle,
  Star,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push('/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F0F2FF' }}>
        <div style={{ width: 44, height: 44, border: '3px solid #FF6B00', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Posts', href: '/dashboard/posts', icon: FileText },
    { name: 'Categories', href: '/dashboard/categories', roles: ['admin', 'editor'], icon: Tags },
    { name: 'Media', href: '/dashboard/media', roles: ['admin', 'editor'], icon: ImageIcon },
    { name: 'Services', href: '/dashboard/services', roles: ['admin'], icon: Briefcase },
    { name: 'FAQs', href: '/dashboard/faqs', roles: ['admin'], icon: HelpCircle },
    { name: 'Testimonials', href: '/dashboard/testimonials', roles: ['admin'], icon: Star },
    { name: 'Users', href: '/dashboard/users', roles: ['admin'], icon: Users },
  ];

  const currentPage = pathname.split('/').filter(Boolean).pop() || 'Dashboard';

  const SIDEBAR_W = 260;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F4F6FB', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* ── Sidebar ─────────────────────────────────── */}
      <aside style={{
        width: SIDEBAR_W,
        minWidth: SIDEBAR_W,
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
        overflowY: 'auto',
        overflowX: 'hidden',
        transition: 'transform 0.3s ease',
        transform: isMobileOpen ? 'translateX(0)' : undefined,
      }} className="dashboard-sidebar">

        {/* Brand */}
        <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#FF6B00,#FF8C35)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff', fontSize: 14, flexShrink: 0 }}>SS</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: 16, lineHeight: 1.1 }}>Smart<span style={{ color: '#FF6B00' }}>CMS</span></div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Management Portal</div>
            </div>
          </div>

          {/* User Profile */}
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 12px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B00,#FF8C35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: 13, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</p>
              <p style={{ color: '#FF6B00', fontSize: 11, margin: 0, textTransform: 'capitalize', fontWeight: 500 }}>{user.role}</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '12px 12px' }}>
          {navItems.map(item => {
            if (item.roles && !item.roles.includes(user.role)) return null;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  borderRadius: 10,
                  marginBottom: 4,
                  textDecoration: 'none',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 14,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                  background: isActive ? 'linear-gradient(90deg, #FF6B00, #FF8C35)' : 'transparent',
                  boxShadow: isActive ? '0 4px 12px rgba(255,107,0,0.3)' : 'none',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
                className="sidebar-link"
              >
                <Icon size={17} style={{ flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{item.name}</span>
                {isActive && <ChevronRight size={14} style={{ opacity: 0.7 }} />}
              </Link>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={logout}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              width: '100%', padding: '10px 14px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 10, cursor: 'pointer',
              color: '#ef4444', fontWeight: 500, fontSize: 14,
              transition: 'all 0.2s',
            }}
            className="signout-btn"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div onClick={() => setIsMobileOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }} />
      )}

      {/* ── Main Area ──────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: SIDEBAR_W, minWidth: 0 }} className="main-area">

        {/* Top Bar */}
        <header style={{
          height: 60,
          background: '#fff',
          borderBottom: '1px solid #e8ebf0',
          display: 'flex',
          alignItems: 'center',
          padding: '0 28px',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          gap: 16,
        }}>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4 }}
            className="mobile-menu-btn"
          >
            <Menu size={22} />
          </button>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#94a3b8', flex: 1 }}>
            <LayoutDashboard size={14} />
            <span>Smart Suburbs</span>
            <ChevronRight size={14} />
            <span style={{ color: '#1e293b', fontWeight: 600, textTransform: 'capitalize' }}>{currentPage}</span>
          </div>

          {/* User badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f8fafc', border: '1px solid #e8ebf0', borderRadius: 8, padding: '6px 12px' }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B00,#FF8C35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 11 }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{user.name}</span>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto', minWidth: 0 }}>
          {children}
        </main>
      </div>

      <style>{`
        .dashboard-sidebar { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }
        .sidebar-link:hover { background: rgba(255,255,255,0.07) !important; color: #fff !important; }
        .signout-btn:hover { background: rgba(239,68,68,0.2) !important; }
        @media (max-width: 768px) {
          .dashboard-sidebar { transform: translateX(-100%); }
          .dashboard-sidebar.open { transform: translateX(0); }
          .main-area { margin-left: 0 !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

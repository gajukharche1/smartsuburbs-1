'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import {
  FileText, Image as ImageIcon, Users as UsersIcon,
  Tags, Briefcase, HelpCircle, Star,
  Plus, ArrowRight, TrendingUp, Eye, Clock, Zap,
} from 'lucide-react';

interface Stats {
  posts: number;
  categories: number;
  users: number;
}

export default function DashboardHomePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ posts: 0, categories: 0, users: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postsRes, catsRes] = await Promise.all([
          api.get('/posts?limit=100'),
          api.get('/categories'),
        ]);
        const posts = postsRes.data?.posts?.length ?? (Array.isArray(postsRes.data) ? postsRes.data.length : 0);
        const cats = Array.isArray(catsRes.data) ? catsRes.data.length : (catsRes.data?.categories?.length ?? 0);
        setStats(prev => ({ ...prev, posts, categories: cats }));
      } catch {}
    };
    if (user?.role === 'admin' || user?.role === 'editor') fetchStats();
  }, [user]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const day = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  // Stat cards
  const statCards = [
    { label: 'Published Posts', value: stats.posts, icon: FileText, color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe', trend: 'Manage your blog content' },
    { label: 'Categories', value: stats.categories, icon: Tags, color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', trend: 'Content classification' },
    { label: 'Team Members', value: stats.users || '—', icon: UsersIcon, color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe', trend: 'Platform access roles' },
  ];

  // Quick action cards
  const actions = [
    {
      title: 'Blog Posts',
      desc: 'Create and manage your blog content for local SEO reach.',
      href: '/dashboard/posts',
      icon: FileText,
      accent: '#3b82f6',
      accentLight: '#eff6ff',
      cta: 'View Posts',
      roles: ['admin', 'editor', 'viewer'],
    },
    {
      title: 'Categories',
      desc: 'Organize posts into semantic groups for better discoverability.',
      href: '/dashboard/categories',
      icon: Tags,
      accent: '#f59e0b',
      accentLight: '#fffbeb',
      cta: 'Manage Tags',
      roles: ['admin', 'editor'],
    },
    {
      title: 'Media Library',
      desc: 'Upload and manage images optimized for fast web delivery.',
      href: '/dashboard/media',
      icon: ImageIcon,
      accent: '#10b981',
      accentLight: '#ecfdf5',
      cta: 'Open Library',
      roles: ['admin', 'editor'],
    },
    {
      title: 'Services',
      desc: 'Manage the services offered to clients and leads.',
      href: '/dashboard/services',
      icon: Briefcase,
      accent: '#FF6B00',
      accentLight: '#fff7ed',
      cta: 'Edit Services',
      roles: ['admin'],
    },
    {
      title: 'FAQs',
      desc: 'Add and update frequently asked questions on the website.',
      href: '/dashboard/faqs',
      icon: HelpCircle,
      accent: '#06b6d4',
      accentLight: '#ecfeff',
      cta: 'Edit FAQs',
      roles: ['admin'],
    },
    {
      title: 'Testimonials',
      desc: 'Showcase client feedback and social proof on the site.',
      href: '/dashboard/testimonials',
      icon: Star,
      accent: '#ec4899',
      accentLight: '#fdf2f8',
      cta: 'View Reviews',
      roles: ['admin'],
    },
    {
      title: 'User Directory',
      desc: 'Control team access and assign roles across the platform.',
      href: '/dashboard/users',
      icon: UsersIcon,
      accent: '#8b5cf6',
      accentLight: '#f5f3ff',
      cta: 'Manage Users',
      roles: ['admin'],
    },
  ].filter(a => a.roles.includes(user?.role || ''));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* ── Welcome Banner ──────────────────────────── */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #1a3549 100%)',
        borderRadius: 20,
        padding: '36px 40px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,107,0,0.12)', top: -80, right: -60, filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'rgba(59,130,246,0.1)', bottom: -60, left: 100, filter: 'blur(50px)', pointerEvents: 'none' }} />
        {/* Dot grid */}
        <svg style={{ position: 'absolute', right: 40, top: 20, opacity: 0.08 }} width="120" height="100" viewBox="0 0 120 100">
          {Array.from({ length: 5 }).map((_, r) => Array.from({ length: 6 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={c * 22 + 11} cy={r * 20 + 10} r="2.5" fill="white" />
          )))}
        </svg>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            {/* Greeting pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,107,0,0.2)', border: '1px solid rgba(255,107,0,0.3)', borderRadius: 999, padding: '4px 14px', marginBottom: 14 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF6B00', boxShadow: '0 0 0 3px rgba(255,107,0,0.4)', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '1px' }}>{day}</span>
            </div>

            <h1 style={{ fontSize: 30, fontWeight: 800, color: '#fff', margin: '0 0 8px', lineHeight: 1.2 }}>
              {greeting}, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6, maxWidth: 500 }}>
              You're signed in as <span style={{ color: '#FF6B00', fontWeight: 700, textTransform: 'capitalize' }}>{user?.role}</span>. Manage your Smart Suburbs content, blog posts, and team from this unified command centre.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/dashboard/posts/create"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', background: 'linear-gradient(135deg,#FF6B00,#FF8C35)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 8px 24px rgba(255,107,0,0.4)', flexShrink: 0, transition: 'all 0.2s', whiteSpace: 'nowrap' }}
          >
            <Plus size={18} /> Create New Post
          </Link>
        </div>
      </div>

      {/* ── Stats Row ───────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {statCards.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: s.bg, border: `1px solid ${s.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={22} color={s.color} />
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b', marginTop: 3 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{s.trend}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Quick Actions ────────────────────────────── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Zap size={17} color="#FF6B00" />
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: 0 }}>Quick Access</h2>
          </div>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{actions.length} sections available</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {actions.map(a => {
            const Icon = a.icon;
            return (
              <Link
                key={a.href}
                href={a.href}
                style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', padding: '20px 20px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}
                className="dash-action-card"
              >
                {/* Top color strip */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${a.accent}, ${a.accent}cc)`, borderRadius: '16px 16px 0 0' }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginTop: 4 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: a.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={20} color={a.accent} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{a.desc}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 16, fontSize: 12, fontWeight: 700, color: a.accent }}>
                  {a.cta} <ArrowRight size={13} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Info Row ─────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Getting started tips */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <TrendingUp size={16} color="#10b981" />
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', margin: 0 }}>Content Tips</h3>
          </div>
          {[
            { icon: '✍️', tip: 'Write posts with local keywords for better SEO' },
            { icon: '🏷️', tip: 'Tag every post with at least one category' },
            { icon: '🖼️', tip: 'Add a featured image to increase click-through rates' },
            { icon: '📅', tip: 'Publish consistently to build search authority' },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <span style={{ fontSize: 16, lineHeight: 1 }}>{t.icon}</span>
              <span style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{t.tip}</span>
            </div>
          ))}
        </div>

        {/* Quick create shortcuts */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Clock size={16} color="#FF6B00" />
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', margin: 0 }}>Quick Actions</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: '+ New Blog Post', href: '/dashboard/posts/create', color: '#3b82f6', bg: '#eff6ff' },
              { label: '+ New Category', href: '/dashboard/categories', color: '#f59e0b', bg: '#fffbeb' },
              { label: '↗ View Live Blog', href: '/blog', color: '#10b981', bg: '#ecfdf5', external: true },
              { label: '👥 Add Team Member', href: '/dashboard/users', color: '#8b5cf6', bg: '#f5f3ff' },
            ].filter(() => user?.role === 'admin' || true).map((q, i) => (
              <Link
                key={i}
                href={q.href}
                target={q.external ? '_blank' : undefined}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: q.bg, borderRadius: 10, textDecoration: 'none', fontSize: 13, fontWeight: 600, color: q.color, transition: 'all 0.2s' }}
                className="quick-link"
              >
                {q.label}
                <ArrowRight size={13} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .dash-action-card:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important;
          border-color: #d1d5db !important;
        }
        .quick-link:hover {
          filter: brightness(0.95);
          transform: translateX(2px);
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .bottom-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

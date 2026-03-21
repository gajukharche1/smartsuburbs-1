'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Calendar, User, Tag, ArrowRight, Search, BookOpen } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  status: string;
  author: { name: string };
  categories: { _id: string; name: string; slug: string }[];
  createdAt: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, catsRes] = await Promise.all([
          api.get('/posts?status=published'),
          api.get('/categories'),
        ]);
        const postsData = postsRes.data;
        setPosts(Array.isArray(postsData) ? postsData : (postsData.posts || []));
        setCategories(Array.isArray(catsRes.data) ? catsRes.data : (catsRes.data.data || []));
      } catch (err) {
        console.error('Failed to load blog data', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ||
      post.categories?.some(c => c._id === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <ThemeToggle />
      <Navbar />
    <main style={{ minHeight: '100vh', paddingTop: '72px', background: 'var(--bg-base)' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C35 100%)',
        paddingTop: '64px',
        paddingBottom: '64px',
        textAlign: 'center',
      }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', padding: '6px 16px', fontSize: '13px', fontWeight: 600, color: 'white', marginBottom: '20px' }}>
            <BookOpen size={14} /> Smart Suburbs Blog
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: 'white', margin: '0 0 16px' }}>
            Insights & Local Marketing Tips
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', maxWidth: '560px', margin: '0 auto 32px' }}>
            Expert advice on digital marketing, local SEO, and business growth strategies for Pune and Mumbai.
          </p>
          {/* Search */}
          <div style={{ maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,107,0,0.6)' }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '14px 18px 14px 48px',
                borderRadius: '12px', border: 'none', outline: 'none',
                fontSize: '15px', background: 'white',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '40px', alignItems: 'start' }}>

          {/* Posts Grid */}
          <div>
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>Loading articles...</div>
            ) : filteredPosts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
                <BookOpen size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>No articles found</h3>
                <p>Try adjusting your search or category filter.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
                {filteredPosts.map(post => (
                  <Link key={post._id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <article style={{
                      background: 'var(--bg-card)',
                      borderRadius: '16px',
                      border: '1px solid var(--border)',
                      overflow: 'hidden',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      cursor: 'pointer',
                      height: '100%',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}>
                      {/* Featured Image */}
                      {post.featuredImage ? (
                        <img src={post.featuredImage} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <div style={{ width: '100%', height: '200px', background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C35 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <BookOpen size={40} color="rgba(255,255,255,0.5)" />
                        </div>
                      )}
                      <div style={{ padding: '24px' }}>
                        {/* Categories */}
                        {post.categories?.length > 0 && (
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                            {post.categories.map(cat => (
                              <span key={cat._id} style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', background: 'rgba(255,107,0,0.1)', color: '#FF6B00', padding: '4px 10px', borderRadius: '999px' }}>
                                {cat.name}
                              </span>
                            ))}
                          </div>
                        )}
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px', lineHeight: 1.4 }}>
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, margin: '0 0 20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {post.excerpt}
                          </p>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Calendar size={13} />
                              {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            {post.author?.name && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <User size={13} /> {post.author.name}
                              </span>
                            )}
                          </div>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FF6B00', fontWeight: 600, fontSize: '14px' }}>
                            Read <ArrowRight size={16} />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '100px' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tag size={16} color="#FF6B00" /> Categories
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => setSelectedCategory('all')}
                  style={{ textAlign: 'left', padding: '10px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: selectedCategory === 'all' ? 700 : 500, background: selectedCategory === 'all' ? 'rgba(255,107,0,0.1)' : 'transparent', color: selectedCategory === 'all' ? '#FF6B00' : 'var(--text-primary)', fontSize: '14px', transition: 'all 0.2s' }}
                >
                  All Articles
                </button>
                {categories.map(cat => (
                  <button
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat._id)}
                    style={{ textAlign: 'left', padding: '10px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: selectedCategory === cat._id ? 700 : 500, background: selectedCategory === cat._id ? 'rgba(255,107,0,0.1)' : 'transparent', color: selectedCategory === cat._id ? '#FF6B00' : 'var(--text-primary)', fontSize: '14px', transition: 'all 0.2s' }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C35)', borderRadius: '16px', padding: '24px', color: 'white' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>Grow Your Business</h3>
              <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '20px', lineHeight: 1.6 }}>Join 500+ businesses improving their local digital presence with Smart Suburbs.</p>
              <a href="/contact_us" style={{ background: 'white', color: '#FF6B00', padding: '12px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                Get Free Consultation
              </a>
            </div>
          </aside>

        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}

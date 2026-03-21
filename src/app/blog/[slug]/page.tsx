'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Calendar, User, Tag, ArrowLeft, Clock, BookOpen } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  author: { name: string };
  categories: { _id: string; name: string; slug: string }[];
  tags: string[];
  createdAt: string;
  viewCount: number;
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // First find post by slug from the list
        const { data } = await api.get(`/posts?status=published`);
        const posts = Array.isArray(data) ? data : (data.posts || []);
        const found = posts.find((p: Post) => p.slug === slug);
        if (found) {
          // Then fetch full post by ID for complete data  
          const { data: fullPost } = await api.get(`/posts/${found._id}`);
          setPost(fullPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  // Calculate reading time
  const readingTime = post ? Math.max(1, Math.ceil(post.content.split(' ').length / 200)) : 0;

  if (isLoading) return (
    <>
      <ThemeToggle />
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '72px', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
        <BookOpen size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
        <p>Loading article...</p>
      </div>
      </main>
      <Footer />
    </>
  );

  if (error || !post) return (
    <>
      <ThemeToggle />
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '72px', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Article Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog" style={{ color: '#FF6B00', fontWeight: 700, textDecoration: 'none' }}>← Back to Blog</Link>
        </div>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <ThemeToggle />
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '72px', background: 'var(--bg-base)' }}>
      {/* Hero */}
      <section style={{
        position: 'relative',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}>
        {/* Background image or gradient */}
        {post.featuredImage ? (
          <>
            <img src={post.featuredImage} alt={post.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
          </>
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }} />
        )}

        <div className="container" style={{ position: 'relative', padding: '40px 20px', width: '100%' }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px', marginBottom: '24px', transition: 'color 0.2s' }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          {/* Category badges */}
          {post.categories?.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {post.categories.map(cat => (
                <Link key={cat._id} href={`/blog?category=${cat._id}`} style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', background: '#FF6B00', color: 'white', padding: '5px 12px', borderRadius: '999px', textDecoration: 'none' }}>
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          <h1 style={{ fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 800, color: 'white', maxWidth: '800px', lineHeight: 1.25, marginBottom: '20px' }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}>
            {post.author?.name && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} /> {post.author.name}
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} />
              {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} /> {readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px', alignItems: 'start' }}>

          {/* Article Body */}
          <article>
            {post.excerpt && (
              <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--text-secondary)', borderLeft: '4px solid #FF6B00', paddingLeft: '20px', marginBottom: '40px', fontStyle: 'italic' }}>
                {post.excerpt}
              </p>
            )}

            <div
              style={{ color: 'var(--text-primary)', lineHeight: 1.9, fontSize: '16px' }}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <Tag size={16} color="#FF6B00" />
                  {post.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '13px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '999px', padding: '4px 14px', color: 'var(--text-secondary)' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share CTA */}
            <div style={{ marginTop: '40px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h4 style={{ margin: '0 0 4px', color: 'var(--text-primary)', fontWeight: 700 }}>Found this helpful?</h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Share it with your network</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ padding: '10px 20px', background: '#25D366', color: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}
                >
                  Share on WhatsApp
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ padding: '10px 20px', background: '#0A66C2', color: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '100px' }}>
            <div style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C35)', borderRadius: '16px', padding: '28px', color: 'white', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>Grow Your Business Locally</h3>
              <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.7, marginBottom: '20px' }}>
                Smart Suburbs helps businesses get found by local customers in Pune and Mumbai.
              </p>
              <Link href="/contact_us" style={{ display: 'block', background: 'white', color: '#FF6B00', padding: '12px', borderRadius: '10px', fontWeight: 700, textAlign: 'center', textDecoration: 'none', fontSize: '15px' }}>
                Get Free Consultation
              </Link>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
              <h4 style={{ margin: '0 0 16px', color: 'var(--text-primary)', fontWeight: 700 }}>More Articles</h4>
              <Link href="/blog" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF6B00', fontWeight: 600, textDecoration: 'none' }}>
                <BookOpen size={16} /> Browse all articles
              </Link>
            </div>
          </aside>

        </div>
      </section>

      <style>{`
        .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
          color: var(--text-primary);
          font-weight: 700;
          margin-top: 2em;
          margin-bottom: 0.75em;
          line-height: 1.3;
        }
        .blog-content h2 { font-size: 1.6em; border-bottom: 2px solid var(--border); padding-bottom: 0.5em; }
        .blog-content h3 { font-size: 1.3em; }
        .blog-content p { margin-bottom: 1.25em; }
        .blog-content ul, .blog-content ol { padding-left: 1.5em; margin-bottom: 1.25em; }
        .blog-content li { margin-bottom: 0.5em; }
        .blog-content a { color: #FF6B00; text-decoration: underline; }
        .blog-content blockquote {
          border-left: 4px solid #FF6B00;
          padding: 16px 20px;
          margin: 24px 0;
          background: rgba(255,107,0,0.05);
          border-radius: 0 12px 12px 0;
          color: var(--text-secondary);
          font-style: italic;
        }
        .blog-content img { max-width: 100%; border-radius: 12px; margin: 20px 0; }
        .blog-content code { background: var(--bg-light); padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
        .blog-content pre { background: #1a1a2e; color: #e0e0e0; padding: 20px; border-radius: 12px; overflow-x: auto; margin: 20px 0; }
        @media (max-width: 768px) {
          .container { grid-template-columns: 1fr !important; }
          aside { position: static !important; }
        }
      `}</style>
    </main>
    <Footer />
    </>
  );
}

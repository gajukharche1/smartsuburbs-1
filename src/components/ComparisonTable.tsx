'use client';
import { Check, X, Minus } from 'lucide-react';

const rows = [
  { category: 'Visibility', ss: 'Dominates suburb-level searches', jd: 'Covers entire cities (Less HyperLocal)', sul: 'City-wide focus, not HyperLocal' },
  { category: 'Cost & ROI', ss: '₹7,000/year – Google 1st-Page Visibility', jd: '₹33,000/year – Low ROI', sul: '₹25,000–₹40,000/year – Lower Local ROI' },
  { category: 'Lead Quality', ss: 'Local searches, local leads', jd: 'Less converting, distant leads', sul: 'Mixed-quality leads, many non-local' },
  { category: 'Deep Content', ss: 'FEATURED Article & Local Events', jd: 'Absence of Backlinks & Local Events', sul: 'Limited content depth, no local events' },
  { category: 'Local Social', ss: 'Local reach via 16 Local Social Media Posts', jd: 'No local social media presence', sul: 'No local social amplification' },
];

export default function ComparisonTable() {
  return (
    <section id="compare" style={{ background: 'var(--section-white)', paddingTop: '100px', paddingBottom: '100px', transition: 'background 0.3s ease' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="badge badge-orange" style={{ marginBottom: '14px' }}>🆚 Compare</div>
          <h2 className="section-title" style={{ marginBottom: '14px' }}>
            Where does City-wide Directories fall short<br />
            <span className="gradient-text">for Local Businesses</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            The 5 KM Promise: Directories like JustDial or Sulekha send you leads from 10-30 Kms away. We focus only on customers living within 5 KMs of your business, maximizing footfall and retention.
          </p>
        </div>

        {/* Table */}
        <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr 1.6fr 1.6fr', background: 'linear-gradient(135deg, #1A1A2E, #0F3460)' }}>
            <div style={{ padding: '20px 24px', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px' }}>Category</div>
            {[
              { name: 'Smart Suburbs', highlight: true, badge: '⭐ Best Choice' },
              { name: 'Just Dial', highlight: false, badge: '₹33K/year' },
              { name: 'Sulekha', highlight: false, badge: '₹25K+/year' },
            ].map((col, i) => (
              <div key={i} style={{ padding: '20px 24px', borderLeft: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                <div style={{ color: col.highlight ? '#FF6B00' : 'white', fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>{col.name}</div>
                <div style={{ padding: '2px 10px', borderRadius: '20px', background: col.highlight ? 'rgba(255,107,0,0.2)' : 'rgba(255,255,255,0.08)', color: col.highlight ? '#FF8C35' : 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 600, display: 'inline-block' }}>
                  {col.badge}
                </div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr 1.6fr 1.6fr', background: i % 2 === 0 ? 'var(--section-white)' : 'var(--table-row-alt)', borderTop: '1px solid var(--border)', transition: 'background 0.3s ease' }}>
              <div style={{ padding: '18px 24px', fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }}>
                {row.category}
              </div>
              {[row.ss, row.jd, row.sul].map((cell, j) => (
                <div key={j} style={{ padding: '18px 24px', borderLeft: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: '10px', background: j === 0 ? 'var(--table-row-ss)' : 'transparent' }}>
                  {j === 0 ? (
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#00C85115', border: '1.5px solid #00C851', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <Check size={10} color="#00C851" strokeWidth={3} />
                    </div>
                  ) : (
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#FF444415', border: '1.5px solid #FF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <X size={10} color="#FF4444" strokeWidth={3} />
                    </div>
                  )}
                  <span style={{ fontSize: '13px', lineHeight: '1.5', fontWeight: j === 0 ? 600 : 400, color: j === 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{cell}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <a href="https://wakad.in/competitor-comparison/" style={{ color: '#FF6B00', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>
            View Full Comparison Report →
          </a>
        </div>
      </div>
    </section>
  );
}

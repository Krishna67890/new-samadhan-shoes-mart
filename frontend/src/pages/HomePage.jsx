import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: '#F7F5F0',
        color: '#111111',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 24px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: '1080px', width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <Sparkles size={16} color="#8B0000" />
          <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.45em', color: '#8B0000', textTransform: 'uppercase' }}>
            NEW SAMADHAN SHOE MART · EST. 1990
          </span>
        </div>

        <h1 style={{
          margin: 0,
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          fontSize: 'clamp(3rem, 8vw, 6.5rem)',
        }}>
          THE MANIFESTO OF <br />
          FOOTWEAR PURISM. <br />
          <span style={{ fontStyle: 'italic', fontWeight: 300, color: '#8B0000' }}>NO DISTRACTIONS.</span>
        </h1>

        <p style={{ fontSize: '18px', opacity: 0.75, maxWidth: '640px', marginTop: '36px', lineHeight: 1.8 }}>
          We reject automated mass-moulding and transient fast-fashion. New Samadhan Shoe Mart champions strict anatomical precision, vegetable-tanned full-grain leather architecture, and lifetime resoleable Goodyear welt craftsmanship.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginTop: '48px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/products')}
            style={{
              background: '#111111',
              color: '#F7F5F0',
              padding: '20px 40px',
              border: 'none',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
          >
            Browse Products <ArrowRight size={16} />
          </button>
          <Link
            to="/workshop"
            style={{
              background: 'transparent',
              color: '#111111',
              padding: '20px 36px',
              border: '1px solid rgba(17,17,17,0.2)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '12px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            Enter The Workshop <Compass size={16} />
          </Link>
        </div>

        {/* Minimalist Core Standards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginTop: '96px',
          paddingTop: '48px',
          borderTop: '1px solid rgba(17,17,17,0.1)'
        }}>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#8B0000', display: 'block', marginBottom: '8px' }}>01 / PHILOSOPHY</span>
            <h3 style={{ fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 12px' }}>Anatomical lasts</h3>
            <p style={{ fontSize: '13px', opacity: 0.6, margin: 0, lineHeight: 1.6 }}>Over 32 ergonomic kinetic points calculated to completely eliminate plantar fatigue and initial break-in distress.</p>
          </div>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#8B0000', display: 'block', marginBottom: '8px' }}>02 / SUSTAINABILITY</span>
            <h3 style={{ fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 12px' }}>European Top Hides</h3>
            <p style={{ fontSize: '13px', opacity: 0.6, margin: 0, lineHeight: 1.6 }}>100% full-grain materials free from toxic PVC and chemical coatings, letting your footwear breathe naturally.</p>
          </div>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#8B0000', display: 'block', marginBottom: '8px' }}>03 / DEDICATION</span>
            <h3 style={{ fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 12px' }}>Goodyear Welting</h3>
            <p style={{ fontSize: '13px', opacity: 0.6, margin: 0, lineHeight: 1.6 }}>Traditional lockstitched welt coupled with authentic Portuguese granulated cork bed that custom-molds to your feet.</p>
          </div>
        </div>

        {/* Flagship Atelier Information Block */}
        <div style={{
          marginTop: '80px',
          background: 'rgba(17,17,17,0.03)',
          borderRadius: '20px',
          padding: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px'
        }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, textTransform: 'uppercase' }}>Nashik Flagship Atelier Hub</h4>
            <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.6 }}>Plot No 29, Santkrupa Niwas, Nashik 422003 · Concierge: +91 9423228843</p>
          </div>
          <Link
            to="/gallery"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#8B0000',
              textDecoration: 'none'
            }}
          >
            Explore Curated Gallery →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
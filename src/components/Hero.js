import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const TYPED_WORDS = ['Full Stack Developer', 'AI Integrator', 'UI/UX Enthusiast', 'Problem Solver'];

function Hero() {
  const heroRef    = useRef(null);
  const contentRef = useRef(null);
  const [wordIndex, setWordIndex]   = useState(0);
  const [displayed, setDisplayed]   = useState('');
  const [deleting, setDeleting]     = useState(false);
  const [visible, setVisible]       = useState(false);

  // Staggered entrance
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Typewriter — multi-word loop
  useEffect(() => {
    const word    = TYPED_WORDS[wordIndex];
    const speed   = deleting ? 45 : 90;
    const pause   = deleting ? 0 : 1800;

    if (!deleting && displayed === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && displayed === '') {
      setDeleting(false);
      setWordIndex(i => (i + 1) % TYPED_WORDS.length);
      return;
    }

    const t = setTimeout(() => {
      setDisplayed(prev =>
        deleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIndex]);

  // Subtle parallax tilt — reduced intensity
  useEffect(() => {
    const hero    = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content) return;

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      content.style.transform = `perspective(1200px) rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;
    };
    const onLeave = () => {
      content.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const fadeStyle = (delay = 0) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        @keyframes hero-gridFade {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes hero-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(88,166,255,0.4); }
          50%      { box-shadow: 0 0 0 10px rgba(88,166,255,0); }
        }
        @keyframes hero-blink {
          0%,49% { opacity: 1; } 50%,100% { opacity: 0; }
        }
        @keyframes hero-scrollBob {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }
        @keyframes hero-glow {
          0%,100% { opacity: 0.5; } 50% { opacity: 1; }
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 30px;
          border-radius: 10px;
          background: #58a6ff;
          color: #0d1117;
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: 0.04em;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
          animation: hero-pulse 2.5s infinite;
        }
        .hero-btn-primary:hover {
          background: #79bcff;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(88,166,255,0.35);
          color: #0d1117;
          animation: none;
        }

        .hero-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 30px;
          border-radius: 10px;
          background: transparent;
          color: #8b949e;
          font-weight: 600;
          font-size: 0.88rem;
          letter-spacing: 0.04em;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.1);
          transition: border-color 0.25s, color 0.25s, transform 0.2s;
        }
        .hero-btn-ghost:hover {
          border-color: rgba(88,166,255,0.4);
          color: #58a6ff;
          transform: translateY(-3px);
        }

        .hero-stat {
          padding: 14px 20px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          text-align: center;
          transition: border-color 0.25s, background 0.25s;
          cursor: default;
          flex: 1;
          min-width: 100px;
        }
        .hero-stat:hover {
          border-color: rgba(88,166,255,0.25);
          background: rgba(88,166,255,0.05);
        }

        .hero-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          color: #8b949e;
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.2s, border-color 0.2s, transform 0.2s;
        }
        .hero-social:hover {
          color: #58a6ff;
          border-color: rgba(88,166,255,0.3);
          transform: translateY(-3px);
        }

        .hero-scroll-dot {
          width: 6px; height: 6px;
          background: #58a6ff;
          border-radius: 50%;
          animation: hero-scrollBob 1.6s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={heroRef}
        style={{
          minHeight: '100vh',
          backgroundColor: '#0d1117',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '5rem 0 3rem',
        }}
      >
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
          animation: 'hero-gridFade 1.2s ease both',
          pointerEvents: 'none',
        }} />

        {/* Glow orbs */}
        <div style={{
          position: 'absolute', top: '-120px', right: '-60px',
          width: '520px', height: '520px',
          background: 'radial-gradient(circle, rgba(88,166,255,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
          animation: 'hero-glow 5s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '10%',
          width: '380px', height: '380px',
          background: 'radial-gradient(circle, rgba(88,166,255,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
          animation: 'hero-glow 7s ease-in-out infinite reverse',
        }} />

        <div className="container px-4">
          <div
            ref={contentRef}
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              textAlign: 'center',
              transition: 'transform 0.15s ease',
            }}
          >
            {/* Eyebrow */}
            <div style={{ ...fadeStyle(0.1), marginBottom: '1.25rem' }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                color: '#58a6ff',
                textTransform: 'uppercase',
              }}>
                &lt; Hello, World! /&gt;
              </span>
            </div>

            {/* Name */}
            <h1 style={{
              ...fadeStyle(0.25),
              color: '#e6edf3',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 7vw, 4.25rem)',
              lineHeight: 1.1,
              marginBottom: '0.75rem',
              letterSpacing: '-0.02em',
            }}>
              Pratik{' '}
              <span style={{ color: '#58a6ff' }}>Shinde</span>
            </h1>

            {/* Typewriter */}
            <div style={{ ...fadeStyle(0.4), marginBottom: '1.25rem', minHeight: '2rem' }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                color: '#cdd9e5',
                fontWeight: 500,
              }}>
                {displayed}
                <span style={{
                  display: 'inline-block',
                  width: '2px', height: '1.1em',
                  background: '#58a6ff',
                  marginLeft: '2px',
                  verticalAlign: 'text-bottom',
                  animation: 'hero-blink 1s infinite',
                }} />
              </span>
            </div>

            {/* Tagline */}
            <p style={{
              ...fadeStyle(0.5),
              color: '#8b949e',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              lineHeight: 1.75,
              marginBottom: '2.25rem',
              maxWidth: '520px',
              margin: '0 auto 2.25rem',
            }}>
              I build scalable, production-ready web apps — from clean React/Next.js UIs to robust Python backends OR ServerLess Web apps — with a focus on performance, security, and great UX.
            </p>

            {/* CTAs */}
            <div style={{
              ...fadeStyle(0.65),
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '3rem',
            }}>
              <Link to="/contact" className="hero-btn-primary">
                ✉️ Get in Touch
              </Link>
              <Link to="/portfolio" className="hero-btn-ghost">
                View My Work →
              </Link>
            </div>

            {/* Stats row */}
            <div style={{
              ...fadeStyle(0.8),
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '3rem',
            }}>
              {[
                { num: '15+', label: 'Projects ' },
                { num: '2+',  label: 'Years Experience' },
                { num: '20+',  label: 'Tech Stacks' },
              ].map(({ num, label }) => (
                <div key={label} className="hero-stat">
                  <div style={{ color: '#58a6ff', fontWeight: 800, fontSize: '1.5rem', lineHeight: 1.1 }}>{num}</div>
                  <div style={{ color: '#484f58', fontSize: '0.68rem', fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '3px' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Social row */}
            <div style={{ ...fadeStyle(0.95), display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '3.5rem' }}>
              <a href="https://github.com/Pratik9984" target="_blank" rel="noopener noreferrer" className="hero-social" aria-label="GitHub">
                <i className="bi bi-github" />
              </a>
              <a href="https://www.linkedin.com/in/pratik-shinde-54743725a/" target="_blank" rel="noopener noreferrer" className="hero-social" aria-label="LinkedIn">
                <i className="bi bi-linkedin" />
              </a>
              <a href="mailto:pratikshinde0165@gmail.com" className="hero-social" aria-label="Email">
                <i className="bi bi-envelope" />
              </a>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: visible ? 0.5 : 0,
          transition: 'opacity 0.8s ease 1.5s',
        }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#484f58', letterSpacing: '0.15em', textTransform: 'uppercase' }}>scroll</span>
          <div className="hero-scroll-dot" />
        </div>

      </section>
    </>
  );
}

export default Hero;
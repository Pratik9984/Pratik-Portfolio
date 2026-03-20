import React, { useEffect, useRef, useState } from 'react';

const links = [
  { href: 'https://github.com/Pratik9984', label: 'GitHub', icon: 'bi bi-github' },
  { href: 'https://www.linkedin.com/in/pratik-shinde-54743725a/', label: 'LinkedIn', icon: 'bi bi-linkedin' },
  { href: 'https://twitter.com/pratikshinde', label: 'Twitter', icon: 'bi bi-twitter-x' },
];

const navLinks = [
  { href: '#about',    label: 'About' },
  { href: '#skills',   label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact' },
];

function Footer() {
  const [visible, setVisible] = useState(false);
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes ft-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ft-visible    { animation: ft-fadeUp 0.6s ease both; }
        .ft-visible.d1 { animation-delay: 0.1s; }
        .ft-visible.d2 { animation-delay: 0.2s; }
        .ft-visible.d3 { animation-delay: 0.3s; }

        .ft-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          color: #8b949e;
          font-size: 1rem;
          text-decoration: none;
          transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s;
          position: relative;
        }
        .ft-social:hover {
          background: rgba(88,166,255,0.1);
          border-color: rgba(88,166,255,0.3);
          color: #58a6ff;
          transform: translateY(-3px);
        }
        .ft-social::after {
          content: attr(data-label);
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: #161b22;
          border: 1px solid rgba(88,166,255,0.2);
          color: #cdd9e5;
          font-size: 0.65rem;
          font-family: monospace;
          letter-spacing: 0.08em;
          padding: 4px 9px;
          border-radius: 6px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
        }
        .ft-social:hover::after { opacity: 1; }

        .ft-nav-link {
          font-family: monospace;
          font-size: 0.72rem;
          color: #484f58;
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
          padding: 4px 0;
        }
        .ft-nav-link:hover { color: #58a6ff; }

        .ft-back-top {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: monospace;
          font-size: 0.68rem;
          color: #484f58;
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.06);
          padding: 6px 14px;
          border-radius: 20px;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          cursor: pointer;
          background: none;
        }
        .ft-back-top:hover {
          color: #58a6ff;
          border-color: rgba(88,166,255,0.3);
          background: rgba(88,166,255,0.06);
        }
      `}</style>

      <footer
        ref={footerRef}
        style={{
          backgroundColor: '#0d1117',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '3rem 0 2rem',
        }}
      >
        <div className="container">

          {/* Top row: logo + nav links */}
          <div className={`d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4 pb-4 ${visible ? 'ft-visible' : 'opacity-0'}`}
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>

            {/* Logo / name */}
            <div>
              <span style={{ fontFamily: 'monospace', color: '#58a6ff', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                PS<span style={{ color: '#484f58' }}>_</span>
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: '#484f58', marginLeft: '10px', letterSpacing: '0.1em' }}>
                Full Stack Developer
              </span>
            </div>

            {/* Nav links */}
            <nav className="d-flex gap-4 flex-wrap">
              {navLinks.map(({ href, label }) => (
                <a key={label} href={href} className="ft-nav-link">{label}</a>
              ))}
            </nav>
          </div>

          {/* Bottom row: copyright + socials + back to top */}
          <div className={`d-flex flex-wrap justify-content-between align-items-center gap-3 ${visible ? 'ft-visible d2' : 'opacity-0'}`}>

            {/* Copyright */}
            <p style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: '#484f58', margin: 0, letterSpacing: '0.05em' }}>
              © {currentYear} Pratik Shinde 
            </p>

            {/* Social icons */}
            <div className="d-flex gap-2">
              {links.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social"
                  data-label={label}
                  aria-label={label}
                >
                  <i className={icon} />
                </a>
              ))}
            </div>

            {/* Back to top */}
            <button
              className="ft-back-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
            >
              ↑ Back to top
            </button>

          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

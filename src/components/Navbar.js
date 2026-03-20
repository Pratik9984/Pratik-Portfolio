import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/',          label: 'Home' },
  { path: '/about',     label: 'About' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/services',  label: 'Services' },
  { path: '/contact',   label: 'Contact' },
];

function Navbar() {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [prevY, setPrevY]         = useState(0);
  const [hidden, setHidden]       = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [location]);

  // Scroll: blur + hide-on-scroll-down
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > prevY && y > 80);
      setPrevY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [prevY]);

  return (
    <>
      <style>{`
        .nb-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1),
                      background 0.3s ease,
                      box-shadow 0.3s ease;
        }
        .nb-root.nb-scrolled {
          background: rgba(13,17,23,0.82) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 1px 0 rgba(255,255,255,0.06);
        }
        .nb-root.nb-hidden { transform: translateY(-100%); }

        .nb-link {
          font-family: monospace;
          font-size: 0.73rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8b949e;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 8px;
          border: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .nb-link:hover {
          color: #e6edf3;
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.07);
        }
        .nb-link.nb-active {
          color: #58a6ff;
          background: rgba(88,166,255,0.08);
          border-color: rgba(88,166,255,0.2);
        }

        .nb-cta {
          font-family: monospace;
          font-size: 0.73rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0d1117;
          background: #58a6ff;
          font-weight: 700;
          text-decoration: none;
          padding: 7px 18px;
          border-radius: 8px;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .nb-cta:hover {
          background: #79bcff;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(88,166,255,0.3);
          color: #0d1117;
        }

        /* Hamburger */
        .nb-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 0 8px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .nb-burger:hover {
          border-color: rgba(88,166,255,0.3);
          background: rgba(88,166,255,0.06);
        }
        .nb-bar {
          width: 100%; height: 1.5px;
          background: #8b949e;
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease, background 0.2s;
        }
        .nb-burger.nb-open .nb-bar:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: #58a6ff; }
        .nb-burger.nb-open .nb-bar:nth-child(2) { opacity: 0; }
        .nb-burger.nb-open .nb-bar:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: #58a6ff; }

        /* Mobile menu */
        .nb-mobile {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1);
          background: rgba(13,17,23,0.97);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .nb-mobile.nb-mobile-open { max-height: 420px; }
        .nb-mobile-inner {
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .nb-mobile-link {
          font-family: monospace;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8b949e;
          text-decoration: none;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nb-mobile-link:hover {
          color: #e6edf3;
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.07);
        }
        .nb-mobile-link.nb-active {
          color: #58a6ff;
          background: rgba(88,166,255,0.07);
          border-color: rgba(88,166,255,0.18);
        }

        @media (max-width: 768px) {
          .nb-burger { display: flex; }
          .nb-desktop { display: none !important; }
        }
        @media (min-width: 769px) {
          .nb-mobile { display: none !important; }
        }
      `}</style>

      {/* Nav bar */}
      <nav
        className={`nb-root ${scrolled ? 'nb-scrolled' : ''} ${hidden && !isOpen ? 'nb-hidden' : ''}`}
        style={{ background: scrolled ? undefined : 'rgba(13,17,23,0.0)' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1rem', color: '#e6edf3', letterSpacing: '0.02em' }}>
                Pratik
              </span>
              <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1rem', color: '#58a6ff', letterSpacing: '0.02em' }}>
                Shinde
              </span>
              <span style={{ fontFamily: 'monospace', color: '#484f58', fontSize: '1rem' }}>.dev</span>
            </Link>

            {/* Desktop links */}
            <div className="nb-desktop" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {navItems.slice(0, -1).map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`nb-link ${location.pathname === path ? 'nb-active' : ''}`}
                >
                  {label}
                </Link>
              ))}
              {/* Contact as CTA */}
              <Link to="/contact" className="nb-cta" style={{ marginLeft: '8px' }}>
                Let's Talk
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className={`nb-burger ${isOpen ? 'nb-open' : ''}`}
              onClick={() => setIsOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div className="nb-bar" />
              <div className="nb-bar" />
              <div className="nb-bar" />
            </button>

          </div>
        </div>

        {/* Mobile menu */}
        <div className={`nb-mobile ${isOpen ? 'nb-mobile-open' : ''}`}>
          <div className="nb-mobile-inner">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nb-mobile-link ${location.pathname === path ? 'nb-active' : ''}`}
              >
                {label}
                <span style={{ color: '#30363d', fontSize: '0.75rem' }}>→</span>
              </Link>
            ))}
          </div>
        </div>

      </nav>

      {/* Spacer so content doesn't hide behind fixed nav */}
      <div style={{ height: '64px' }} />
    </>
  );
}

export default Navbar;
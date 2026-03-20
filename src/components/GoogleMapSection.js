import React, { useEffect, useRef, useState } from 'react';

function GoogleMapSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes gm-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .gm-visible { animation: gm-fadeUp 0.65s ease both; }

        .gm-map-wrap {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(88,166,255,0.12);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .gm-map-wrap:hover {
          border-color: rgba(88,166,255,0.3);
          box-shadow: 0 12px 40px rgba(88,166,255,0.12);
        }
        .gm-map-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #58a6ff, transparent);
          opacity: 0.55;
          z-index: 1;
        }

        /* Dark-tint overlay so the map blends with the dark theme */
        .gm-map-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(13,17,23,0.18);
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      <div
        ref={ref}
        className={`mt-5 ${visible ? 'gm-visible' : 'opacity-0'}`}
      >
        {/* Eyebrow */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <div style={{ width: '24px', height: '1px', background: '#58a6ff' }} />
          <span style={{
            fontFamily: 'monospace',
            fontSize: '0.68rem',
            color: '#58a6ff',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            // location
          </span>
        </div>

        <h4 style={{ color: '#e6edf3', fontWeight: 600, marginBottom: '1rem', fontSize: '1rem' }}>
          Pune, Maharashtra, India
        </h4>

        <div className="gm-map-wrap">
          <iframe
            title="Pratik Shinde — Pune, Maharashtra"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.476267956362!2d73.8567437752076!3d18.55352068254459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07e6c1e9e3f%3A0x8f3f4f3e3c3c3c3c!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1695830000000!5m2!1sen!2sin"
            width="100%"
            height="320"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Info pill below map */}
        <div className="d-flex align-items-center gap-2 mt-3">
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#3fb950', boxShadow: '0 0 7px #3fb950',
            display: 'inline-block', flexShrink: 0,
          }} />
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#8b949e', letterSpacing: '0.05em' }}>
            Open to remote &amp; on-site opportunities in Pune
          </span>
        </div>
      </div>
    </>
  );
}

export default GoogleMapSection;
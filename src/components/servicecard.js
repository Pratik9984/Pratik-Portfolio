import React, { useEffect, useState } from 'react';

function ServiceCard({ icon, name, color = '#58a6ff', details, isActive, onClick }) {
  const [hovered, setHovered]         = useState(false);
  const [animatingIn, setAnimatingIn] = useState(false);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimatingIn(true)));
    } else {
      document.body.style.overflow = 'unset';
      setAnimatingIn(false);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isActive]);

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setAnimatingIn(false);
    setTimeout(onClick, 320);
  };

  return (
    <>
      <style>{`
        @keyframes sc-borderSweep {
          from { width: 0; } to { width: 100%; }
        }
        .sc-card-inner::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, transparent, var(--sc-color), transparent);
          transition: width 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
          border-radius: 2px 2px 0 0;
        }
        .sc-card-inner.sc-hovered::before { width: 100%; }

        .sc-close-btn {
          margin-top: 2rem;
          padding: 9px 28px;
          border-radius: 50px;
          background: transparent;
          border: 1px solid var(--sc-color);
          color: var(--sc-color);
          cursor: pointer;
          font-family: monospace;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          transition: background 0.2s, transform 0.2s;
          position: relative;
          z-index: 2;
        }
        .sc-close-btn:hover {
          background: rgba(255,255,255,0.06);
          transform: scale(1.04);
        }
      `}</style>

      {/* ── Card ── */}
      <div
        style={{ position: 'relative', width: '220px', cursor: 'pointer' }}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`sc-card-inner ${hovered ? 'sc-hovered' : ''}`}
          style={{
            '--sc-color': color,
            width: '220px',
            height: '220px',
            backgroundColor: '#161b22',
            border: `1px solid ${hovered ? color + '55' : 'rgba(88,166,255,0.1)'}`,
            borderRadius: '18px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'translateY(-7px)' : 'translateY(0)',
            boxShadow: hovered ? `0 16px 40px ${color}18` : '0 4px 16px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', top: '20%', left: '50%',
            transform: 'translateX(-50%)',
            width: '90px', height: '90px',
            background: color,
            filter: 'blur(55px)',
            opacity: hovered ? 0.18 : 0.06,
            pointerEvents: 'none',
            transition: 'opacity 0.4s',
          }} />

          {/* Icon */}
          <div style={{
            fontSize: '2.6rem',
            zIndex: 2,
            transition: 'transform 0.35s ease',
            transform: hovered ? 'scale(1.15)' : 'scale(1)',
          }}>
            {icon}
          </div>

          {/* Name */}
          <h4 style={{
            marginTop: '1.25rem',
            color: hovered ? '#e6edf3' : '#cdd9e5',
            fontWeight: 700,
            fontSize: '0.95rem',
            textAlign: 'center',
            zIndex: 2,
            transition: 'color 0.3s',
            lineHeight: 1.3,
          }}>
            {name}
          </h4>

          {/* Hint */}
          <div style={{
            position: 'absolute', bottom: '14px',
            fontFamily: 'monospace', fontSize: '0.58rem',
            color: hovered ? color : '#30363d',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            transition: 'color 0.3s',
          }}>
            click to expand
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {isActive && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(13,17,23,0.88)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 1000,
              opacity: animatingIn ? 1 : 0,
              transition: 'opacity 0.35s ease',
            }}
            onClick={handleClose}
          />

          {/* Modal panel */}
          <div style={{
            '--sc-color': color,
            position: 'fixed',
            top: '50%', left: '50%',
            width: 'min(90vw, 560px)',
            backgroundColor: '#161b22',
            border: `1px solid ${color}55`,
            borderRadius: '24px',
            boxShadow: `0 24px 70px rgba(0,0,0,0.55), 0 0 60px ${color}18`,
            zIndex: 1001,
            padding: '3rem 2.5rem',
            cursor: 'default',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            opacity: animatingIn ? 1 : 0,
            transform: animatingIn
              ? 'translate(-50%, -50%) scale(1)'
              : 'translate(-50%, -47%) scale(0.93)',
            transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.32s ease',
            overflow: 'hidden',
          }}>
            {/* Top accent line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              opacity: 0.7,
            }} />

            {/* Ambient glow */}
            <div style={{
              position: 'absolute', top: '10%', left: '50%',
              transform: 'translateX(-50%)',
              width: '160px', height: '160px',
              background: color,
              filter: 'blur(70px)',
              opacity: 0.12,
              pointerEvents: 'none',
            }} />

            {/* Icon */}
            <div style={{ fontSize: '3.5rem', zIndex: 2 }}>{icon}</div>

            {/* Name */}
            <h4 style={{
              marginTop: '1rem',
              color: '#e6edf3',
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 4vw, 1.85rem)',
              zIndex: 2,
              lineHeight: 1.2,
            }}>
              {name}
            </h4>

            {/* Color tag */}
            <span style={{
              display: 'inline-block',
              marginTop: '0.6rem',
              padding: '3px 12px',
              borderRadius: '20px',
              background: `${color}18`,
              border: `1px solid ${color}40`,
              color: color,
              fontFamily: 'monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              zIndex: 2,
            }}>
              Service
            </span>

            {/* Divider */}
            <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)', margin: '1.5rem 0', zIndex: 2 }} />

            {/* Details */}
            <p style={{
              color: '#8b949e',
              lineHeight: 1.8,
              fontSize: '0.92rem',
              zIndex: 2,
              maxWidth: '460px',
            }}>
              {details}
            </p>

            <button className="sc-close-btn" onClick={handleClose}>
              ✕ Close
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ServiceCard;
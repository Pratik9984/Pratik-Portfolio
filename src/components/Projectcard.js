import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectCard({ id, title, desc, img, tech = [] }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        .pc-img-wrap img {
          transition: transform 0.5s ease;
        }
        .pc-img-wrap:hover img {
          transform: scale(1.06);
        }
        .pc-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 20px;
          border-radius: 8px;
          background: rgba(88,166,255,0.08);
          border: 1px solid rgba(88,166,255,0.25);
          color: #58a6ff;
          font-size: 0.78rem;
          font-weight: 600;
          font-family: monospace;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .pc-view-btn:hover {
          background: rgba(88,166,255,0.18);
          border-color: rgba(88,166,255,0.5);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(88,166,255,0.15);
        }
        .pc-tech-pill {
          font-family: monospace;
          font-size: 0.62rem;
          padding: 3px 9px;
          border-radius: 20px;
          background: rgba(88,166,255,0.07);
          border: 1px solid rgba(88,166,255,0.15);
          color: #58a6ff;
          letter-spacing: 0.04em;
          transition: background 0.2s;
        }
      `}</style>

      <div
        style={{
          background: '#161b22',
          border: `1px solid ${hovered ? 'rgba(88,166,255,0.3)' : 'rgba(88,166,255,0.1)'}`,
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
          transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow: hovered
            ? '0 16px 40px rgba(88,166,255,0.12)'
            : '0 4px 16px rgba(0,0,0,0.35)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => navigate(`/project/${id}`)}
      >
        {/* Animated top border */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          height: '2px',
          width: hovered ? '100%' : '0%',
          background: 'linear-gradient(90deg, #58a6ff, #79dcff)',
          transition: 'width 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
          zIndex: 2,
        }} />

        {/* Image */}
        <div
          className="pc-img-wrap"
          style={{ overflow: 'hidden', height: '185px', flexShrink: 0 }}
        >
          <img
            src={img}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Body */}
        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>

          {/* Index / ID badge */}
          <div style={{
            fontFamily: 'monospace',
            fontSize: '0.62rem',
            color: '#484f58',
            letterSpacing: '0.15em',
            marginBottom: '0.5rem',
          }}>
            {String(id).padStart(2, '0')} /
          </div>

          {/* Title */}
          <h5 style={{
            color: hovered ? '#79bcff' : '#e6edf3',
            fontWeight: 700,
            fontSize: '1rem',
            marginBottom: '0.4rem',
            transition: 'color 0.3s',
          }}>
            {title}
          </h5>

          {/* Desc */}
          <p style={{
            color: '#8b949e',
            fontSize: '0.82rem',
            lineHeight: 1.65,
            marginBottom: '1rem',
            flex: 1,
          }}>
            {desc}
          </p>

          {/* Tech pills */}
          {tech.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '1rem' }}>
              {tech.map((t) => (
                <span key={t} className="pc-tech-pill">{t}</span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div>
            <button
              className="pc-view-btn"
              onClick={(e) => { e.stopPropagation(); navigate(`/project/${id}`); }}
            >
              View Project →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
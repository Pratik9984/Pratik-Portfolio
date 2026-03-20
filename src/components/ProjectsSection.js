import React, { useEffect, useRef, useState } from 'react';

const defaultItems = [
  {
    title: 'Scalable Architecture',
    desc: 'Built to grow with your business.',
    icon: '🏗️',
    details:
      'Designed with modularity and flexibility in mind, ensuring your app can evolve seamlessly as your business scales.',
  },
  {
    title: 'Real-Time Features',
    desc: 'Live chat, instant updates, seamless sync.',
    icon: '💬',
    details:
      'Integrated sockets and event-driven architecture for smooth, real-time communication and data flow across users and devices.',
  },
  {
    title: 'Secure & Reliable',
    desc: 'Protected, stable, and production-ready.',
    icon: '🛡️',
    details:
      'Built with encryption, authentication, and fault-tolerant systems to ensure your data and users stay safe and connected.',
  },
];

function FeatureCard({ icon, title, desc, details, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="col-md-4"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${index * 0.12}s, transform 0.65s ease ${index * 0.12}s`,
      }}
    >
      <div
        style={{
          backgroundColor: '#161b22',
          border: `1px solid ${hovered ? 'rgba(88,166,255,0.35)' : 'rgba(88,166,255,0.1)'}`,
          borderRadius: '16px',
          padding: '2rem',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
          transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
          transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow: hovered
            ? '0 12px 32px rgba(88,166,255,0.1)'
            : '0 4px 16px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Animated top accent line */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          height: '2px',
          width: hovered ? '100%' : '0%',
          background: 'linear-gradient(90deg, #58a6ff, #79dcff)',
          transition: 'width 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
          borderRadius: '2px 2px 0 0',
        }} />

        {/* Index badge */}
        <div style={{
          fontFamily: 'monospace',
          fontSize: '0.65rem',
          color: '#484f58',
          letterSpacing: '0.15em',
          marginBottom: '1.25rem',
        }}>
          {String(index + 1).padStart(2, '0')} /
        </div>

        {/* Icon */}
        <div style={{
          fontSize: '2rem',
          marginBottom: '1rem',
          display: 'inline-block',
          transition: 'transform 0.3s ease',
          transform: hovered ? 'scale(1.15)' : 'scale(1)',
        }}>
          {icon}
        </div>

        {/* Title */}
        <h5 style={{
          color: hovered ? '#79bcff' : '#e6edf3',
          fontWeight: 600,
          fontSize: '1rem',
          marginBottom: '0.5rem',
          transition: 'color 0.3s',
        }}>
          {title}
        </h5>

        {/* Short desc — fades out on hover */}
        <p style={{
          color: '#8b949e',
          fontSize: '0.83rem',
          lineHeight: 1.6,
          marginBottom: '1rem',
          opacity: hovered ? 0 : 1,
          maxHeight: hovered ? '0' : '60px',
          overflow: 'hidden',
          transition: 'opacity 0.25s ease, max-height 0.35s ease',
        }}>
          {desc}
        </p>

        {/* Detail text — slides in on hover */}
        <p style={{
          color: '#cdd9e5',
          fontSize: '0.82rem',
          lineHeight: 1.75,
          marginBottom: 0,
          opacity: hovered ? 1 : 0,
          maxHeight: hovered ? '150px' : '0',
          overflow: 'hidden',
          transition: 'opacity 0.35s ease 0.1s, max-height 0.4s ease',
        }}>
          {details}
        </p>

        {/* Explore hint */}
        <div style={{
          position: 'absolute',
          bottom: '1.25rem',
          right: '1.25rem',
          fontFamily: 'monospace',
          fontSize: '0.6rem',
          color: hovered ? '#58a6ff' : '#30363d',
          letterSpacing: '0.1em',
          transition: 'color 0.3s',
        }}>
          hover to explore ↑
        </div>
      </div>
    </div>
  );
}

function ProjectsSection({ heading = 'Why Choose Me', items = defaultItems }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-5" style={{ backgroundColor: '#0d1117' }}>
      <div className="container">

        {/* Eyebrow */}
        <div className="text-center mb-2" style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}>
          <span style={{
            fontFamily: 'monospace',
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            color: '#58a6ff',
            textTransform: 'uppercase',
          }}>
            — My Edge —
          </span>
        </div>

        <h2
          className="text-center mb-5"
          style={{
            color: '#e6edf3',
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 700,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s',
          }}
        >
          {heading.split(' ').slice(0, -1).join(' ')}{' '}
          <span style={{ color: '#58a6ff' }}>
            {heading.split(' ').slice(-1)[0]}
          </span>
        </h2>

        <div className="row g-4">
          {items.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
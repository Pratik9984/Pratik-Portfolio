import React, { useEffect, useRef, useState } from 'react';
import ServiceCard from '../components/servicecard';

const services = [
  {
    id: 1,
    name: 'Web Development',
    icon: '🌐',
    color: '#58a6ff',
    details: 'I build scalable, responsive websites using modern frameworks like React, FastAPI, and Tailwind. Every site is optimized for performance, accessibility, and real-world impact.',
  },
  {
    id: 2,
    name: 'UI/UX Design',
    icon: '🎨',
    color: '#bc8cff',
    details: 'I craft intuitive, trust-building interfaces with smooth animations, clean layouts, and brand consistency. Every pixel is placed with purpose and empathy.',
  },
  {
    id: 3,
    name: 'Performance Optimization',
    icon: '⚡',
    color: '#3fb950',
    details: 'I fine-tune frontend and backend performance, reduce payloads, and optimize rendering for lightning-fast user experiences across devices.',
  },
  {
    id: 4,
    name: 'Secure Web Apps',
    icon: '🔒',
    color: '#ffa657',
    details: 'I implement encryption, authentication, and secure architecture to protect user data and ensure production-grade reliability.',
  },
];

const process = [
  { step: '01', title: 'Discovery',   desc: 'We align on goals, scope, and tech stack.' },
  { step: '02', title: 'Design',      desc: 'Wireframes, UI mockups, and architecture planning.' },
  { step: '03', title: 'Build',       desc: 'Full-stack development with clean, tested code.' },
  { step: '04', title: 'Ship',        desc: 'Deploy, monitor, and iterate based on feedback.' },
];

const stats = [
  { num: '15+', label: 'Projects delivered' },
  //{ num: '4',   label: 'Core services' },
  { num: '100%',label: 'Client satisfaction' },
  //{ num: '24h', label: 'Avg. response time' },
];

const tools = [
  'Next.js','React','Vue', 'FastAPI', 'Flask','Firebase','Supabase', 'Node.js', 'Tailwind','SQLiteDB',
  'MongoDB', 'PostgreSQL', 'Docker', 'Vercel','Render','Railway','git','github', 'Figma',
];

function ProcessStep({ step, title, desc, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        flex: '1 1 180px',
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.6s ease ${0.5 + index * 0.1}s, transform 0.6s ease ${0.5 + index * 0.1}s`,
      }}
    >
      <div
        style={{
          padding: '1.5rem',
          borderRadius: '14px',
          background: hovered ? 'rgba(88,166,255,0.06)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${hovered ? 'rgba(88,166,255,0.25)' : 'rgba(255,255,255,0.06)'}`,
          transition: 'background 0.25s, border-color 0.25s',
          height: '100%',
          cursor: 'default',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{
          fontFamily: 'monospace',
          fontSize: '0.65rem',
          color: '#58a6ff',
          letterSpacing: '0.15em',
          marginBottom: '0.75rem',
        }}>
          {step}
        </div>
        <div style={{
          color: hovered ? '#e6edf3' : '#cdd9e5',
          fontWeight: 700,
          fontSize: '0.92rem',
          marginBottom: '0.4rem',
          transition: 'color 0.25s',
        }}>
          {title}
        </div>
        <div style={{ color: '#8b949e', fontSize: '0.78rem', lineHeight: 1.65 }}>
          {desc}
        </div>
      </div>
    </div>
  );
}

function Services() {
  const [activeId, setActiveId] = useState(null);
  const [visible, setVisible]   = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay = 0) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(18px)',
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      className="py-5"
      style={{ backgroundColor: '#0d1117' }}
    >
      <div className="container">

        {/* ── Eyebrow + Heading ── */}
        <div className="text-center mb-2" style={fadeUp(0)}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.22em', color: '#58a6ff', textTransform: 'uppercase' }}>
            — What I Offer —
          </span>
        </div>
        <h2
          className="text-center mb-3"
          style={{ ...fadeUp(0.1), color: '#e6edf3', fontSize: 'clamp(2rem,5vw,2.75rem)', fontWeight: 700 }}
        >
          My <span style={{ color: '#58a6ff' }}>Services</span>
        </h2>
        <p
          className="text-center mb-5"
          style={{
            ...fadeUp(0.2),
            color: '#8b949e', fontSize: '0.9rem',
            maxWidth: '500px', margin: '0 auto 3rem',
            lineHeight: 1.8,
          }}
        >
          End-to-end web development — from pixel-perfect UIs to secure, scalable backends. Click any card to explore what I offer.
        </p>

        {/* ── Service Cards ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.25rem', marginBottom: '4rem' }}>
          {services.map((service, i) => (
            <div
              key={service.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(28px)',
                transition: `opacity 0.65s ease ${0.15 + i * 0.12}s, transform 0.65s ease ${0.15 + i * 0.12}s`,
              }}
            >
              <ServiceCard
                {...service}
                isActive={activeId === service.id}
                onClick={() => setActiveId(activeId === service.id ? null : service.id)}
              />
            </div>
          ))}
        </div>

        {/* ── Stats bar ── */}
        <div
          style={{
            ...fadeUp(0.3),
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '4rem',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {stats.map(({ num, label }, i) => (
            <div
              key={label}
              style={{
                flex: '1 1 120px',
                padding: '1.75rem 1.25rem',
                textAlign: 'center',
                background: '#161b22',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                cursor: 'default',
              }}
            >
              <div style={{ color: '#58a6ff', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.25rem)', lineHeight: 1.1, marginBottom: '4px' }}>
                {num}
              </div>
              <div style={{ color: '#484f58', fontSize: '0.68rem', fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Two-column: Process + Tools ── */}
        <div className="row g-4 mb-4">

          {/* Process */}
          <div className="col-lg-7">
            <div
              style={{
                ...fadeUp(0.35),
                background: '#161b22',
                border: '1px solid rgba(88,166,255,0.1)',
                borderRadius: '18px',
                padding: '2rem',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #58a6ff, transparent)', opacity: 0.5 }} />

              <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#484f58', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                // how_i_work
              </div>
              <h4 style={{ color: '#e6edf3', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                My Process
              </h4>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {process.map((p, i) => (
                  <ProcessStep key={i} {...p} index={i} visible={visible} />
                ))}
              </div>
            </div>
          </div>

          {/* Tools + CTA */}
          <div className="col-lg-5 d-flex flex-column gap-4">

            {/* Tools */}
            <div
              style={{
                ...fadeUp(0.45),
                background: '#161b22',
                border: '1px solid rgba(88,166,255,0.1)',
                borderRadius: '18px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                flex: 1,
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #bc8cff, transparent)', opacity: 0.5 }} />
              <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#484f58', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                // tools_i_use
              </div>
              <h4 style={{ color: '#e6edf3', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.25rem' }}>
                My Toolkit
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {tools.map(t => (
                  <span
                    key={t}
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.7rem',
                      padding: '4px 11px',
                      borderRadius: '20px',
                      background: 'rgba(88,166,255,0.07)',
                      border: '1px solid rgba(88,166,255,0.18)',
                      color: '#58a6ff',
                      letterSpacing: '0.04em',
                      cursor: 'default',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(88,166,255,0.16)';
                      e.currentTarget.style.borderColor = 'rgba(88,166,255,0.4)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(88,166,255,0.07)';
                      e.currentTarget.style.borderColor = 'rgba(88,166,255,0.18)';
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div
              style={{
                ...fadeUp(0.55),
                background: 'rgba(88,166,255,0.05)',
                border: '1px solid rgba(88,166,255,0.2)',
                borderRadius: '18px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #3fb950, transparent)', opacity: 0.6 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#3fb950', boxShadow: '0 0 7px #3fb950', display: 'inline-block' }} />
                <span style={{ color: '#3fb950', fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 600 }}>Available for new projects</span>
              </div>
              <p style={{ color: '#8b949e', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                Have a project in mind? I'd love to hear about it and see how I can help.
              </p>
              <a
                href="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '7px',
                  padding: '10px 22px', borderRadius: '10px',
                  background: '#58a6ff', color: '#0d1117',
                  fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.04em',
                  textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#79bcff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#58a6ff'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                ✉️ Let's Work Together
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Services;
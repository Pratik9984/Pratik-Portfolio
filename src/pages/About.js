import React, { useState, useEffect, useRef } from 'react';

const skills = [
  { icon: '🌐', label: 'Frontend',       tags: ['React', 'Bootstrap', 'Tailwind'] },
  { icon: '⚡', label: 'Backend',        tags: ['FastAPI', 'Flask', 'SQLAlchemy'] },
  { icon: '🔒', label: 'Security',       tags: ['Encryption', 'Cryptography'] },
  { icon: '🧠', label: 'AI & Real-Time', tags: ['AI Integration', 'WebSockets'] },
];

const bioCards = [
  { icon: '👨‍💻', title: 'Full-Stack & AI Developer',  desc: 'Building scalable, production-ready apps for startups, freelance clients, and personal projects.' },
  { icon: '⚡',  title: 'Tech Stack Expertise',         desc: 'FastAPI, Flask, SQLAlchemy, React, Tailwind, and Java for high-performance applications.' },
  { icon: '🎨', title: 'UI/UX Focused',                desc: 'Crafting interactive, trust-building designs with smooth animations and brand consistency.' },
  { icon: '🔒', title: 'Security Enthusiast',          desc: 'End-to-end encrypted apps and real-world cryptography for production environments.' },
  { icon: '📚', title: 'Strong CS Foundations',        desc: 'Studying Logic Design, Processor Architecture, Computer Graphics, and Cryptography.' },
  { icon: '🚀', title: 'Startup & Freelance Ready',    desc: 'Rapid prototyping, SaaS MVPs, and helping clients scale with confidence.' },
];

const stats = [
  { num: '2+',  label: 'Years Exp.' },
  { num: '15+', label: 'Projects' },
  { num: '20+',  label: 'Tech Stacks' },
  { num: '∞',   label: 'Lines of Code' },
];

function BioCard({ icon, title, desc, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.55s ease ${0.3 + index * 0.07}s, transform 0.55s ease ${0.3 + index * 0.07}s,
                     background 0.2s ease, border-color 0.2s ease`,
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        padding: '13px 15px',
        borderRadius: '10px',
        background: hovered ? 'rgba(88,166,255,0.08)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(88,166,255,0.28)' : 'rgba(255,255,255,0.06)'}`,
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontSize: '1.05rem', lineHeight: 1.5, flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ color: hovered ? '#79bcff' : '#cdd9e5', fontWeight: 600, fontSize: '0.82rem', marginBottom: '2px', transition: 'color 0.2s' }}>
          {title}
        </div>
        <div style={{ color: '#8b949e', fontSize: '0.77rem', lineHeight: 1.65 }}>{desc}</div>
      </div>
    </div>
  );
}

function About() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay = 0) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        @keyframes ab-fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .ab-card {
          position: relative;
          overflow: hidden;
          background: #161b22;
          border-radius: 20px;
          border: 1px solid rgba(88,166,255,0.1);
          box-shadow: 0 4px 40px rgba(0,0,0,0.4);
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .ab-card::before {
          content: '';
          position: absolute;
          top:0; left:0; right:0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #58a6ff, transparent);
          opacity: 0.55;
        }
        .ab-card:hover {
          box-shadow: 0 0 40px rgba(88,166,255,0.12);
          border-color: rgba(88,166,255,0.22);
        }
        .ab-skill-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 8px;
          transition: background 0.2s, border-color 0.2s;
        }
        .ab-skill-row:hover {
          background: rgba(88,166,255,0.05);
          border-color: rgba(88,166,255,0.15);
        }
        .ab-pill {
          display: inline-block;
          font-size: 0.65rem;
          padding: 3px 9px;
          border-radius: 20px;
          background: rgba(88,166,255,0.08);
          color: #58a6ff;
          border: 1px solid rgba(88,166,255,0.18);
          margin: 2px;
          font-family: monospace;
          letter-spacing: 0.04em;
          transition: background 0.2s, border-color 0.2s;
          cursor: default;
        }
        .ab-pill:hover {
          background: rgba(88,166,255,0.18);
          border-color: rgba(88,166,255,0.45);
        }
        .ab-stat {
          flex: 1;
          min-width: 70px;
          padding: 14px 10px;
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          text-align: center;
          transition: background 0.2s, border-color 0.2s;
          cursor: default;
        }
        .ab-stat:hover {
          background: rgba(88,166,255,0.06);
          border-color: rgba(88,166,255,0.2);
        }
        .ab-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 22px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
        }
        .ab-cta-primary {
          background: #58a6ff;
          color: #0d1117;
          border: none;
        }
        .ab-cta-primary:hover {
          background: #79bcff;
          color: #0d1117;
          transform: translateY(-2px);
        }
        .ab-cta-ghost {
          background: transparent;
          color: #8b949e;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .ab-cta-ghost:hover {
          color: #58a6ff;
          border-color: rgba(88,166,255,0.3);
          transform: translateY(-2px);
        }
        .ab-mono-label {
          font-family: monospace;
          font-size: 0.63rem;
          color: #484f58;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .ab-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 1.5rem 0; }
      `}</style>

      <section ref={sectionRef} className="py-5" style={{ backgroundColor: '#0d1117' }}>
        <div className="container">

          {/* Eyebrow */}
          <div className="text-center mb-2" style={fadeUp(0)}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.2em', color: '#58a6ff', textTransform: 'uppercase' }}>
              — About Me —
            </span>
          </div>
          <h2 className="text-center mb-5" style={{ ...fadeUp(0.1), color: '#e6edf3', fontSize: 'clamp(2rem,5vw,2.75rem)', fontWeight: 700 }}>
            Who I <span style={{ color: '#58a6ff' }}>Am</span>
          </h2>

          <div className="ab-card p-4 p-md-5">
            <div className="row g-5">

              {/* ── LEFT col ── */}
              <div className="col-lg-4" style={fadeUp(0.2)}>

                {/* Identity */}
                <div className="ab-mono-label">// who_am_i</div>
                <h3 style={{ color: '#e6edf3', fontWeight: 700, fontSize: 'clamp(1.4rem,3vw,1.9rem)', lineHeight: 1.2, marginBottom: '0.4rem' }}>
                  Pratik <span style={{ color: '#58a6ff' }}>Shinde</span>
                </h3>
                <p style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#58a6ff', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                  Full-Stack Developer & AI Integrator
                </p>
                <p style={{ color: '#8b949e', fontSize: '0.85rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                  Based in <strong style={{ color: '#cdd9e5' }}>Pune, India</strong>. I build scalable, production-ready applications with a focus on clean architecture, security, and great UX.
                </p>

                {/* Availability */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '7px 14px', borderRadius: '20px', background: 'rgba(35,134,54,0.1)', border: '1px solid rgba(35,134,54,0.25)', marginBottom: '1.5rem' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#3fb950', boxShadow: '0 0 7px #3fb950', display: 'inline-block' }} />
                  <span style={{ color: '#3fb950', fontSize: '0.72rem', fontWeight: 600, fontFamily: 'monospace' }}>Available for work</span>
                </div>

                <div className="ab-divider" />

                {/* Stats */}
                <div className="ab-mono-label">// stats</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
                  {stats.map(({ num, label }) => (
                    <div key={label} className="ab-stat">
                      <div style={{ color: '#58a6ff', fontWeight: 800, fontSize: '1.5rem', lineHeight: 1.1 }}>{num}</div>
                      <div style={{ color: '#484f58', fontSize: '0.6rem', fontFamily: 'monospace', letterSpacing: '0.07em', textTransform: 'uppercase', marginTop: '3px' }}>{label}</div>
                    </div>
                  ))}
                </div>


              </div>

              {/* ── RIGHT col ── */}
              <div className="col-lg-8">
                <div className="ab-mono-label" style={fadeUp(0.3)}>// what_i_bring</div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                  {bioCards.map((b, i) => (
                    <BioCard key={i} {...b} index={i} visible={visible} />
                  ))}
                </div>

                {/* CTA row */}
                <div style={{
                  ...fadeUp(0.85),
                  marginTop: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}>
                  <a href="/contact"   className="ab-cta ab-cta-primary">✉️ Get in Touch</a>
                  <a href="/portfolio" className="ab-cta ab-cta-ghost">View My Work →</a>
                </div>
              </div>

            </div>

            {/* ── Full-width tech stack row ── */}
            <div style={{
              marginTop: '2rem',
              paddingTop: '1.75rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              ...fadeUp(0.5),
            }}>
              <div className="ab-mono-label" style={{ marginBottom: '1rem' }}>// tech_stack</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map(s =>
                  s.tags.map(t => (
                    <span
                      key={`${s.label}-${t}`}
                      className="ab-pill"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', padding: '5px 13px' }}
                    >
                      <span style={{ fontSize: '0.85rem' }}>{s.icon}</span>
                      {t}
                    </span>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default About;
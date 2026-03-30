
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const projectData = {
  1: {
    title: 'Portfolio Site',
    description: 'A modern, responsive portfolio built with React and Bootstrap. It showcases my services, projects, and contact info with premium UI/UX.',
    image: '/assets/Portfolio.png',
    github: 'https://github.com/Pratik9984/Portfolio',
    live: 'https://portfolio-02y6.onrender.com/',
    tech: ['React', 'Bootstrap', 'Render'],
    status: 'Live',
  },
  2: {
    title: 'Hotel Booking App',
    description: 'Full-stack hotel booking platform with Hotel browsing, reservations, authentication,Payment Gateway, Hotel Listing , user management and Responsive UI ',
    image: '/assets/Hotel.png',
    github: 'https://github.com/Pratik9984/Perfect-Stay',
    live: 'https://perfect-stay-1.onrender.com/',
    tech: ['HTML ','CSS', 'Flask', 'SQlite DB'],
    status: 'Live',
  },
  3: {
    title: 'E-commerce Demo',
    description: 'A demo e-commerce UI built with HTML, Java script  and CSS. Includes cart functionality,Buy product,  and a fully responsive design.',
    image: '/assets/Ecom.png',
    github: 'https://github.com/Pratik9984/Ecommerce',
    live: null,
    tech: ['HTML', 'CSS','Java Script','PHP', 'Mysql','Razorpay API'],
    status: 'In Progress',
  },
  4: {
    title: 'Vehicle Price Calculator',
    description: 'Estimates the market value of used cars based on various parameters using trained machine learning models served via a Flask API.',
    image: '/assets/Vehicle.png',
    github: 'https://github.com/Pratik9984/Vehicle-Price-calculator',
    live: 'https://vehicle-price-calculator.onrender.com',
    tech: ['HTML', 'CSS', 'JS'],
    status: 'Live',
  },
  5:{
    title: 'Freelance Website',
    description: 'Freelance Website build with advance stack like Next.js and Bootstrap. With SEO Optimization',
    image:'/assets/Freelance.png',
    tech:['Next.js','Bootstrap','GitHub','Vercel'],
    github:'https://github.com/Pratik9984/stack-scale',
    live: 'https://stack-scale.vercel.app/',
    status:'Live',
  
  },
  6:{
     title: 'Freelance Website With Improved UI',
    description: 'Freelance Website build with advance stack like Next.js and Bootstrap. With SEO Optimization',
    image:'/assets/freelance2.png',
    tech:['Next.js','Bootstrap','GitHub','Vercel'],
    github:'https://github.com/Pratik9984/stackandscale',
    live: 'https://stackandscale-beta.vercel.app/',
    status:'Live',
  },
  7:{
     title: 'Portfolio Site with improved ui ',
    description: 'A modern, responsive portfolio built with React and Bootstrap. It showcases my services, projects, and contact info with premium UI/UX.',
    image: '/assets/Portfolionew.png',
    github: 'https://github.com/Pratik9984/Pratik-Portfolio',
    live: 'https://pratik-portfolio-jsfs.onrender.com',
    tech: ['React', 'Bootstrap', 'Render'],
    status: 'Live',
  },
  8:{
      title: 'Resume Analyzer ',
    description: 'An AI-powered resume analyzer that evaluates PDF and DOCX CVs to provide users with an instant optimization score. It extracts document text and delivers structured, actionable feedback on strengths, weaknesses, and formatting to help users land more interviews.',
    image: '/assets/Resume.png',
    github: 'https://github.com/Pratik9984/AI_RESUME_ANALYZER',
    live: 'https://ai-resume-analyzer-4-empf.onrender.com/',
    tech: ['Flask','SqliteDB','HTML', 'CSS', 'Render'],
    status: 'Live',
},
};

const statusColors = {
  Live:        { bg: 'rgba(35,134,54,0.12)',  border: 'rgba(35,134,54,0.3)',  text: '#3fb950' },
  'In Progress':{ bg: 'rgba(187,128,9,0.12)', border: 'rgba(187,128,9,0.3)', text: '#d29922' },
};

function ProjectDetailsPage() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const project      = projectData[id];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!project) {
    return (
      <section className="py-5 text-center" style={{ backgroundColor: '#0d1117', color: '#e6edf3', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</div>
          <h2 style={{ color: '#58a6ff', marginBottom: '0.5rem' }}>Project not found</h2>
          <p style={{ color: '#8b949e', marginBottom: '1.5rem' }}>Please check the URL or return to the portfolio.</p>
          <button onClick={() => navigate(-1)} style={ghostBtnStyle}>← Go Back</button>
        </div>
      </section>
    );
  }

  const status = statusColors[project.status] || statusColors['Live'];
  const ids    = Object.keys(projectData).map(Number);
  const idx    = ids.indexOf(Number(id));
  const prevId = idx > 0 ? ids[idx - 1] : null;
  const nextId = idx < ids.length - 1 ? ids[idx + 1] : null;

  return (
    <>
      <style>{`
        @keyframes pdp-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pdp-visible       { animation: pdp-fadeUp 0.65s ease both; }
        .pdp-visible.d1    { animation-delay: 0.1s; }
        .pdp-visible.d2    { animation-delay: 0.2s; }
        .pdp-visible.d3    { animation-delay: 0.3s; }
        .pdp-visible.d4    { animation-delay: 0.4s; }

        .pdp-card {
          background: #161b22;
          border: 1px solid rgba(88,166,255,0.12);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }
        .pdp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #58a6ff, transparent);
          opacity: 0.6;
        }

        .pdp-img-wrap {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(88,166,255,0.1);
        }
        .pdp-img-wrap img {
          width: 100%;
          display: block;
          transition: transform 0.6s ease;
        }
        .pdp-img-wrap:hover img { transform: scale(1.03); }

        .pdp-tech-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 13px;
          border-radius: 20px;
          background: rgba(88,166,255,0.08);
          border: 1px solid rgba(88,166,255,0.2);
          color: #58a6ff;
          font-size: 0.75rem;
          font-weight: 600;
          font-family: monospace;
          letter-spacing: 0.04em;
          transition: background 0.2s, border-color 0.2s;
          cursor: default;
        }
        .pdp-tech-pill:hover {
          background: rgba(88,166,255,0.16);
          border-color: rgba(88,166,255,0.45);
        }

        .pdp-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 24px;
          border-radius: 10px;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          border: 1px solid rgba(88,166,255,0.3);
          background: rgba(88,166,255,0.07);
          color: #58a6ff;
        }
        .pdp-btn:hover {
          background: rgba(88,166,255,0.16);
          border-color: rgba(88,166,255,0.55);
          color: #79bcff;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(88,166,255,0.15);
        }
        .pdp-btn-disabled {
          opacity: 0.35;
          pointer-events: none;
        }

        .pdp-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          font-family: monospace;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: #8b949e;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .pdp-nav-btn:hover {
          background: rgba(88,166,255,0.08);
          border-color: rgba(88,166,255,0.25);
          color: #58a6ff;
        }
        .pdp-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-family: monospace;
          background: none;
          border: 1px solid rgba(255,255,255,0.08);
          color: #8b949e;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pdp-back-btn:hover {
          border-color: rgba(88,166,255,0.3);
          color: #58a6ff;
        }
      `}</style>

      <section style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '820px' }}>

          {/* Back + nav row */}
          <div className={`d-flex justify-content-between align-items-center mb-4 ${visible ? 'pdp-visible' : 'opacity-0'}`}>
            <button className="pdp-back-btn" onClick={() => navigate(-1)}>
              ← Back
            </button>
            <div className="d-flex gap-2">
              {prevId
                ? <a href={`/project/${prevId}`} className="pdp-nav-btn">← Prev</a>
                : <span className="pdp-nav-btn" style={{ opacity: 0.3, pointerEvents: 'none' }}>← Prev</span>
              }
              {nextId
                ? <a href={`/project/${nextId}`} className="pdp-nav-btn">Next →</a>
                : <span className="pdp-nav-btn" style={{ opacity: 0.3, pointerEvents: 'none' }}>Next →</span>
              }
            </div>
          </div>

          {/* Main card */}
          <div className={`pdp-card ${visible ? 'pdp-visible d1' : 'opacity-0'}`}>

            {/* Image */}
            <div className="pdp-img-wrap">
              <img src={project.image} alt={`${project.title} preview`} />
            </div>

            {/* Content */}
            <div className="p-4 p-md-5">

              {/* Title + status */}
              <div className={`d-flex align-items-start justify-content-between flex-wrap gap-3 mb-3 ${visible ? 'pdp-visible d2' : 'opacity-0'}`}>
                <h2 style={{ color: '#e6edf3', fontWeight: 700, fontSize: 'clamp(1.5rem, 4vw, 2rem)', margin: 0 }}>
                  {project.title}
                </h2>
                <span style={{
                  padding: '5px 14px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600,
                  fontFamily: 'monospace', letterSpacing: '0.08em',
                  background: status.bg, border: `1px solid ${status.border}`, color: status.text,
                }}>
                  ● {project.status}
                </span>
              </div>

              {/* Description */}
              <p className={`${visible ? 'pdp-visible d2' : 'opacity-0'}`}
                style={{ color: '#8b949e', lineHeight: 1.85, fontSize: '0.92rem', marginBottom: '2rem' }}>
                {project.description}
              </p>

              {/* Tech stack */}
              <div className={`mb-4 ${visible ? 'pdp-visible d3' : 'opacity-0'}`}>
                <div style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: '#484f58', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px' }}>
                  // tech stack
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="pdp-tech-pill">{t}</span>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '2rem' }} />

              {/* CTA buttons */}
              <div className={`d-flex flex-wrap gap-3 ${visible ? 'pdp-visible d4' : 'opacity-0'}`}>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="pdp-btn">
                  <span>⬡</span> GitHub Repo
                </a>
                {project.live ? (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="pdp-btn">
                    <span>↗</span> Live Site
                  </a>
                ) : (
                  <span className={`pdp-btn pdp-btn-disabled`}>
                    <span>↗</span> Live — Coming Soon
                  </span>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}

const ghostBtnStyle = {
  background: 'none',
  border: '1px solid rgba(88,166,255,0.3)',
  color: '#58a6ff',
  padding: '10px 22px',
  borderRadius: '10px',
  fontSize: '0.85rem',
  cursor: 'pointer',
  transition: 'background 0.2s',
};

export default ProjectDetailsPage;

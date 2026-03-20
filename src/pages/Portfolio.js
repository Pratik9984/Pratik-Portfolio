import React, { useEffect, useRef, useState } from 'react';
import ProjectCard from '../components/Projectcard';


const projects = [
  {
    id: 1,
    title: 'Portfolio Site',
    desc: 'React + Bootstrap personal portfolio with smooth animations and responsive design.',
    img: '/assets/Portfolio.png',
    tech: ['React', 'Bootstrap','GitHub','Render'],
  },
  {
    id: 2,
    title: 'Hotel Booking App',
    desc: 'Full-stack hotel booking platform with Hotel browsing, reservations, authentication,Payment Gateway, Hotel Listing , user management and Responsive UI .',
    img: '/assets/Hotel.png',
    tech: ['HTML ','CSS', 'Flask', 'SQlite DB', 'Razorpay API','GitHub','Render'],
  },
  {
    id: 3,
    title: 'E-commerce Demo',
    desc: 'Responsive e-commerce UI with  cart functionality, and modern layout.',
    img: '/assets/Ecom.png',
    tech: ['HTML', 'CSS','JS','PHP', 'Mysql','GitHub'],
  },
  {
    id: 4,
    title: 'Vehicle Price Calculator',
    desc: ' app that estimates used car market value based on key parameters.',
    img: '/assets/Vehicle.png',
    tech: ['HTML', 'CSS', 'JS','GitHub','Render'],
  },
  {
    id:5,
    title:'Freelance Website',
    desc: 'Freelance Website build with advance stack like Next.js and Bootstrap',
    img:'/assets/freelance.png',
    tech:['Next.js','Bootstrap','GitHub','Vercel']
  },
  {
    id:6,
    title:'Freelance Website With Improved UI',
    desc: 'Freelance Website build with advance stack like Next.js and Bootstrap',
    img:'/assets/freelance2.png',
    tech:['Next.js','Bootstrap','GitHub','Vercel']
  },
  {
   id: 7,
    title: 'Portfolio Site with improved ui ',
    desc: 'React + Bootstrap personal portfolio with smooth animations and responsive design.',
    img: '/assets/Portfolionew.png',
    tech: ['React', 'Bootstrap','GitHub','Render'],
  },
];

function Portfolio() {
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

  return (
    <section ref={sectionRef} className="py-5" style={{ backgroundColor: '#0d1117' }}>
      <div className="container">

        {/* Eyebrow */}
        <div className="text-center mb-2" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.2em', color: '#58a6ff', textTransform: 'uppercase' }}>
            — My Work —
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
          Port<span style={{ color: '#58a6ff' }}>folio</span>
        </h2>

        <div className="row g-4">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="col-md-6 col-lg-3"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.65s ease ${i * 0.1}s, transform 0.65s ease ${i * 0.1}s`,
              }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;

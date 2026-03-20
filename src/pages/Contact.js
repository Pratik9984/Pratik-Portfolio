import React, { useEffect, useRef, useState } from 'react';

// ─── Make sure you verified this key via the email Web3Forms sent you ───
const WEB3FORMS_KEY = '9f274445-4488-4acd-8b72-da78b80820c9';

const contactDetails = [
  { icon: '📍', label: 'Location', value: 'Pune, Maharashtra',            href: null },
  { icon: '📧', label: 'Email',    value: 'pratikshinde0165@gmail.com',   href: 'mailto:pratikshinde0165@gmail.com' },
  { icon: '📱', label: 'Phone',    value: '+91 8421526195',               href: 'tel:+918421526195' },
];

const socials = [
  { label: 'GitHub',   href: 'https://github.com/Pratik9984' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pratik-shinde-54743725a/' },
];

const validate = ({ name, email, message }) => ({
  name:    name.length < 2      ? 'Name must be at least 2 characters'    : '',
  email:   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Invalid email format' : '',
  message: message.length < 10  ? 'Message must be at least 10 characters' : '',
});

const inputStyle = (hasError) => ({
  backgroundColor: '#0d1117',
  color: '#e6edf3',
  border: `1px solid ${hasError ? '#f85149' : '#30363d'}`,
  borderRadius: '10px',
  fontSize: '0.875rem',
  transition: 'border-color 0.2s, box-shadow 0.2s',
});

function GetInTouch() {
  const [formData, setFormData]   = useState({ name: '', email: '', message: '' });
  const [errors, setErrors]       = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [apiError, setApiError]   = useState('');
  const [visible, setVisible]     = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updated = { ...formData, [id]: value };
    setFormData(updated);
    setErrors(prev => ({ ...prev, [id]: validate(updated)[id] }));
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(formData);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setLoading(true);
    setApiError('');
    setSubmitted(false);

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject:    `Portfolio message from ${formData.name}`,
      from_name:  'Portfolio Contact Form',
      name:       formData.name,
      email:      formData.email,
      message:    formData.message,
      botcheck:   '',  // honeypot in JSON — correct Web3Forms approach
    };

    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(payload),
      });

      const text = await res.text();
      console.log('[GetInTouch] HTTP status:', res.status);
      console.log('[GetInTouch] Raw response:', text);

      let data;
      try { data = JSON.parse(text); }
      catch { throw new Error(`Non-JSON response: ${text}`); }

      if (res.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setErrors({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        const msg = data?.message || `Error ${res.status}`;
        console.error('[GetInTouch] API error:', msg);
        setApiError(`Submission failed: ${msg}. Or email me directly at pratikshinde0165@gmail.com`);
      }
    } catch (err) {
      console.error('[GetInTouch] Network/parse error:', err);
      setApiError('Network error. Please email me at pratikshinde0165@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes git-fadeUp    { from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);} }
        @keyframes git-spin      { to{transform:rotate(360deg);} }
        @keyframes git-successPop{ 0%{opacity:0;transform:scale(0.9);}60%{transform:scale(1.04);}100%{opacity:1;transform:scale(1);} }
        @keyframes git-popError  { 0%{opacity:0;transform:scale(0.92);}60%{transform:scale(1.02);}100%{opacity:1;transform:scale(1);} }

        .git-visible    { animation: git-fadeUp 0.65s ease both; }
        .git-d1         { animation-delay: 0.1s; }
        .git-d2         { animation-delay: 0.22s; }

        .git-card {
          background: #161b22;
          border: 1px solid rgba(88,166,255,0.12);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .git-card::before {
          content: '';
          position: absolute;
          top:0; left:0; right:0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #58a6ff, transparent);
          opacity: 0.5;
        }
        .git-card:hover {
          border-color: rgba(88,166,255,0.28);
          box-shadow: 0 0 28px rgba(88,166,255,0.1);
        }

        .git-contact-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 10px;
          transition: background 0.2s, border-color 0.2s;
          text-decoration: none;
        }
        .git-contact-row:hover {
          background: rgba(88,166,255,0.06);
          border-color: rgba(88,166,255,0.2);
        }
        .git-contact-icon  { font-size: 1.1rem; min-width: 28px; text-align: center; }
        .git-contact-label { font-size:0.68rem; color:#58a6ff; font-family:monospace; letter-spacing:0.1em; text-transform:uppercase; display:block; margin-bottom:2px; }
        .git-contact-value { font-size:0.82rem; color:#cdd9e5; display:block; line-height:1.3; }

        .git-social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 9px 14px;
          border-radius: 10px;
          background: rgba(88,166,255,0.06);
          border: 1px solid rgba(88,166,255,0.2);
          color: #58a6ff;
          font-size: 0.78rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .git-social-btn:hover {
          background: rgba(88,166,255,0.15);
          border-color: rgba(88,166,255,0.5);
          color: #79bcff;
          transform: translateY(-2px);
        }

        .git-input:focus {
          border-color: rgba(88,166,255,0.5) !important;
          box-shadow: 0 0 0 3px rgba(88,166,255,0.12) !important;
          outline: none;
          background-color: #0d1117;
          color: #e6edf3;
        }
        .git-input::placeholder { color: #484f58; }

        .git-label {
          font-size: 0.75rem;
          font-family: monospace;
          color: #58a6ff;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: block;
        }

        .git-submit {
          width: 100%;
          padding: 12px;
          border-radius: 30px;
          border: none;
          background: #58a6ff;
          color: #0d1117;
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
        }
        .git-submit:hover:not(:disabled) {
          background: #79bcff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(88,166,255,0.3);
        }
        .git-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .git-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(13,17,23,0.3);
          border-top-color: #0d1117;
          border-radius: 50%;
          animation: git-spin 0.7s linear infinite;
        }

        .git-success {
          animation: git-successPop 0.4s ease both;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 10px;
          background: rgba(35,134,54,0.12);
          border: 1px solid rgba(35,134,54,0.3);
          color: #3fb950;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .git-api-error {
          animation: git-popError 0.4s ease both;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 12px 14px;
          border-radius: 10px;
          background: rgba(248,81,73,0.08);
          border: 1px solid rgba(248,81,73,0.25);
          color: #f85149;
          font-size: 0.81rem;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .git-char-count { font-size:0.68rem; font-family:monospace; text-align:right; margin-top:4px; }
        .git-error-text { font-size:0.72rem; color:#f85149; margin-top:4px; display:block; }
      `}</style>

      <section ref={sectionRef} className="py-5" style={{ backgroundColor: '#0d1117' }} id="contact">
        <div className="container">

          {/* Eyebrow */}
          <div className={`text-center mb-2 ${visible ? 'git-visible' : 'opacity-0'}`}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.2em', color: '#58a6ff', textTransform: 'uppercase' }}>
              — Let's Talk —
            </span>
          </div>

          <h2
            className={`text-center mb-5 ${visible ? 'git-visible git-d1' : 'opacity-0'}`}
            style={{ color: '#e6edf3', fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 700 }}
          >
            Get in <span style={{ color: '#58a6ff' }}>Touch</span>
          </h2>

          <div className="row g-4">

            {/* ── Left: Contact Info ── */}
            <div className={`col-md-5 ${visible ? 'git-visible git-d1' : 'opacity-0'}`}>
              <div className="git-card p-4 h-100 d-flex flex-column">

                <h5 style={{ color: '#e6edf3', fontWeight: 600, marginBottom: '1.25rem', fontSize: '1rem' }}>
                  Contact Information
                </h5>

                {contactDetails.map(({ icon, label, value, href }) => {
                  const inner = (
                    <>
                      <span className="git-contact-icon">{icon}</span>
                      <span>
                        <span className="git-contact-label">{label}</span>
                        <span className="git-contact-value">{value}</span>
                      </span>
                    </>
                  );
                  return href
                    ? <a key={label} href={href} className="git-contact-row">{inner}</a>
                    : <div key={label} className="git-contact-row" style={{ cursor: 'default' }}>{inner}</div>;
                })}

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '1.25rem 0' }} />

                <p style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: '#484f58', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  // Find me online
                </p>
                <div className="d-flex gap-2">
                  {socials.map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="git-social-btn">
                      {label}
                    </a>
                  ))}
                </div>

                <div className="mt-auto pt-4">
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '8px 14px', borderRadius: '20px',
                    background: 'rgba(35,134,54,0.1)', border: '1px solid rgba(35,134,54,0.25)',
                  }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#3fb950', boxShadow: '0 0 8px #3fb950', display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ color: '#3fb950', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'monospace' }}>
                      Available for work
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div className={`col-md-7 ${visible ? 'git-visible git-d2' : 'opacity-0'}`}>
              <div className="git-card p-4">

                {submitted && (
                  <div className="git-success">
                    <span>✅</span>
                    <span>Message sent! I'll get back to you within 24 hours.</span>
                  </div>
                )}

                {apiError && (
                  <div className="git-api-error">
                    <span style={{ flexShrink: 0 }}>⚠️</span>
                    <span>{apiError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>

                  {/* Name */}
                  <div className="mb-3">
                    <label htmlFor="name" className="git-label">Name</label>
                    <input
                      id="name" type="text"
                      className="form-control git-input"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      style={inputStyle(!!errors.name)}
                      autoComplete="name"
                    />
                    {errors.name && <span className="git-error-text">⚠ {errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="git-label">Email</label>
                    <input
                      id="email" type="email"
                      className="form-control git-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={inputStyle(!!errors.email)}
                      autoComplete="email"
                    />
                    {errors.email && <span className="git-error-text">⚠ {errors.email}</span>}
                  </div>

                  {/* Message */}
                  <div className="mb-4">
                    <label htmlFor="message" className="git-label">Message</label>
                    <textarea
                      id="message"
                      className="form-control git-input"
                      placeholder="What's on your mind?"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      style={{ ...inputStyle(!!errors.message), resize: 'none' }}
                    />
                    <div className="git-char-count" style={{ color: formData.message.length < 10 ? '#f85149' : '#484f58' }}>
                      {formData.message.length} / 10 min chars
                    </div>
                    {errors.message && <span className="git-error-text">⚠ {errors.message}</span>}
                  </div>

                  <button type="submit" className="git-submit" disabled={loading}>
                    {loading
                      ? <><div className="git-spinner" /> Sending...</>
                      : <>✉️ Send Message</>
                    }
                  </button>
                </form>
              </div>

              {/* Direct email fallback */}
              <p style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: '#484f58', textAlign: 'center', marginTop: '1rem' }}>
                Or email directly:{' '}
                <a href="mailto:pratikshinde0165@gmail.com" style={{ color: '#58a6ff', textDecoration: 'none' }}>
                  pratikshinde0165@gmail.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default GetInTouch;
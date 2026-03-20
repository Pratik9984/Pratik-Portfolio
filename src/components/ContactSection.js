import React, { useEffect, useRef, useState } from 'react';

const WEB3FORMS_KEY = '9f274445-4488-4acd-8b72-da78b80820c9';

const validate = ({ name, email, message }) => ({
  name:    !name.trim()    ? 'Name is required'    : '',
  email:   !email.trim()   ? 'Email is required'   : !/\S+@\S+\.\S+/.test(email) ? 'Email is invalid' : '',
  message: !message.trim() ? 'Message is required' : '',
});

const inputBase = (hasError) => ({
  backgroundColor: '#0d1117',
  color: '#e6edf3',
  border: `1px solid ${hasError ? '#f85149' : '#30363d'}`,
  borderRadius: '10px',
  fontSize: '0.875rem',
  transition: 'border-color 0.2s, box-shadow 0.2s',
});

const contactDetails = [
  { icon: '📧', label: 'Email',    value: 'pratikshinde0165@gmail.com', href: 'mailto:pratikshinde0165@gmail.com' },
  { icon: '📱', label: 'Phone',    value: '+91 8421526195',              href: 'tel:+918421526195' },
  { icon: '📍', label: 'Location', value: 'Pune, Maharashtra, India',    href: null },
];

const socials = [
  { label: 'GitHub',   href: 'https://github.com/Pratik9984' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pratik-shinde-54743725a/' },
];

function ContactSection() {
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

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name:  'Portfolio Inquiry',
          subject:    `New message from ${formData.name}`,
          name:       formData.name,
          email:      formData.email,
          message:    formData.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setErrors({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setApiError('Submission failed. Please try again or email me directly.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setApiError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = (delay = 0) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        @keyframes cs-fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cs-spin   { to { transform: rotate(360deg); } }
        @keyframes cs-pop    { 0%{opacity:0;transform:scale(0.92);} 60%{transform:scale(1.03);} 100%{opacity:1;transform:scale(1);} }

        .cs-card {
          background: #161b22;
          border: 1px solid rgba(88,166,255,0.12);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .cs-card::before {
          content: '';
          position: absolute;
          top:0; left:0; right:0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #58a6ff, transparent);
          opacity: 0.5;
        }
        .cs-card:focus-within {
          border-color: rgba(88,166,255,0.28);
          box-shadow: 0 0 28px rgba(88,166,255,0.08);
        }

        .cs-label {
          display: block;
          font-size: 0.72rem;
          font-family: monospace;
          color: #58a6ff;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .cs-input:focus {
          border-color: rgba(88,166,255,0.5) !important;
          box-shadow: 0 0 0 3px rgba(88,166,255,0.1) !important;
          outline: none;
          background-color: #0d1117 !important;
          color: #e6edf3 !important;
        }
        .cs-input::placeholder { color: #484f58; font-size: 0.85rem; }

        .cs-error {
          display: block;
          font-size: 0.72rem;
          color: #f85149;
          margin-top: 4px;
        }

        .cs-submit {
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
        .cs-submit:hover:not(:disabled) {
          background: #79bcff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(88,166,255,0.28);
        }
        .cs-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        .cs-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(13,17,23,0.25);
          border-top-color: #0d1117;
          border-radius: 50%;
          animation: cs-spin 0.7s linear infinite;
        }

        .cs-success {
          animation: cs-pop 0.4s ease both;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 10px;
          background: rgba(35,134,54,0.1);
          border: 1px solid rgba(35,134,54,0.28);
          color: #3fb950;
          font-size: 0.84rem;
          font-weight: 500;
          margin-bottom: 1.25rem;
        }

        .cs-api-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(248,81,73,0.08);
          border: 1px solid rgba(248,81,73,0.25);
          color: #f85149;
          font-size: 0.82rem;
          margin-bottom: 1.25rem;
        }

        .cs-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 8px;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
          cursor: pointer;
        }
        .cs-info-row:hover {
          background: rgba(88,166,255,0.06);
          border-color: rgba(88,166,255,0.2);
        }
        .cs-info-label {
          font-size: 0.65rem;
          font-family: monospace;
          color: #58a6ff;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 1px;
        }
        .cs-info-value { font-size: 0.82rem; color: #cdd9e5; }

        .cs-social {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 14px;
          border-radius: 10px;
          font-size: 0.78rem;
          font-weight: 600;
          background: rgba(88,166,255,0.06);
          border: 1px solid rgba(88,166,255,0.2);
          color: #58a6ff;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, color 0.2s;
        }
        .cs-social:hover {
          background: rgba(88,166,255,0.14);
          transform: translateY(-2px);
          color: #79bcff;
        }
      `}</style>

      <section ref={sectionRef} className="py-5" id="contact" style={{ backgroundColor: '#0d1117' }}>
        <div className="container">

          {/* Eyebrow */}
          <div className="text-center mb-2" style={fadeUp(0)}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.2em', color: '#58a6ff', textTransform: 'uppercase' }}>
              — Let's Talk —
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-center mb-5"
            style={{ ...fadeUp(0.1), color: '#e6edf3', fontSize: 'clamp(2rem,5vw,2.75rem)', fontWeight: 700 }}
          >
            Contact <span style={{ color: '#58a6ff' }}>Me</span>
          </h2>

          <div className="row g-4 justify-content-center">

            {/* ── Left: Info panel ── */}
            <div className="col-12 col-md-4" style={{ maxWidth: '340px', ...fadeUp(0.2) }}>
              <div className="cs-card p-4 h-100 d-flex flex-column">

                <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#484f58', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  // reach_me_at
                </p>

                {/* Contact rows */}
                {contactDetails.map(({ icon, label, value, href }) => {
                  const inner = (
                    <>
                      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
                      <span>
                        <span className="cs-info-label">{label}</span>
                        <span className="cs-info-value">{value}</span>
                      </span>
                    </>
                  );
                  return href ? (
                    <a key={label} href={href} className="cs-info-row">{inner}</a>
                  ) : (
                    <div key={label} className="cs-info-row" style={{ cursor: 'default' }}>{inner}</div>
                  );
                })}

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '1.25rem 0' }} />

                {/* Social buttons */}
                <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#484f58', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  // find_me_online
                </p>
                <div className="d-flex gap-2 mb-4">
                  {socials.map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="cs-social">
                      {label}
                    </a>
                  ))}
                </div>

                {/* Availability badge — pinned to bottom */}
                <div className="mt-auto">
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '7px 14px', borderRadius: '20px',
                    background: 'rgba(35,134,54,0.1)', border: '1px solid rgba(35,134,54,0.25)',
                  }}>
                    <span style={{
                      width: '7px', height: '7px', borderRadius: '50%',
                      background: '#3fb950', boxShadow: '0 0 7px #3fb950',
                      display: 'inline-block', flexShrink: 0,
                    }} />
                    <span style={{ color: '#3fb950', fontSize: '0.72rem', fontWeight: 600, fontFamily: 'monospace' }}>
                      Available for work
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* ── Right: Form ── */}
            <div className="col-12 col-md-7" style={{ maxWidth: '580px', ...fadeUp(0.3) }}>
              <div className="cs-card p-4">

                {/* Success banner */}
                {submitted && (
                  <div className="cs-success">
                    <span>✅</span>
                    <span>Message sent! I'll get back to you within 24 hours.</span>
                  </div>
                )}

                {/* API error banner */}
                {apiError && (
                  <div className="cs-api-error">
                    <span>⚠️</span>
                    <span>{apiError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot — hidden from humans, catches bots */}
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex="-1" />

                  {/* Name */}
                  <div className="mb-3">
                    <label htmlFor="name" className="cs-label">Name</label>
                    <input
                      id="name" type="text"
                      className="form-control cs-input"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      style={inputBase(!!errors.name)}
                      autoComplete="name"
                    />
                    {errors.name && <span className="cs-error">⚠ {errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="cs-label">Email</label>
                    <input
                      id="email" type="email"
                      className="form-control cs-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={inputBase(!!errors.email)}
                      autoComplete="email"
                    />
                    {errors.email && <span className="cs-error">⚠ {errors.email}</span>}
                  </div>

                  {/* Message */}
                  <div className="mb-4">
                    <label htmlFor="message" className="cs-label">Message</label>
                    <textarea
                      id="message"
                      className="form-control cs-input"
                      placeholder="What's on your mind?"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      style={{ ...inputBase(!!errors.message), resize: 'none' }}
                    />
                    <div style={{
                      fontFamily: 'monospace', fontSize: '0.68rem', textAlign: 'right', marginTop: '4px',
                      color: formData.message.length === 0 ? '#484f58' : '#8b949e',
                    }}>
                      {formData.message.length} chars
                    </div>
                    {errors.message && <span className="cs-error">⚠ {errors.message}</span>}
                  </div>

                  <button type="submit" className="cs-submit" disabled={loading}>
                    {loading
                      ? <><div className="cs-spinner" /> Sending...</>
                      : <>✉️ Send Message</>
                    }
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default ContactSection;
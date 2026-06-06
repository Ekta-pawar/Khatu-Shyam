import { useState } from 'react';
import { Link } from 'react-router-dom';

function Stars() {
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i, top: Math.random() * 100, left: Math.random() * 100,
    size: Math.random() * 2 + 0.5, delay: Math.random() * 3, dur: Math.random() * 2 + 1.5,
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {stars.map(s => (
        <div key={s.id} className="star-particle" style={{
          top: s.top + '%', left: s.left + '%', width: s.size, height: s.size,
          animationDelay: s.delay + 's', animationDuration: s.dur + 's',
        }} />
      ))}
    </div>
  );
}

const socials = [
  { icon: '👥', label: 'Facebook', color: '#1877F2', hover: 'rgba(24,119,242,0.1)' },
  { icon: '📸', label: 'Instagram', color: '#E1306C', hover: 'rgba(225,48,108,0.1)' },
  { icon: '▶️', label: 'YouTube', color: '#FF0000', hover: 'rgba(255,0,0,0.1)' },
  { icon: '📱', label: 'WhatsApp', color: '#25D366', hover: 'rgba(37,211,102,0.1)' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.message) setSubmitted(true);
  };

  return (
    <div style={{ background: '#030D1A', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '45vh',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.1) 0%, transparent 60%), linear-gradient(180deg, #030D1A 0%, #06142E 100%)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingTop: 72, paddingBottom: 40, textAlign: 'center',
      }}>
        <Stars />
        <div style={{ position: 'relative', zIndex: 5, maxWidth: 700, padding: '0 24px' }}>
          <div className="section-badge">✦ SAMPARK KAREIN ✦</div>
          <h1 className="gold-shimmer" style={{
            fontFamily: 'Cinzel Decorative, Cinzel, serif',
            fontSize: 'clamp(28px,6vw,60px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16,
          }}>Contact Page</h1>
          <div className="gold-divider" style={{ width: 100, marginBottom: 16 }} />
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.9 }}>
            We'd love to hear from you. Reach out for membership, events, sponsorship, or any question.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, #030D1A, transparent)', pointerEvents: 'none' }} />
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ padding: '60px 32px 80px', background: '#030D1A' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'start' }}>

          {/* Left: Contact Info */}
          <div>
            {/* Phone */}
            <div className="glass-card" style={{ padding: '24px 28px', marginBottom: 16, transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(212,175,55,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 11, color: '#D4AF37', fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>Phone</div>
              <div style={{ fontSize: 18, color: '#fff', fontFamily: 'Cinzel, serif', fontWeight: 600 }}>+91 99 2133530</div>
            </div>

            {/* Email */}
            <div className="glass-card" style={{ padding: '24px 28px', marginBottom: 16, transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(212,175,55,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 11, color: '#D4AF37', fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>Email</div>
              <div style={{ fontSize: 16, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>email.now@gmail.com</div>
            </div>

            {/* WhatsApp */}
            <div className="glass-card-diamond" style={{ padding: '24px 28px', marginBottom: 28, transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(185,242,255,0.5)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(185,242,255,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(185,242,255,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 11, color: '#B9F2FF', fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>WhatsApp Integration</div>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: '#25D366',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, cursor: 'pointer', transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,211,102,0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)'; }}>📱</div>
            </div>

            {/* Social Icons */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#D4AF37', fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>FOLLOW US</div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {[
                  { icon: '👥', label: 'Facebook', color: '#1877F2', size: 64 },
                  { icon: '📸', label: 'Instagram', color: '#E1306C', size: 64 },
                ].map((s, i) => (
                  <div key={i} style={{
                    width: s.size, height: s.size, borderRadius: '50%',
                    background: `${s.color}22`, border: `2px solid ${s.color}55`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'all 0.3s ease', fontSize: 22,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${s.color}44`; e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = `0 8px 25px ${s.color}55`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${s.color}22`; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    {s.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            {submitted ? (
              <div className="glass-card" style={{ padding: '60px 40px', textAlign: 'center' }}>
                <div style={{ fontSize: 60, marginBottom: 20 }}>🙏</div>
                <h3 className="gold-shimmer" style={{ fontFamily: 'Cinzel, serif', fontSize: 24, marginBottom: 12 }}>Jai Shri Krishna!</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.8 }}>
                  Your message has been received. We will respond within 1–2 business days.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-gold" style={{ marginTop: 24, cursor: 'pointer', border: 'none' }}>Send Another</button>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '40px 36px' }}>
                <div style={{ fontSize: 11, color: '#D4AF37', fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: 2, marginBottom: 20 }}>SEND A MESSAGE</div>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'Poppins, sans-serif', fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>Full Name</label>
                    <input className="input-glass" placeholder="Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'Poppins, sans-serif', fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>Email</label>
                    <input className="input-glass" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'Poppins, sans-serif', fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>Comment</label>
                    <textarea className="input-glass" rows={5} placeholder="Message" required style={{ resize: 'vertical' }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <button type="submit" className="btn-gold" style={{ width: '100%', border: 'none', cursor: 'pointer', justifyContent: 'center' }}>
                    Contact
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section style={{
        padding: '80px 32px',
        background: 'linear-gradient(135deg, #030D1A 0%, #06142E 50%, #030D1A 100%)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <Stars />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
            Join Our Divine <span className="gold-shimmer">Krishna Family</span>
          </h2>
          <div className="gold-divider" style={{ width: 120, marginBottom: 28 }} />
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/become-a-member" className="btn-gold">🌸 Become a Member</Link>
            <Link to="/contact" className="btn-diamond">💎 Donate Now</Link>
            <Link to="/masik-kirtan" className="btn-glass">🎵 Join Kirtan</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

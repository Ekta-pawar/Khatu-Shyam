import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ThreeDScene from '../components/ThreeDScene';

/* ── Floating Particle ── */
function Particle({ style }) {
  return (
    <div style={{
      position: 'absolute', borderRadius: '50%',
      background: 'radial-gradient(circle, #FFD700, transparent)',
      pointerEvents: 'none', ...style,
    }} />
  );
}

/* ── Diya SVG ── */
function Diya({ size = 48, style = {} }) {
  return (
    <div style={{ width: size, height: size, ...style }} className="diya-float">
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="30" cy="42" rx="22" ry="10" fill="#8B4513" opacity="0.8"/>
        <ellipse cx="30" cy="40" rx="20" ry="8" fill="#A0522D"/>
        <ellipse cx="30" cy="38" rx="18" ry="6" fill="#CD853F"/>
        <circle cx="30" cy="35" r="5" fill="#FFD700" opacity="0.6"/>
        <ellipse cx="30" cy="22" rx="3" ry="12" fill="#FFD700" opacity="0.9"/>
        <ellipse cx="30" cy="18" rx="2" ry="8" fill="#FF8C00" opacity="0.8"/>
        <ellipse cx="30" cy="15" rx="1.5" ry="5" fill="#FFFFFF" opacity="0.7"/>
        <ellipse cx="30" cy="22" rx="8" ry="14" fill="url(#flameGrad)" opacity="0.3"/>
        <defs>
          <radialGradient id="flameGrad" cx="50%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#FFD700"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ── Peacock Feather SVG ── */
function PeacockFeather({ size = 200, style = {}, flip = false }) {
  return (
    <div style={{
      width: size, height: size * 2.5, opacity: 0.65,
      transform: flip ? 'scaleX(-1)' : 'none', ...style,
    }} className={flip ? 'feather-left' : 'feather-right'}>
      <svg viewBox="0 0 100 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 240 Q50 120 50 10" stroke="#0F5C4D" strokeWidth="3" opacity="0.8"/>
        <path d="M50 180 Q20 150 5 110" stroke="#0F5C4D" strokeWidth="1.5" opacity="0.6"/>
        <path d="M50 160 Q75 130 88 95" stroke="#0F5C4D" strokeWidth="1.5" opacity="0.6"/>
        <path d="M50 140 Q15 120 8 80" stroke="#1A8C78" strokeWidth="1.5" opacity="0.5"/>
        <path d="M50 120 Q80 100 85 62" stroke="#1A8C78" strokeWidth="1.5" opacity="0.5"/>
        <path d="M50 100 Q20 85 18 48" stroke="#0F5C4D" strokeWidth="1.5" opacity="0.4"/>
        <path d="M50 80 Q75 65 72 30" stroke="#0F5C4D" strokeWidth="1.5" opacity="0.4"/>
        <ellipse cx="50" cy="60" rx="28" ry="40" fill="#1A8C78" opacity="0.15"/>
        <ellipse cx="50" cy="60" rx="18" ry="28" fill="#0F5C4D" opacity="0.2"/>
        <circle cx="50" cy="55" r="16" fill="#0A2D30" opacity="0.5"/>
        <circle cx="50" cy="55" r="10" fill="#1A8C78" opacity="0.7"/>
        <circle cx="50" cy="55" r="5" fill="#06142E" opacity="0.9"/>
        <circle cx="50" cy="55" r="2.5" fill="#B9F2FF" opacity="0.8"/>
        <ellipse cx="50" cy="55" rx="16" ry="16" stroke="#D4AF37" strokeWidth="1" opacity="0.5" fill="none"/>
      </svg>
    </div>
  );
}

/* ── Animated Counter ── */
function Counter({ end, label, suffix = '+' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(end / 60);
        const timer = setInterval(() => {
          start = Math.min(start + step, end);
          setCount(start);
          if (start >= end) clearInterval(timer);
        }, 25);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: 'clamp(36px,5vw,56px)', fontWeight: 900,
        fontFamily: 'Cinzel, serif', lineHeight: 1,
        color: '#FFD700', marginBottom: 6,
        textShadow: '0 0 30px rgba(255,215,0,0.5)',
      }}>{count.toLocaleString()}{suffix}</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif' }}>{label}</div>
    </div>
  );
}

/* ── Star Bg ── */
function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 3,
    dur: Math.random() * 2 + 1.5,
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {stars.map(s => (
        <div key={s.id} className="star-particle" style={{
          top: s.top + '%', left: s.left + '%',
          width: s.size, height: s.size,
          animationDelay: s.delay + 's', animationDuration: s.dur + 's',
        }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════ */
export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  const features = [
    { icon: '🕉', title: 'Divine Janmashtami', desc: 'Grand celebrations of Lord Krishna\'s birth with cultural programs, bhajans and community feasts.' },
    { icon: '🎵', title: 'Masik Kirtan', desc: 'Monthly devotional gatherings filled with soul-stirring kirtan, devotional music and spiritual discourse.' },
    { icon: '🌺', title: 'Community Seva', desc: 'United in service — from food distribution to festival management, our devotees serve with pure love.' },
    { icon: '💎', title: 'Digital Membership', desc: 'Join our divine family with a premium digital membership card and exclusive event access.' },
  ];

  const timeline = [
    { year: '2011', event: 'Organization Founded', desc: 'Khatushyam was established with a vision of divine service.' },
    { year: '2013', event: 'First Grand Janmashtami', desc: 'Launched the grand Janmashtami Mahotsav tradition that now draws thousands.' },
    { year: '2016', event: 'Masik Kirtan Begins', desc: 'Monthly kirtan gatherings introduced to nurture continuous devotion.' },
    { year: '2020', event: 'Community Growth', desc: 'Membership crossed 500 devoted families across the region.' },
    { year: '2024', event: 'Digital Era', desc: 'Launched digital membership system and live streaming of events.' },
  ];

  return (
    <div style={{ background: '#030D1A', overflowX: 'hidden' }}>

      {/* ══ HERO ══ */}
      <section style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 20% 50%, rgba(15,92,77,0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.1) 0%, transparent 50%), linear-gradient(180deg, #030D1A 0%, #06142E 50%, #030D1A 100%)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingTop: 72,
      }}>
        <Stars />

        {/* Mouse follow glow */}
        <div style={{
          position: 'fixed', pointerEvents: 'none', zIndex: 0,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
          left: mousePos.x - 200, top: mousePos.y - 200,
          transition: 'left 0.1s ease, top 0.1s ease',
        }} />

        {/* Peacock feathers */}
        <PeacockFeather size={160} style={{ position: 'absolute', top: 0, right: '2%', zIndex: 1 }} />
        <PeacockFeather size={130} style={{ position: 'absolute', top: '10%', right: '12%', zIndex: 1 }} flip />
        <PeacockFeather size={140} style={{ position: 'absolute', top: 0, left: '2%', zIndex: 1 }} flip />
        <PeacockFeather size={110} style={{ position: 'absolute', top: '15%', left: '14%', zIndex: 1 }} />

        {/* Floating Diyas */}
        <Diya size={52} style={{ position: 'absolute', top: '20%', left: '8%', zIndex: 2, animationDelay: '0s' }} />
        <Diya size={40} style={{ position: 'absolute', top: '35%', right: '8%', zIndex: 2, animationDelay: '1s' }} />
        <Diya size={46} style={{ position: 'absolute', bottom: '25%', left: '15%', zIndex: 2, animationDelay: '2s' }} />
        <Diya size={38} style={{ position: 'absolute', bottom: '30%', right: '15%', zIndex: 2, animationDelay: '0.5s' }} />

        {/* Gold glow orbs */}
        <div style={{ position: 'absolute', top: '10%', right: '20%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(15,92,77,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Content */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 5, padding: '0 24px', maxWidth: 900, margin: '0 auto' }}>

          {/* Sanskrit tag */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: 40, padding: '6px 20px', marginBottom: 28,
            backdropFilter: 'blur(10px)',
          }}>
            <span style={{ fontSize: 11, color: '#D4AF37', fontFamily: 'Poppins, sans-serif', fontWeight: 600, letterSpacing: 3 }}>✦ JAY SHRI KRISHNA ✦</span>
          </div>

          {/* Main Devanagari */}
          <div className="gold-shimmer" style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: 'clamp(40px, 8vw, 90px)',
            fontWeight: 700, lineHeight: 1.1, marginBottom: 16,
            filter: 'drop-shadow(0 0 40px rgba(212,175,55,0.4))',
          }}>
            जय श्री कृष्ण
          </div>

          {/* Org name */}
          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(18px, 3.5vw, 40px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.92)',
            letterSpacing: 2,
            marginBottom: 20,
            lineHeight: 1.3,
          }}>Khatushyam Divine Community</h1>

          <div className="gold-divider" style={{ width: 120, marginBottom: 24 }} />

          <p style={{
            fontSize: 'clamp(13px,1.5vw,16px)',
            color: 'rgba(255,255,255,0.55)',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: 1.9, maxWidth: 580, margin: '0 auto 40px',
          }}>
            A divine community dedicated to celebrating Lord Krishna's teachings through Janmashtami, Masik Kirtan, and spiritual service at Khatushyam since 2011.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/become-a-member" className="btn-gold">🌸 Become a Member</Link>
            <Link to="/janmashtami" className="btn-diamond">✨ Explore Janmashtami</Link>
            <Link to="/gallery" className="btn-glass">🖼 View Gallery</Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(to top, #030D1A, transparent)', pointerEvents: 'none' }} />
      </section>

      {/* ══ 3D DIVINE SCENE ══ */}
      <section style={{
        minHeight: '70vh',
        background: 'linear-gradient(135deg, #030D1A 0%, #06142E 50%, #0A1E3D 100%)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 32px',
      }}>
        <Stars />
        
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ThreeDScene className="w-full h-full" />
        </div>

        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', maxWidth: 500 }}>
          <div style={{
            background: 'rgba(6,20,46,0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: 24,
            padding: '40px 32px',
          }}>
            <h2 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(24px, 4vw, 38px)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: 12,
            }}>Experience the <span className="gold-shimmer">Divine 3D Journey</span></h2>
            <div className="gold-divider" style={{ width: 100, marginBottom: 20 }} />
            <p style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'Poppins, sans-serif',
              lineHeight: 1.8,
              marginBottom: 24,
            }}>
              Immerse yourself in the spiritual essence of Khatushyam with our interactive 3D experience, guided by divine energy and sacred geometry.
            </p>
            <Link to="/janmashtami" className="btn-gold" style={{ display: 'inline-block' }}>
              ✨ Explore More
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{
        padding: '80px 32px',
        background: 'linear-gradient(180deg, #030D1A 0%, #06142E 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
          {[
            { end: 2011, label: 'Established', suffix: '' },
            { end: 500, label: 'Member Families' },
            { end: 14, label: 'Years of Service' },
            { end: 20000, label: 'Lives Touched' },
          ].map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: '32px 24px', textAlign: 'center' }}>
              <Counter end={s.end} label={s.label} suffix={s.suffix !== undefined ? s.suffix : '+'} />
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section style={{ padding: '100px 32px', background: '#06142E', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-badge">✦ OUR DIVINE OFFERINGS ✦</div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(24px,4vw,42px)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
            Experience the <span className="gold-shimmer">Divine Journey</span>
          </h2>
          <div className="gold-divider" style={{ width: 100, marginTop: 16 }} />
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
          {features.map((f, i) => (
            <div key={i} className="glass-card card-3d" style={{
              padding: '40px 32px', textAlign: 'center',
              cursor: 'pointer', transition: 'all 0.4s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(212,175,55,0.15)';
              e.currentTarget.style.transform = 'translateY(-8px) rotateX(-3deg)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0) rotateX(0)';
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.05))',
                border: '1px solid rgba(212,175,55,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, margin: '0 auto 20px',
                boxShadow: '0 0 30px rgba(212,175,55,0.1)',
              }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 700, color: '#D4AF37', marginBottom: 12 }}>{f.title}</h3>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.8 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ABOUT / STORYTELLING ══ */}
      <section style={{
        padding: '100px 32px',
        background: 'linear-gradient(135deg, #030D1A 0%, #06142E 60%, #030D1A 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <Stars />
        <PeacockFeather size={180} style={{ position: 'absolute', top: '5%', right: '1%', zIndex: 1 }} />
        <PeacockFeather size={150} style={{ position: 'absolute', bottom: '5%', left: '1%', zIndex: 1 }} flip />

        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 2 }}>
          {/* Left */}
          <div>
            <div className="section-badge">✦ OUR STORY ✦</div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(22px,3.5vw,38px)', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 16 }}>
              Khatushyam's <span className="gold-shimmer">Divine Journey</span><br/>Since 2011
            </h2>
            <div className="gold-divider-left" style={{ marginBottom: 24 }} />
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.9, marginBottom: 20 }}>
              Khatushyam is a devotional organization serving the community since 2011 — organizing grand Janmashtami celebrations, monthly Masik Kirtan gatherings, and community seva programs.
            </p>
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.9, marginBottom: 32 }}>
              We foster community unity and devotion through the divine teachings of Lord Krishna, creating a spiritual family bonded by faith, culture, and love.
            </p>

            {/* Quote */}
            <div className="glass-card" style={{ padding: '20px 24px', borderLeft: '3px solid #D4AF37' }}>
              <p style={{ fontSize: 14, color: '#FFD700', fontFamily: 'Poppins, sans-serif', fontStyle: 'italic', lineHeight: 1.8 }}>
                "Spiritual wisdom is the manowand of God. In thanks at the motivation of the divine."
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 8, fontFamily: 'Poppins, sans-serif' }}>— Founding Member</p>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 20, top: 0, bottom: 0, width: 2,
              background: 'linear-gradient(180deg, transparent, #D4AF37, #FFD700, #D4AF37, transparent)',
            }} />
            {timeline.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 32, marginBottom: 36, paddingLeft: 48, position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 10, top: 4, width: 20, height: 20, borderRadius: '50%',
                  background: i === 2 ? '#FFD700' : 'rgba(212,175,55,0.3)',
                  border: '2px solid #D4AF37',
                  boxShadow: i === 2 ? '0 0 20px rgba(255,215,0,0.6)' : 'none',
                }} />
                <div>
                  <div style={{ fontSize: 11, color: '#D4AF37', fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>{t.year}</div>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{t.event}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ KRISHNA CHAKRA SECTION ══ */}
      <section style={{
        padding: '100px 32px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(15,92,77,0.2) 0%, transparent 60%), #06142E',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Rotating Chakra */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600, opacity: 0.04, pointerEvents: 'none',
          animation: 'chakraSpin 40s linear infinite',
        }}>
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" stroke="#D4AF37" strokeWidth="2"/>
            <circle cx="100" cy="100" r="70" stroke="#D4AF37" strokeWidth="1.5"/>
            <circle cx="100" cy="100" r="20" fill="#D4AF37"/>
            {Array.from({ length: 24 }, (_, i) => {
              const angle = (i * 360 / 24) * Math.PI / 180;
              return (
                <line key={i}
                  x1={100 + 20 * Math.cos(angle)} y1={100 + 20 * Math.sin(angle)}
                  x2={100 + 90 * Math.cos(angle)} y2={100 + 90 * Math.sin(angle)}
                  stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
              );
            })}
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-badge">✦ UPCOMING EVENTS ✦</div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(24px,4vw,42px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
            Celebrate with Us
          </h2>
          <div className="gold-divider" style={{ width: 100, marginBottom: 48 }} />

          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
            {[
              { icon: '🏛', title: 'Janmashtami Mahotsav', date: '29 Aug – 4 Sept', tag: 'Grand Festival', color: '#D4AF37' },
              { icon: '🎵', title: 'Masik Kirtan', date: 'Every Month', tag: 'Monthly Devotion', color: '#B9F2FF' },
              { icon: '🌸', title: 'Community Seva', date: 'Ongoing', tag: 'Service Program', color: '#D4AF37' },
            ].map((ev, i) => (
              <div key={i} className={i === 1 ? 'glass-card-diamond' : 'glass-card'} style={{
                padding: '40px 28px', textAlign: 'center',
                transition: 'all 0.4s ease', cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{ev.icon}</div>
                <div style={{
                  display: 'inline-block', padding: '3px 12px', borderRadius: 20,
                  background: i === 1 ? 'rgba(185,242,255,0.1)' : 'rgba(212,175,55,0.1)',
                  border: `1px solid ${i === 1 ? 'rgba(185,242,255,0.3)' : 'rgba(212,175,55,0.3)'}`,
                  fontSize: 10, color: ev.color, fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600, letterSpacing: 2, marginBottom: 12,
                }}>{ev.tag}</div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 19, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{ev.title}</h3>
                <p style={{ fontSize: 13, color: ev.color, fontFamily: 'Poppins, sans-serif', opacity: 0.8 }}>{ev.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{
        padding: '100px 32px',
        background: 'linear-gradient(135deg, #030D1A 0%, #06142E 50%, #030D1A 100%)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <Stars />
        <Diya size={56} style={{ position: 'absolute', top: '10%', left: '5%', zIndex: 2 }} />
        <Diya size={44} style={{ position: 'absolute', top: '10%', right: '5%', zIndex: 2 }} />

        {/* Glow ring */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600, borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.08)',
          boxShadow: 'inset 0 0 100px rgba(212,175,55,0.03)',
          pointerEvents: 'none',
          animation: 'glowPulse 4s ease-in-out infinite',
        }} />

        <div style={{ position: 'relative', zIndex: 3, maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontSize: 56, marginBottom: 16, animation: 'float 5s ease-in-out infinite' }}>🕉</div>
          <h2 style={{
            fontFamily: 'Cinzel, serif', fontSize: 'clamp(26px,4vw,46px)',
            fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 16,
          }}>
            Join Our Divine<br/><span className="gold-shimmer">Krishna Family</span>
          </h2>
          <div className="gold-divider" style={{ width: 120, marginBottom: 20 }} />
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.9, marginBottom: 40 }}>
            Become a part of this divine community and celebrate every festival, kirtan and seva together.
          </p>
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

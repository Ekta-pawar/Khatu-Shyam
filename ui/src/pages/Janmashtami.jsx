import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Stars() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i, top: Math.random() * 100, left: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5, delay: Math.random() * 3, dur: Math.random() * 2 + 1.5,
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

function Firework({ style }) {
  return (
    <div style={{ position: 'absolute', pointerEvents: 'none', width: 60, height: 60, ...style }}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={{
          position: 'absolute', width: 4, height: 4, borderRadius: '50%',
          background: i % 2 === 0 ? '#FFD700' : '#B9F2FF',
          left: '50%', top: '50%',
          animation: 'particleDrift 2s ease-out infinite',
          animationDelay: i * 0.15 + 's',
          transform: `rotate(${i * 45}deg) translateX(${25 + Math.random() * 20}px)`,
        }} />
      ))}
    </div>
  );
}

function Countdown() {
  const target = new Date('2025-08-29T00:00:00');
  const getTime = () => {
    const diff = Math.max(0, target - new Date());
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(getTime());
  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = n => String(n).padStart(2, '0');
  return (
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
      {[{ val: pad(time.h), label: 'HRS' }, { val: pad(time.m), label: 'MIN' }, { val: pad(time.s), label: 'SEC' }].map((t, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="glass-card" style={{ padding: '20px 28px', textAlign: 'center', minWidth: 90 }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, color: '#FFD700', lineHeight: 1, textShadow: '0 0 30px rgba(255,215,0,0.6)' }}>{t.val}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, fontFamily: 'Poppins, sans-serif', marginTop: 4 }}>{t.label}</div>
          </div>
          {i < 2 && <div style={{ fontSize: 44, color: '#D4AF37', fontFamily: 'Cinzel, serif', fontWeight: 700, textShadow: '0 0 20px rgba(212,175,55,0.6)' }}>:</div>}
        </div>
      ))}
    </div>
  );
}

const memoryImages = [
  { bg: 'linear-gradient(135deg, #1A0A2E, #3D1B6E)', icon: '🎆', label: 'Fireworks 2023' },
  { bg: 'linear-gradient(135deg, #0A1628, #1A4080)', icon: '🕉', label: 'Puja 2023' },
  { bg: 'linear-gradient(135deg, #0F2D1A, #1A5C30)', icon: '🎵', label: 'Kirtan Night' },
];
const highlightImages = [
  { bg: 'linear-gradient(135deg, #1A0A2E, #4A1F6E)', icon: '🙏', label: 'Darshan' },
  { bg: 'linear-gradient(135deg, #0A2D0A, #1A6030)', icon: '🌸', label: 'Decoration' },
  { bg: 'linear-gradient(135deg, #2D1A0A, #6E3F1F)', icon: '🎊', label: 'Celebration' },
];

const programs = [
  { time: '29 Aug', title: 'Aajni Karyakaram', desc: 'Opening ceremony with special prayers and aarti.', highlight: false },
  { time: '30 Aug', title: 'Bhajan Sandhya', desc: 'Evening of devotional songs and kirtan.', highlight: false },
  { time: '31 Aug', title: 'Cultural Programs', desc: 'Dance, drama, and Krishna leela performances.', highlight: false },
  { time: '1 Sept', title: 'Janmashtami Night', desc: 'Midnight celebration of Lord Krishna\'s birth.', highlight: true },
  { time: '2 Sept', title: 'Prasad Vitaran', desc: 'Community feast and prasad distribution.', highlight: false },
  { time: '4 Sept', title: 'Closing Ceremony', desc: 'Final aarti and gratitude gathering.', highlight: false },
];

export default function Janmashtami() {
  return (
    <div style={{ background: '#030D1A', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(15,92,77,0.2) 0%, transparent 50%), linear-gradient(180deg, #030D1A 0%, #06142E 50%, #030D1A 100%)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingTop: 72, paddingBottom: 60,
      }}>
        <Stars />
        <Firework style={{ top: '15%', left: '5%' }} />
        <Firework style={{ top: '18%', right: '8%' }} />
        <Firework style={{ top: '55%', left: '4%' }} />
        <Firework style={{ top: '60%', right: '5%' }} />

        {/* Temple BG */}
        <div style={{ position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)', width: 400, opacity: 0.12, pointerEvents: 'none' }}>
          <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M150 5 L158 35 L168 35 L158 70 L178 70 L178 155 L122 155 L122 70 L142 70 L132 35 L142 35 Z" fill="#D4AF37"/>
            <rect x="88" y="115" width="124" height="65" fill="#D4AF37"/>
            <path d="M88 115 L58 98 L78 98 L78 115Z" fill="#D4AF37"/>
            <path d="M212 115 L242 98 L222 98 L222 115Z" fill="#D4AF37"/>
            <rect x="55" y="135" width="32" height="45" fill="#9A7D0A"/>
            <rect x="213" y="135" width="32" height="45" fill="#9A7D0A"/>
          </svg>
        </div>

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 5, padding: '0 24px', maxWidth: 900, margin: '0 auto' }}>
          <div className="section-badge">✦ GRAND FESTIVAL ✦</div>
          <h1 className="gold-shimmer" style={{
            fontFamily: 'Cinzel Decorative, Cinzel, serif',
            fontSize: 'clamp(36px,8vw,88px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20,
            filter: 'drop-shadow(0 0 40px rgba(212,175,55,0.5))',
          }}>Janmashtami</h1>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
            {['Aajni Karyakaram', 'Date: 29 Aug – 4 Sept', 'Janmashtami Celebration'].map((b, i) => (
              <div key={i} className="glass-card" style={{ padding: '10px 22px', borderRadius: 50 }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: 'Poppins, sans-serif' }}>{b}</span>
              </div>
            ))}
          </div>

          <Countdown />
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 150, background: 'linear-gradient(to top, #030D1A, transparent)', pointerEvents: 'none' }} />
      </section>

      {/* ── MEMORIES + HIGHLIGHTS ── */}
      <section style={{ padding: '80px 32px', background: '#06142E' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'start' }}>
          <div>
            <div className="section-badge">✦ MEMORIES ✦</div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Previous Event Memories</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {memoryImages.map((img, i) => (
                <div key={i} className="glass-card" style={{
                  height: 110, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  background: img.bg, cursor: 'pointer', gap: 8,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06) translateZ(20px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(212,175,55,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ fontSize: 32 }}>{img.icon}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '0 4px' }}>{img.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="section-badge" style={{ background: 'rgba(185,242,255,0.06)', borderColor: 'rgba(185,242,255,0.2)', color: '#B9F2FF' }}>✦ HIGHLIGHTS ✦</div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Festival Highlights</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {highlightImages.map((img, i) => (
                <div key={i} className="glass-card-diamond" style={{
                  height: 110, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  background: img.bg, cursor: 'pointer', gap: 8,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(185,242,255,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ fontSize: 32 }}>{img.icon}</div>
                  <div style={{ fontSize: 10, color: 'rgba(185,242,255,0.7)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '0 4px' }}>{img.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section style={{ padding: '80px 32px', background: '#030D1A', position: 'relative' }}>
        <Stars />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-badge">✦ PROGRAM ✦</div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 32, fontWeight: 700, color: '#fff' }}>Event Schedule</h2>
            <div className="gold-divider" style={{ width: 100, marginTop: 14 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {programs.map((p, i) => (
              <div key={i} className="glass-card" style={{
                padding: '22px 28px', display: 'flex', gap: 28, alignItems: 'flex-start',
                transition: 'all 0.3s ease', cursor: 'default',
                borderLeft: p.highlight ? '3px solid #FFD700' : '1px solid rgba(212,175,55,0.2)',
                background: p.highlight ? 'rgba(212,175,55,0.06)' : 'rgba(255,255,255,0.03)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.borderColor = p.highlight ? '#FFD700' : 'rgba(212,175,55,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = p.highlight ? '#FFD700' : 'rgba(212,175,55,0.2)'; }}>
                <div style={{ minWidth: 72, paddingRight: 24, borderRight: '1px solid rgba(212,175,55,0.15)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: p.highlight ? '#FFD700' : '#D4AF37', fontFamily: 'Cinzel, serif', whiteSpace: 'nowrap' }}>{p.time}</div>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 700, color: p.highlight ? '#FFD700' : '#fff', marginBottom: 5 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPONSORS ── */}
      <section style={{ padding: '70px 32px', background: '#06142E', textAlign: 'center' }}>
        <div className="section-badge" style={{ marginBottom: 16 }}>✦ OUR SPONSORS ✦</div>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 40 }}>Sponsors</h2>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[{ name: 'Logo', icon: '⚡' }, { name: 'Corporate', icon: '🏢' }, { name: 'INSC Corporate', icon: '🌐' }].map((s, i) => (
            <div key={i} className="glass-card" style={{
              padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 12,
              transition: 'all 0.3s ease', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 40px rgba(212,175,55,0.2)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'; }}>
              <span style={{ fontSize: 28 }}>{s.icon}</span>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 600, color: '#fff' }}>{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 32px', background: '#030D1A', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(22px,3.5vw,38px)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
          Join the <span className="gold-shimmer">Grand Celebration</span>
        </h2>
        <div className="gold-divider" style={{ width: 100, marginBottom: 32 }} />
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/become-a-member" className="btn-gold">🌸 Register Now</Link>
          <Link to="/contact" className="btn-diamond">💌 Contact Us</Link>
        </div>
      </section>
    </div>
  );
}

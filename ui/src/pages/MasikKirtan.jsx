import { useState } from 'react';
import { Link } from 'react-router-dom';

function Stars() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
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

function MusicNote({ style }) {
  return <div className="music-note" style={style}>🎵</div>;
}

const kirtanDates = [
  { date: '29 Aug 2025', theme: 'Janmashtami Special', time: '7:00 PM', status: 'upcoming' },
  { date: '29 Sep 2025', theme: 'Ganesh Chaturthi', time: '6:30 PM', status: 'upcoming' },
  { date: '29 Oct 2025', theme: 'Navratri Special', time: '7:00 PM', status: 'today' },
  { date: '14 Nov 2025', theme: 'Diwali Kirtan', time: '8:00 PM', status: 'upcoming' },
];

const devotionalImages = [
  { bg: 'linear-gradient(135deg, #1A0A0A, #4A1515)', icon: '🙏', label: 'Bhajan Gathering' },
  { bg: 'linear-gradient(135deg, #0A1A1A, #154A40)', icon: '🎶', label: 'Musical Night' },
  { bg: 'linear-gradient(135deg, #1A1A0A, #404A15)', icon: '🌸', label: 'Puja Ceremony' },
];

const quotes = [
  { text: '"Spiritual wisdom is the pathway to divine consciousness and the marks of true devotion."', author: '- Shri Nandlal Maharaj' },
  { text: '"Spring spiritual kirtan is the eternal marks of the divine and the soul\'s true nature."', author: '- Parth Swami' },
];

export default function MasikKirtan() {
  const [activeNote, setActiveNote] = useState(null);

  return (
    <div style={{ background: '#030D1A', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '60vh',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(15,92,77,0.2) 0%, transparent 60%), linear-gradient(180deg, #030D1A 0%, #06142E 100%)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingTop: 72, paddingBottom: 40, textAlign: 'center',
      }}>
        <Stars />
        {/* Floating music notes */}
        <MusicNote style={{ left: '8%', top: '40%', animationDelay: '0s' }} />
        <MusicNote style={{ left: '15%', top: '60%', animationDelay: '0.5s', fontSize: 28 }}>♪</MusicNote>
        <MusicNote style={{ right: '10%', top: '35%', animationDelay: '1s' }} />
        <MusicNote style={{ right: '18%', top: '65%', animationDelay: '1.5s', fontSize: 28 }}>♫</MusicNote>
        <MusicNote style={{ left: '40%', top: '20%', animationDelay: '0.8s', fontSize: 14 }} />

        {/* Flute decoration */}
        <div style={{
          position: 'absolute', left: '3%', top: '50%',
          transform: 'translateY(-50%) rotateZ(22deg) rotateX(10deg)',
          fontSize: 80, opacity: 0.15, pointerEvents: 'none',
          animation: 'featherFloat 8s ease-in-out infinite',
        }}>🪈</div>

        <div style={{ position: 'relative', zIndex: 5, maxWidth: 700, padding: '0 24px' }}>
          <div className="section-badge">✦ MONTHLY DEVOTION ✦</div>
          <h1 className="gold-shimmer" style={{
            fontFamily: 'Cinzel Decorative, Cinzel, serif',
            fontSize: 'clamp(30px,6vw,64px)', fontWeight: 900, lineHeight: 1.1,
            marginBottom: 16,
          }}>Masik Kirtan</h1>
          <div className="gold-divider" style={{ width: 100, marginBottom: 20 }} />
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.9 }}>
            A monthly spiritual gathering of devotees for soul-stirring kirtan, bhajans, and devotional music in the glory of Lord Krishna.
          </p>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to top, #030D1A, transparent)', pointerEvents: 'none' }} />
      </section>

      {/* ── CALENDAR + GALLERY ── */}
      <section style={{ padding: '80px 32px', background: '#06142E', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 60, position: 'relative', zIndex: 2 }}>

          {/* Kirtan Calendar */}
          <div>
            <div className="section-badge">✦ SCHEDULE ✦</div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Upcoming Kirtan Calendar</h2>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: '#B9F2FF', fontFamily: 'Poppins, sans-serif' }}>Today</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {kirtanDates.map((k, i) => (
                <div key={i} className={k.status === 'today' ? 'glass-card-diamond' : 'glass-card'} style={{
                  padding: '16px 24px', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: k.status === 'today' ? 'rgba(185,242,255,0.08)' : 'rgba(255,255,255,0.03)',
                  borderColor: k.status === 'today' ? 'rgba(185,242,255,0.4)' : 'rgba(212,175,55,0.2)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(6px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
                  <div>
                    <div style={{ fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 600, color: k.status === 'today' ? '#B9F2FF' : '#fff', marginBottom: 3 }}>{k.date}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'Poppins, sans-serif' }}>{k.theme} · {k.time}</div>
                  </div>
                  {k.status === 'today' && (
                    <div style={{ padding: '4px 12px', background: 'rgba(185,242,255,0.15)', border: '1px solid rgba(185,242,255,0.3)', borderRadius: 20, fontSize: 10, color: '#B9F2FF', fontFamily: 'Poppins, sans-serif', fontWeight: 600, letterSpacing: 1 }}>LIVE</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Devotional Gallery + Live Streaming */}
          <div>
            <div className="section-badge" style={{ background: 'rgba(185,242,255,0.06)', borderColor: 'rgba(185,242,255,0.2)', color: '#B9F2FF' }}>✦ GALLERY ✦</div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Devotional Gathering Photos</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 28 }}>
              {devotionalImages.map((img, i) => (
                <div key={i} className="glass-card" style={{
                  height: 100, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  background: img.bg, cursor: 'pointer', gap: 6,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ fontSize: 28 }}>{img.icon}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>{img.label}</div>
                </div>
              ))}
            </div>

            {/* Live Streaming */}
            <div className="section-badge" style={{ marginBottom: 16 }}>✦ LIVE STREAMING ✦</div>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Live Streaming Section</h3>
            <div className="glass-card" style={{
              height: 180, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer',
              background: 'linear-gradient(135deg, rgba(10,46,48,0.6), rgba(6,20,46,0.8))',
              borderColor: 'rgba(185,242,255,0.2)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(185,242,255,0.5)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(185,242,255,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(185,242,255,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 40, animation: 'float 4s ease-in-out infinite' }}>📡</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, color: '#B9F2FF', fontFamily: 'Cinzel, serif', fontWeight: 600, marginBottom: 4 }}>Next Live: 29 Oct 2025</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'Poppins, sans-serif' }}>Click to subscribe for notifications</div>
              </div>
              <div style={{ padding: '6px 18px', background: 'rgba(185,242,255,0.1)', border: '1px solid rgba(185,242,255,0.3)', borderRadius: 20, fontSize: 11, color: '#B9F2FF', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Set Reminder</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTES ── */}
      <section style={{ padding: '80px 32px', background: '#030D1A', position: 'relative', overflow: 'hidden' }}>
        <Stars />
        <MusicNote style={{ left: '5%', top: '30%', animationDelay: '0s' }} />
        <MusicNote style={{ right: '5%', top: '50%', animationDelay: '1.2s' }} />

        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, position: 'relative', zIndex: 2 }}>
          {quotes.map((q, i) => (
            <div key={i} className={i % 2 === 0 ? 'glass-card' : 'glass-card-diamond'} style={{ padding: '36px 32px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🎵</div>
              <p style={{
                fontSize: 14.5, fontStyle: 'italic', lineHeight: 1.9,
                color: i % 2 === 0 ? 'rgba(255,215,0,0.8)' : 'rgba(185,242,255,0.8)',
                fontFamily: 'Poppins, sans-serif', marginBottom: 16,
              }}>{q.text}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'Poppins, sans-serif' }}>{q.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '70px 32px', background: '#06142E', textAlign: 'center' }}>
        <div className="section-badge" style={{ marginBottom: 16 }}>✦ JOIN US ✦</div>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
          Experience the <span className="gold-shimmer">Divine Kirtan</span>
        </h2>
        <div className="gold-divider" style={{ width: 100, marginBottom: 28 }} />
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.9, maxWidth: 500, margin: '0 auto 32px' }}>
          Join us every month and immerse yourself in the devotional atmosphere of Masik Kirtan.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/become-a-member" className="btn-gold">🎵 Join Kirtan</Link>
          <Link to="/contact" className="btn-diamond">📅 Get Schedule</Link>
        </div>
      </section>
    </div>
  );
}

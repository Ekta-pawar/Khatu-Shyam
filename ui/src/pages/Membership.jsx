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

const tiers = [
  {
    icon: '👤', name: 'Member', price: 'Free', features: ['Event Access', 'Community Updates', 'Kirtan Notifications', 'Digital Certificate'],
    color: 'rgba(212,175,55,0.2)', border: 'rgba(212,175,55,0.3)', textColor: '#D4AF37', type: 'gold',
  },
  {
    icon: '🏅', name: 'Golden Member', price: '₹1,100 / yr', features: ['All Member Benefits', 'Priority Event Seats', 'Exclusive Kirtan Access', 'Golden Digital Card', 'Birthday Wishes'],
    color: 'rgba(255,215,0,0.08)', border: '#FFD700', textColor: '#FFD700', type: 'gold', featured: true,
  },
  {
    icon: '💎', name: 'Diamond Member', price: '₹5,100 / yr', features: ['All Golden Benefits', 'VIP Festival Access', 'Sponsor Recognition', 'Diamond Digital Card', 'Family Benefits', 'Personal Seva'],
    color: 'rgba(185,242,255,0.06)', border: 'rgba(185,242,255,0.4)', textColor: '#B9F2FF', type: 'diamond',
  },
];

const benefits = [
  { icon: '🎆', title: 'Exclusive Festival Access', desc: 'Priority entry and reserved seating at all grand celebrations.' },
  { icon: '🎵', title: 'Kirtan Gatherings', desc: 'Be part of monthly devotional kirtan circles with fellow devotees.' },
  { icon: '🌸', title: 'Seva Opportunities', desc: 'Participate in meaningful community service programs.' },
  { icon: '📱', title: 'Digital Membership Card', desc: 'Carry your divine membership with a premium digital card.' },
  { icon: '🎁', title: 'Special Occasions', desc: 'Birthday and anniversary blessings from the Mandal.' },
  { icon: '📡', title: 'Live Event Streaming', desc: 'Watch all events live from anywhere in the world.' },
];

export default function Membership() {
  return (
    <div style={{ background: '#030D1A', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '50vh',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.1) 0%, transparent 60%), linear-gradient(180deg, #030D1A 0%, #06142E 100%)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingTop: 72, paddingBottom: 40, textAlign: 'center',
      }}>
        <Stars />
        <div style={{ position: 'relative', zIndex: 5, maxWidth: 700, padding: '0 24px' }}>
          <div className="section-badge">✦ DIVINE COMMUNITY ✦</div>
          <h1 style={{
            fontFamily: 'Cinzel Decorative, Cinzel, serif',
            fontSize: 'clamp(28px,6vw,60px)', fontWeight: 900, lineHeight: 1.1,
            color: '#fff', marginBottom: 16,
          }}>
            Become a <span className="gold-shimmer">Devotee</span>
          </h1>
          <div className="gold-divider" style={{ width: 100, marginBottom: 20 }} />
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.9, marginBottom: 32 }}>
            Join our divine family and experience the blessing of Shree Krishna's devotion with an exclusive membership.
          </p>
          <Link to="/become-a-member" className="btn-gold">🌸 Register Now</Link>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to top, #030D1A, transparent)', pointerEvents: 'none' }} />
      </section>

      {/* ── MEMBERSHIP TIERS ── */}
      <section style={{ padding: '80px 32px', background: '#06142E', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-badge">✦ CHOOSE YOUR PATH ✦</div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 700, color: '#fff' }}>
            Membership Plans
          </h2>
          <div className="gold-divider" style={{ width: 100, marginTop: 16 }} />
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {tiers.map((tier, i) => (
            <div key={i} style={{
              background: tier.color, border: `1px solid ${tier.border}`,
              borderRadius: 24, padding: '40px 32px', textAlign: 'center',
              position: 'relative', transition: 'all 0.4s ease', cursor: 'pointer',
              transform: tier.featured ? 'scale(1.04)' : 'none',
              boxShadow: tier.featured ? `0 0 60px rgba(255,215,0,0.15)` : 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = tier.featured ? 'scale(1.06)' : 'translateY(-8px)'; e.currentTarget.style.boxShadow = tier.type === 'diamond' ? '0 20px 60px rgba(185,242,255,0.15)' : '0 20px 60px rgba(212,175,55,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = tier.featured ? 'scale(1.04)' : 'none'; e.currentTarget.style.boxShadow = tier.featured ? '0 0 60px rgba(255,215,0,0.15)' : 'none'; }}>
              {tier.featured && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  padding: '4px 20px', background: 'linear-gradient(135deg, #9A7D0A, #FFD700)',
                  borderRadius: 20, fontSize: 10, fontWeight: 700, color: '#030D1A',
                  fontFamily: 'Poppins, sans-serif', letterSpacing: 2, whiteSpace: 'nowrap',
                }}>⭐ MOST POPULAR</div>
              )}

              <div style={{ fontSize: 52, marginBottom: 16 }}>{tier.icon}</div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 700, color: tier.textColor, marginBottom: 8 }}>{tier.name}</h3>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 24 }}>{tier.price}</div>

              <ul style={{ listStyle: 'none', marginBottom: 32, textAlign: 'left' }}>
                {tier.features.map((f, fi) => (
                  <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ color: tier.textColor, fontSize: 14 }}>✓</span>
                    <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.7)', fontFamily: 'Poppins, sans-serif' }}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link to="/become-a-member"
                className={tier.type === 'diamond' ? 'btn-diamond' : 'btn-gold'}
                style={{ display: 'block', textAlign: 'center' }}>
                {tier.type === 'diamond' ? '💎 ' : '🌸 '}Join as {tier.name.split(' ')[0]}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ padding: '80px 32px', background: '#030D1A' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-badge">✦ WHY JOIN ✦</div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(22px,3.5vw,38px)', fontWeight: 700, color: '#fff' }}>
            Member <span className="gold-shimmer">Benefits</span>
          </h2>
          <div className="gold-divider" style={{ width: 100, marginTop: 14 }} />
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {benefits.map((b, i) => (
            <div key={i} className={i % 2 === 1 ? 'glass-card-diamond' : 'glass-card'} style={{
              padding: '32px 24px', textAlign: 'center', transition: 'all 0.3s ease', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = i % 2 === 1 ? '0 20px 50px rgba(185,242,255,0.12)' : '0 20px 50px rgba(212,175,55,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>{b.icon}</div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 15, fontWeight: 700, color: i % 2 === 1 ? '#B9F2FF' : '#D4AF37', marginBottom: 10 }}>{b.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.8 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 32px', background: '#06142E', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16, animation: 'float 5s ease-in-out infinite' }}>🕉</div>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(22px,3.5vw,38px)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
          Ready to Begin Your <span className="gold-shimmer">Divine Journey?</span>
        </h2>
        <div className="gold-divider" style={{ width: 120, marginBottom: 28 }} />
        <Link to="/become-a-member" className="btn-gold" style={{ fontSize: 16, padding: '16px 40px' }}>
          🌸 Become a Member Today
        </Link>
      </section>
    </div>
  );
}

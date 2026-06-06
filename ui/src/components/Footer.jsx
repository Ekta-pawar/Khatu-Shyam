import { Link } from 'react-router-dom';

const links = [
  { path: '/', label: 'Home' },
  { path: '/janmashtami', label: 'Janmashtami' },
  { path: '/membership', label: 'Membership' },
  { path: '/masik-kirtan', label: 'Masik Kirtan' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #030D1A 0%, #020A14 100%)',
      borderTop: '1px solid rgba(212,175,55,0.12)',
      padding: '60px 32px 32px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg, #9A7D0A, #D4AF37, #FFD700)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, boxShadow: '0 0 20px rgba(212,175,55,0.4)',
              }}>🕉</div>
              <div>
                <div style={{ fontSize: 9, color: '#D4AF37', fontFamily: 'Noto Sans Devanagari, serif', letterSpacing: 1.5 }}>॥ श्री श्री ॥</div>
                <div style={{ fontSize: 12, color: '#fff', fontFamily: 'Cinzel, serif', fontWeight: 700 }}>Shree Krishna Mandal</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.9 }}>
              A divine community dedicated to celebrating Lord Krishna's teachings and fostering devotion since 2011.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontSize: 11, color: '#D4AF37', fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: 3, marginBottom: 20 }}>QUICK LINKS</div>
            {links.map(l => (
              <Link key={l.path} to={l.path} style={{
                display: 'block', color: 'rgba(255,255,255,0.45)',
                textDecoration: 'none', fontSize: 13.5,
                fontFamily: 'Poppins, sans-serif', marginBottom: 10,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#D4AF37'; e.currentTarget.style.paddingLeft = '4px'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.paddingLeft = '0'; }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 11, color: '#D4AF37', fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: 3, marginBottom: 20 }}>CONTACT</div>
            {[
              { icon: '📞', val: '+91 99 2133530' },
              { icon: '✉️', val: 'email.now@gmail.com' },
              { icon: '📍', val: 'Shree Krishna Mandal, India' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{c.icon}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}>{c.val}</span>
              </div>
            ))}
          </div>

          {/* Social */}
          <div>
            <div style={{ fontSize: 11, color: '#D4AF37', fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: 3, marginBottom: 20 }}>FOLLOW US</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { icon: '👥', color: '#1877F2' }, { icon: '📸', color: '#E1306C' },
                { icon: '▶️', color: '#FF0000' }, { icon: '📱', color: '#25D366' },
              ].map((s, i) => (
                <div key={i} style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: `${s.color}1A`, border: `1px solid ${s.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, cursor: 'pointer', transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${s.color}33`; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 20px ${s.color}44`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${s.color}1A`; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  {s.icon}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 11, color: '#D4AF37', fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>JOIN US</div>
              <Link to="/become-a-member" className="btn-gold" style={{ padding: '10px 20px', fontSize: 12 }}>
                🌸 Become a Member
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(212,175,55,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: 'Poppins, sans-serif' }}>
            © 2024 Shree Krishna Karyakarini Mandal. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: 'Poppins, sans-serif' }}>
            <span style={{ color: '#D4AF37' }}>✦</span> जय श्री कृष्ण <span style={{ color: '#D4AF37' }}>✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/',              label: 'Home' },
  { path: '/janmashtami',   label: 'Janmashtami' },
  { path: '/membership',    label: 'Devotees' },
  { path: '/masik-kirtan',  label: 'Kirtan' },
  { path: '/gallery',       label: 'Gallery' },
  { path: '/contact',       label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const active = (p) => location.pathname === p;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
      scrolled
        ? 'bg-black/90 backdrop-blur-2xl border-b border-yellow-600/20 shadow-lg'
        : 'bg-gradient-to-b from-slate-900/85 to-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-18">

        {/* ── Logo ── */}
        <Link to="/" className="no-underline flex items-center gap-2.5 sm:gap-3 min-w-0 shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-yellow-700 via-yellow-600 to-yellow-400 flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-lg shadow-yellow-600/50">
            🕉
          </div>
          <div className="min-w-0">
            <div className="text-[10px] sm:text-xs text-yellow-600 font-bold tracking-widest opacity-90 truncate">॥ खाटूश्याम ॥</div>
            <div className="text-xs sm:text-sm text-white font-bold tracking-wide">Khatushyam</div>
          </div>
        </Link>

        {/* ── Desktop Links ── */}
        <div className="hidden lg:flex gap-0 items-center">
          {navLinks.map(l => (
            <Link
              key={l.path}
              to={l.path}
              className={`no-underline text-sm font-poppins px-3 py-2 border-b-2 transition-all duration-200 ${
                active(l.path)
                  ? 'text-yellow-400 border-b-yellow-400 font-semibold'
                  : 'text-white/75 border-b-transparent hover:text-yellow-400'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* ── CTA + Hamburger ── */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            to="/become-a-member"
            className="hidden lg:inline-flex btn-gold px-4 xl:px-5 py-2 text-sm rounded-full no-underline"
          >
            Become a Member
          </Link>
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="lg:hidden bg-white/5 border border-yellow-600/30 rounded-lg cursor-pointer px-2.5 py-2 text-yellow-500 text-lg leading-none backdrop-blur transition-colors hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* ── Mobile / Tablet Menu ── */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-black/95 backdrop-blur-2xl border-t border-yellow-600/20 px-4 sm:px-6 py-4">
          {/* Links in a 2-col grid on tablets, 1-col on phones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 mb-4">
            {navLinks.map((l, i) => (
              <Link
                key={l.path}
                to={l.path}
                className={`block text-sm font-poppins px-2 py-3 no-underline transition-colors border-b border-yellow-600/10 ${
                  active(l.path) ? 'text-yellow-400 font-semibold' : 'text-white/80 hover:text-yellow-400'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            to="/become-a-member"
            className="btn-gold block mt-2 text-center rounded-full no-underline py-3 text-sm"
          >
            🌸 Become a Member
          </Link>
        </div>
      </div>
    </nav>
  );
}

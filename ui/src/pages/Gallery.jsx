import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThreeDBackground from '../components/ThreeDBackground';

const categories = ['All', 'Janmashtami', 'Kirtan', 'Community Events', 'Sponsors', 'Cultural Activities'];

const galleryItems = [
  { category: 'Janmashtami', icon: '🎆', label: 'Fireworks 2023', bg: 'linear-gradient(135deg, #1A0A2E, #3D1B6E)', size: 'large' },
  { category: 'Kirtan', icon: '🎵', label: 'Bhajan Night', bg: 'linear-gradient(135deg, #0A1A28, #1A4060)', size: 'medium' },
  { category: 'Community Events', icon: '🌸', label: 'Seva Program', bg: 'linear-gradient(135deg, #0A1A0A, #1A4015)', size: 'medium' },
  { category: 'Janmashtami', icon: '🏛', label: 'Temple Puja', bg: 'linear-gradient(135deg, #1A0A0A, #4A1515)', size: 'medium' },
  { category: 'Cultural Activities', icon: '💃', label: 'Cultural Dance', bg: 'linear-gradient(135deg, #1A0A2E, #4A2A6E)', size: 'medium' },
  { category: 'Sponsors', icon: '🏆', label: 'Award Ceremony', bg: 'linear-gradient(135deg, #1A1A0A, #4A4015)', size: 'medium' },
  { category: 'Kirtan', icon: '🎶', label: 'Devotional Music', bg: 'linear-gradient(135deg, #0F2D1A, #1A5C30)', size: 'medium' },
  { category: 'Community Events', icon: '🙏', label: 'Prayer Meet', bg: 'linear-gradient(135deg, #0A1628, #1A3080)', size: 'medium' },
  { category: 'Janmashtami', icon: '🎊', label: 'Celebration 2022', bg: 'linear-gradient(135deg, #2D1A0A, #6E3F1F)', size: 'medium' },
];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [featured, setFeatured] = useState(galleryItems[0]);
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'All' ? galleryItems : galleryItems.filter(g => g.category === active);

  return (
    <div className="bg-[#030D1A] overflow-x-hidden">

      {/* ── HERO with Three.js 3D Background ── */}
      <section
        className="min-h-[60vh] sm:min-h-[65vh] relative overflow-hidden flex items-center justify-center pt-20 sm:pt-24 pb-12 text-center"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 60%), linear-gradient(180deg, #030D1A 0%, #06142E 100%)' }}
      >
        {/* Three.js 3D scene fills the hero */}
        <ThreeDBackground />

        <div className="relative z-[5] max-w-[700px] px-4 sm:px-6">
          <div className="section-badge">✦ DIVINE MEMORIES ✦</div>
          <h1
            className="gold-shimmer font-black leading-tight mb-4 mt-2"
            style={{ fontFamily: 'Cinzel Decorative, Cinzel, serif', fontSize: 'clamp(28px,6vw,64px)' }}
          >
            Gallery
          </h1>
          <div className="gold-divider !w-[100px] mb-5" />
          <p className="text-sm sm:text-[15px] text-white/50 leading-relaxed sm:leading-[1.9] max-w-lg mx-auto">
            A visual journey through our divine celebrations, kirtan gatherings, and community moments.
          </p>
        </div>

        {/* Fade to page bg */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #030D1A, transparent)' }}
        />
      </section>

      {/* ── 3D FEATURED GALLERY ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 bg-[#030D1A] relative">
        <div className="max-w-[1100px] mx-auto">

          {/* Mobile: center card + side cards in a row below */}
          <div className="flex flex-col gap-5 md:hidden">
            {/* Center featured */}
            <div
              onClick={() => setLightbox(featured)}
              className="h-56 rounded-3xl border-2 border-[rgba(212,175,55,0.4)] flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 [box-shadow:0_0_60px_rgba(212,175,55,0.2),0_20px_60px_rgba(0,0,0,0.5)] active:scale-95"
              style={{ background: featured.bg }}
            >
              <div className="text-[52px]">{featured.icon}</div>
              <div className="px-5 py-2 bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] rounded-2xl text-sm text-[#FFD700] font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>
                {featured.label}
              </div>
              <div className="text-[11px] text-white/40">{featured.category}</div>
            </div>

            {/* Side cards in 2×2 on mobile */}
            <div className="grid grid-cols-2 gap-4">
              {[galleryItems[1], galleryItems[2], galleryItems[3], galleryItems[4]].map((item, i) => (
                <div
                  key={i}
                  onClick={() => setLightbox(item)}
                  className="h-28 rounded-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 border border-[rgba(212,175,55,0.25)] active:scale-95"
                  style={{ background: item.bg }}
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div className="text-[10px] text-white/60">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: 3-column perspective layout */}
          <div
            className="hidden md:grid md:grid-cols-[1fr_1.6fr_1fr] gap-5 items-center"
            style={{ perspective: '1200px' }}
          >
            {/* Left side cards */}
            <div className="flex flex-col gap-5">
              {[galleryItems[1], galleryItems[2]].map((item, i) => (
                <div
                  key={i}
                  onClick={() => setLightbox(item)}
                  className="h-40 rounded-2xl border border-[rgba(212,175,55,0.25)] flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 transform-[rotateY(8deg)_rotateX(-3deg)] [box-shadow:4px_8px_30px_rgba(0,0,0,0.4)] hover:transform-[rotateY(4deg)_rotateX(-1deg)_scale(1.04)] hover:[box-shadow:8px_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(212,175,55,0.15)]"
                  style={{ background: item.bg }}
                >
                  <div className="text-4xl">{item.icon}</div>
                  <div className="text-[11px] text-white/60">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Center featured */}
            <div
              onClick={() => setLightbox(featured)}
              className="h-90 rounded-3xl border-2 border-[rgba(212,175,55,0.4)] flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 z-2 [box-shadow:0_0_60px_rgba(212,175,55,0.2),0_20px_60px_rgba(0,0,0,0.5)] hover:scale-[1.03] hover:[box-shadow:0_0_100px_rgba(212,175,55,0.35),0_30px_80px_rgba(0,0,0,0.6)]"
              style={{ background: featured.bg }}
            >
              <div className="text-[64px]">{featured.icon}</div>
              <div
                className="px-5 py-2 bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] rounded-2xl text-sm text-[#FFD700] font-semibold"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                {featured.label}
              </div>
              <div className="text-[11px] text-white/40">{featured.category}</div>
            </div>

            {/* Right side cards */}
            <div className="flex flex-col gap-5">
              {[galleryItems[3], galleryItems[4]].map((item, i) => (
                <div
                  key={i}
                  onClick={() => setLightbox(item)}
                  className="h-40 rounded-2xl border border-[rgba(185,242,255,0.2)] flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 transform-[rotateY(-8deg)_rotateX(-3deg)] [box-shadow:-4px_8px_30px_rgba(0,0,0,0.4)] hover:transform-[rotateY(-4deg)_rotateX(-1deg)_scale(1.04)] hover:[box-shadow:-8px_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(185,242,255,0.1)]"
                  style={{ background: item.bg }}
                >
                  <div className="text-4xl">{item.icon}</div>
                  <div className="text-[11px] text-[rgba(185,242,255,0.6)]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTERS ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 bg-[#06142E]">
        <div className="text-center mb-6 sm:mb-8">
          <div className="section-badge">✦ BROWSE ✦</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
            Category Filters
          </h2>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 sm:gap-3 justify-center flex-wrap mb-8 sm:mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full cursor-pointer text-xs sm:text-[13px] font-medium border-0 transition-all duration-300 ${
                active === cat
                  ? 'bg-linear-to-br from-[#9A7D0A] via-[#D4AF37] to-[#FFD700] text-[#030D1A] [box-shadow:0_4px_20px_rgba(212,175,55,0.4)]'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((item, i) => (
            <div
              key={i}
              onClick={() => { setFeatured(item); setLightbox(item); }}
              className={`h-44 sm:h-50 rounded-2xl flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all duration-300 border hover:-translate-y-2 hover:scale-[1.02] ${
                i % 3 === 1
                  ? 'border-[rgba(185,242,255,0.2)] hover:border-[rgba(185,242,255,0.5)] hover:[box-shadow:0_20px_50px_rgba(185,242,255,0.15)]'
                  : 'border-[rgba(212,175,55,0.2)] hover:border-[rgba(212,175,55,0.5)] hover:[box-shadow:0_20px_50px_rgba(212,175,55,0.2)]'
              }`}
              style={{ background: item.bg }}
            >
              <div className="text-4xl">{item.icon}</div>
              <div className="text-center">
                <div className="text-[13px] text-white font-semibold mb-1" style={{ fontFamily: 'Cinzel, serif' }}>
                  {item.label}
                </div>
                <div className={`text-[10px] tracking-[1px] ${i % 3 === 1 ? 'text-[rgba(185,242,255,0.5)]' : 'text-[rgba(212,175,55,0.6)]'}`}>
                  {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 bg-black/[0.92] z-[9999] flex items-center justify-center px-4 backdrop-blur-xl"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full sm:w-[500px] h-80 sm:h-125 max-w-[90vw] max-h-[80vh] rounded-3xl border-2 border-[rgba(212,175,55,0.4)] flex flex-col items-center justify-center gap-4 [box-shadow:0_0_100px_rgba(212,175,55,0.3)] relative"
            style={{ background: lightbox.bg }}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 bg-white/10 border-0 rounded-full w-9 h-9 cursor-pointer text-white text-lg flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
            <div className="text-[60px] sm:text-[80px]">{lightbox.icon}</div>
            <div className="text-center px-6">
              <div className="text-lg sm:text-[22px] font-bold text-[#FFD700] mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                {lightbox.label}
              </div>
              <div className="text-[13px] text-white/50">{lightbox.category}</div>
            </div>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <section className="py-14 sm:py-17.5 px-4 sm:px-8 bg-[#030D1A] text-center">
        <h2 className="text-2xl sm:text-[28px] font-bold text-white mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
          Be Part of Our <span className="gold-shimmer">Story</span>
        </h2>
        <div className="gold-divider !w-[100px] mb-7" />
        <Link to="/become-a-member" className="btn-gold">🌸 Join the Community</Link>
      </section>
    </div>
  );
}

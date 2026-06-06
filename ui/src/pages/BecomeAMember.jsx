import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThreeDBackground from '../components/ThreeDBackground';

const STEPS = ['Personal', 'Family', 'Business', 'Payment'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center mb-8 gap-0 overflow-x-auto pb-1">
      {STEPS.map((s, i) => (
        <div key={i} className="flex items-center shrink-0">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i <= current
                ? 'bg-linear-to-br from-yellow-700 to-yellow-400 text-slate-900 shadow-lg shadow-yellow-600/50'
                : 'bg-white/10 text-white/40 border border-white/20'
            }`}>
              {i < current ? '✓' : i + 1}
            </div>
            <div className={`text-[10px] sm:text-xs tracking-wider whitespace-nowrap transition-colors ${
              i <= current ? 'text-yellow-500' : 'text-white/35'
            }`}>{s}</div>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 sm:w-14 h-0.5 mx-1 mb-5 shrink-0 transition-all ${
              i < current ? 'bg-linear-to-r from-yellow-600 to-yellow-400' : 'bg-white/10'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

const memberTiers = [
  { id: 'member',  icon: '👤', label: 'Member',        textColor: '#D4AF37' },
  { id: 'golden',  icon: '🏅', label: 'Golden Member',  textColor: '#FFD700' },
  { id: 'diamond', icon: '💎', label: 'Diamond Member', textColor: '#B9F2FF' },
];

function FieldLabel({ children }) {
  return (
    <label className="block text-[11px] text-white/50 font-semibold tracking-widest mb-2">
      {children}
    </label>
  );
}

export default function BecomeAMember() {
  const [step, setStep] = useState(0);
  const [selectedTier, setSelectedTier] = useState('member');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', address: '', mobile: '', birthday: '', anniversary: '',
    familyMembers: '', children: '',
    company: '', businessType: '', social: '',
    paymentMethod: 'upi',
  });

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const f = (key, val) => setForm(p => ({ ...p, [key]: val }));
  const currentTier = memberTiers.find(t => t.id === selectedTier);

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8 relative overflow-hidden">
        <ThreeDBackground />
        <div className="glass-card max-w-md w-full px-6 sm:px-10 py-12 sm:py-15 text-center relative z-10">
          <div className="text-6xl sm:text-7xl mb-5">🕉</div>
          <h2 className="gold-shimmer text-2xl sm:text-3xl mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
            Welcome to the Divine Family!
          </h2>
          <div className="gold-divider mb-5" />
          <p className="text-sm text-white/60 leading-relaxed mb-8">
            Jai Shri Krishna! Your membership registration is complete. Your digital membership card will be sent to your mobile number.
          </p>
          <div className="px-5 py-4 bg-yellow-600/5 border border-yellow-600/20 rounded-2xl mb-7">
            <div className="text-xs text-yellow-600 font-bold tracking-widest mb-2">MEMBERSHIP TYPE</div>
            <div className="text-base sm:text-lg text-white font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
              {currentTier?.icon} {currentTier?.label}
            </div>
          </div>
          <Link to="/" className="btn-gold inline-block w-full text-center no-underline">🏠 Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030D1A] flex items-start sm:items-center justify-center px-4 py-20 sm:py-24 relative overflow-hidden">
      {/* Three.js 3D background */}
      <ThreeDBackground />

      {/* Subtle Om watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none text-[200px] sm:text-[280px] select-none z-[1]">
        🕉
      </div>

      <div className="w-full max-w-2xl relative z-10">

        {/* Page title */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="section-badge">✦ JOIN THE FAMILY ✦</div>
          <h1
            className="gold-shimmer font-black mt-2 mb-1"
            style={{ fontFamily: 'Cinzel Decorative, Cinzel, serif', fontSize: 'clamp(22px,5vw,42px)' }}
          >
            Become a Member
          </h1>
          <div className="gold-divider" />
        </div>

        {/* Outer glass container */}
        <div className="bg-slate-900/70 backdrop-blur-2xl border border-yellow-600/15 rounded-2xl sm:rounded-3xl px-4 sm:px-8 lg:px-10 py-8 sm:py-10 shadow-2xl shadow-black/60">

          {/* MEMBERSHIP TIER SELECTOR */}
          <div className="mb-8 text-center">
            <label className="block text-[11px] text-white/50 font-semibold tracking-widest mb-4">
              CHOOSE YOUR MEMBERSHIP TYPE
            </label>
            <div className="flex gap-2 sm:gap-3 flex-wrap justify-center mb-4">
              {memberTiers.map(tier => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`flex-1 min-w-[100px] sm:min-w-[130px] px-3 sm:px-4 py-3 sm:py-4 rounded-2xl cursor-pointer flex items-center justify-center gap-2 transition-all border-2 ${
                    selectedTier === tier.id
                      ? 'bg-linear-to-br from-yellow-700 to-yellow-400 border-yellow-400 shadow-lg shadow-yellow-600/40 scale-105 text-slate-900'
                      : 'bg-white/5 border-white/20 text-white/60 hover:border-white/40'
                  }`}
                >
                  <span className="text-lg sm:text-xl">{tier.icon}</span>
                  <span className={`text-xs sm:text-sm font-bold tracking-wide ${selectedTier === tier.id ? 'text-slate-900' : 'text-white/60'}`}>
                    {tier.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected tier display */}
            <div className="px-4 py-3 rounded-xl bg-yellow-600/5 border border-yellow-600/20 flex items-center justify-center gap-3">
              <span className="text-2xl">{currentTier?.icon}</span>
              <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'Cinzel, serif', color: currentTier?.textColor }}>
                {currentTier?.label}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-yellow-600/30 to-transparent mb-6 sm:mb-8" />

          {/* Step indicator */}
          <StepIndicator current={step} />

          {/* Inner form card */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl sm:rounded-2xl px-4 sm:px-7 py-6 sm:py-8">

            {/* ── STEP 1: Personal ── */}
            {step === 0 && (
              <div>
                <h2 className="text-base sm:text-xl font-bold text-white mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
                  Step 1: Personal Information
                </h2>

                {/* Name + Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <FieldLabel>Full Name</FieldLabel>
                    <input className="input-glass" placeholder="Full Name" value={form.name} onChange={e => f('name', e.target.value)} />
                  </div>
                  <div>
                    <FieldLabel>Address</FieldLabel>
                    <input className="input-glass" placeholder="Your Address" value={form.address} onChange={e => f('address', e.target.value)} />
                  </div>
                </div>

                {/* Photo + fields row */}
                <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr_1fr_1fr] gap-4 mb-6 items-start">
                  {/* Photo upload */}
                  <div>
                    <FieldLabel>Photo</FieldLabel>
                    <label className="cursor-pointer block">
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                      <div className={`w-[100px] h-[110px] rounded-2xl border-2 border-dashed border-[rgba(212,175,55,0.3)] overflow-hidden flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:border-[#D4AF37] ${photoPreview ? '' : 'bg-[rgba(212,175,55,0.05)] hover:bg-[rgba(212,175,55,0.08)]'}`}>
                        {photoPreview ? (
                          <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <div className="text-3xl opacity-50">👤</div>
                            <div className="text-[9px] text-white/30 text-center leading-tight px-1">Tap to upload</div>
                          </>
                        )}
                      </div>
                    </label>
                  </div>

                  <div>
                    <FieldLabel>Mobile Number</FieldLabel>
                    <input className="input-glass" placeholder="+91" value={form.mobile} onChange={e => f('mobile', e.target.value)} />
                  </div>
                  <div>
                    <FieldLabel>Birthday</FieldLabel>
                    <input type="date" className="input-glass [color-scheme:dark]" value={form.birthday} onChange={e => f('birthday', e.target.value)} />
                  </div>
                  <div>
                    <FieldLabel>Anniversary</FieldLabel>
                    <input type="date" className="input-glass [color-scheme:dark]" value={form.anniversary} onChange={e => f('anniversary', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2: Family ── */}
            {step === 1 && (
              <div>
                <h2 className="text-base sm:text-xl font-bold text-white mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
                  Step 2: Family Information
                </h2>
                <div className="mb-5">
                  <FieldLabel>Family Members (names)</FieldLabel>
                  <textarea
                    className="input-glass"
                    rows={4}
                    placeholder="List family members and their relation (e.g., Sita Devi - Spouse, Ravi - Son)..."
                    value={form.familyMembers}
                    onChange={e => f('familyMembers', e.target.value)}
                  />
                </div>
                <div>
                  <FieldLabel>Children's Birthdays</FieldLabel>
                  <textarea
                    className="input-glass"
                    rows={3}
                    placeholder="List children's names and birthdays..."
                    value={form.children}
                    onChange={e => f('children', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* ── STEP 3: Business ── */}
            {step === 2 && (
              <div>
                <h2 className="text-base sm:text-xl font-bold text-white mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
                  Step 3: Business Information
                </h2>
                <div className="mb-5">
                  <FieldLabel>Company / Business Name</FieldLabel>
                  <input className="input-glass" placeholder="Company Name (optional)" value={form.company} onChange={e => f('company', e.target.value)} />
                </div>
                <div className="mb-5">
                  <FieldLabel>Business Type</FieldLabel>
                  <select className="input-glass cursor-pointer" value={form.businessType} onChange={e => f('businessType', e.target.value)}>
                    <option value="">Select Business Type</option>
                    <option>Retail / Shop</option>
                    <option>Manufacturing</option>
                    <option>Services</option>
                    <option>Agriculture</option>
                    <option>Education</option>
                    <option>Healthcare</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <FieldLabel>Social Media Links</FieldLabel>
                  <input className="input-glass" placeholder="Facebook, Instagram, or website URL..." value={form.social} onChange={e => f('social', e.target.value)} />
                </div>
              </div>
            )}

            {/* ── STEP 4: Payment ── */}
            {step === 3 && (
              <div>
                <h2 className="text-base sm:text-xl font-bold text-white mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
                  Step 4: Payment
                </h2>

                <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-yellow-600/5 border border-yellow-600/15 rounded-xl">
                  <div className="text-3xl">{currentTier?.icon}</div>
                  <div>
                    <div className="text-[10px] text-white/40 tracking-widest mb-0.5">SELECTED PLAN</div>
                    <div className="text-sm sm:text-base font-bold text-yellow-400" style={{ fontFamily: 'Cinzel, serif' }}>
                      {currentTier?.label}
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <FieldLabel>Payment Method</FieldLabel>
                  <div className="flex gap-2 sm:gap-3">
                    {[
                      { id: 'upi',  icon: '📲', label: 'UPI' },
                      { id: 'card', icon: '💳', label: 'CARD' },
                      { id: 'qr',   icon: '📱', label: 'QR' },
                    ].map(m => (
                      <button
                        key={m.id}
                        onClick={() => f('paymentMethod', m.id)}
                        className={`flex-1 py-3 px-2 rounded-xl cursor-pointer flex flex-col items-center gap-1.5 transition-all border-2 ${
                          form.paymentMethod === m.id
                            ? 'bg-yellow-600/20 border-yellow-600 text-yellow-400'
                            : 'bg-white/5 border-white/10 text-white/50'
                        }`}
                      >
                        <span className="text-xl sm:text-2xl">{m.icon}</span>
                        <span className="text-[10px] sm:text-xs font-bold tracking-wider">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {form.paymentMethod === 'upi' && (
                  <div className="glass-card px-4 sm:px-6 py-4 sm:py-5 mb-5">
                    <div className="text-xs text-yellow-600 font-bold tracking-wider mb-2.5">UPI ID</div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input className="input-glass flex-1" placeholder="yourname@upi" />
                      <button className="btn-gold px-4 sm:px-5 py-3 text-xs font-bold whitespace-nowrap border-none cursor-pointer shrink-0">
                        Verify
                      </button>
                    </div>
                  </div>
                )}

                {form.paymentMethod === 'qr' && (
                  <div className="glass-card px-4 sm:px-6 py-4 sm:py-5 mb-5 text-center">
                    <div className="text-xs text-cyan-300 font-bold tracking-wider mb-4">SCAN QR CODE</div>
                    <div className="w-36 h-36 sm:w-40 sm:h-40 mx-auto rounded-2xl bg-linear-to-br from-yellow-600/10 to-cyan-500/10 border border-yellow-600/30 flex items-center justify-center text-7xl sm:text-8xl">
                      📲
                    </div>
                    <div className="text-xs text-white/40 mt-3">Scan with any UPI app</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-6 sm:mt-7 gap-3">
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)} className="btn-glass border-none cursor-pointer text-sm sm:text-base">
                ← Back
              </button>
            ) : <div />}

            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} className="btn-gold border-none cursor-pointer flex items-center gap-2 text-sm sm:text-base">
                Next <span>🙏</span>
              </button>
            ) : (
              <button onClick={() => setSubmitted(true)} className="btn-gold border-none cursor-pointer px-6 sm:px-9 py-3 sm:py-3.5 text-sm sm:text-base font-bold">
                🌸 Complete Registration
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

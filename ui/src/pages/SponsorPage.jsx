import { useState } from "react";
import { PageShell, PageHeader } from "../components/PageShell";
import { toast } from "react-toastify";
import {
  Check,
  Star,
  Crown,
  Heart,
  Building2,
  Phone,
  Mail,
  User,
  MapPin,
  MessageSquare,
  IndianRupee,
  Upload,
  X,
  Send,
} from "lucide-react";
import { createEnquiry, createSponsor } from "../api/sponsor";

// ─── Static data ─────────────────────────────────────────────────────────────

const sponsorTiers = [
  {
    name: "Prasad Sponsor",
    amount: "₹5,100",
    period: "per event",
    description: "प्रसाद वितरण एवं छोटे कार्यक्रमों का प्रायोजन",
    perks: [
      "Name in event banner",
      "Certificate of appreciation",
      "Prasad distribution credit",
      "Samiti newsletter mention",
    ],
    button: "Become a Prasad Sponsor",
    color: "from-orange-400 to-amber-500",
  },
  {
    name: "Bhandara Sponsor",
    amount: "₹11,000",
    period: "per event",
    description: "भंडारे एवं अन्नदान कार्यक्रम का प्रायोजन",
    featured: true,
    perks: [
      "All Prasad benefits",
      "Prime banner placement",
      "Stage acknowledgement",
      "Social media feature post",
      "Samiti directory listing",
    ],
    button: "Become a Bhandara Sponsor",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    name: "Mahotsav Sponsor",
    amount: "₹51,000",
    period: "per year",
    description: "वार्षिक महोत्सव एवं निशान यात्रा का प्रायोजन",
    perks: [
      "All Bhandara benefits",
      "Title sponsorship rights",
      "Dedicated stage hoarding",
      "VIP event seating",
      "Annual report feature",
      "Website logo placement",
    ],
    button: "Become a Mahotsav Sponsor",
    color: "from-maroon to-maroon/80",
  },
  {
    name: "Mandir Patron",
    amount: "₹1,11,000+",
    period: "lifetime",
    description: "श्री श्याम बाबा मंदिर निर्माण में योगदान",
    perks: [
      "All Mahotsav benefits",
      "Name engraved at Mandir",
      "Lifetime patron recognition",
      "Inaugural ceremony invite",
      "Trustee voting rights",
      "Dedicated puja seva slot",
    ],
    button: "Become a Mandir Patron",
    color: "from-purple-700 to-purple-900",
  },
];

const SPONSOR_TYPES = [
  "Individual",
  "Business / Corporate",
  "Trust / NGO",
  "Other",
];

// ─── Initial state helpers ────────────────────────────────────────────────────

const initialSponsorData = {
  sponsorName: "",
  sponsorType: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  sponsorTier: "",
  eventType: "",
  customAmount: "",
  message: "",
  gstin: "",
  website: "",
  panCard: "",
};

const initialEnquiryData = {
  contactPerson: "",
  organisationName: "",
  phone: "",
  email: "",
  amount: "",
  address: "",
  message: "",
};

// ─── Page component ───────────────────────────────────────────────────────────

function SponsorPage() {
  const [submitted, setSubmitted] = useState(false);
  const [showSponsorForm, setShowSponsorForm] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  // ✅ Separate state for sponsor form
  const [formData, setFormData] = useState(initialSponsorData);

  // ✅ Separate state for enquiry form
  const [enquiryData, setEnquiryData] = useState(initialEnquiryData);

  // ── Generic change handler for sponsor form ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Generic change handler for enquiry form
  const handleEnquiryChange = (e) => {
    const { name, value } = e.target;
    setEnquiryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoFile(file);
  };

  // ✅ Enquiry submit — uses enquiryData state, not formData
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      await createEnquiry(enquiryData);
      toast.success("Enquiry submitted successfully");
      setEnquiryData(initialEnquiryData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit enquiry");
    }
  };

  // ✅ Sponsor submit — uses formData + logoFile
  const handleSponsorSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (logoFile) data.append("logo", logoFile);
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      await createSponsor(data);
      toast.success("Sponsor request submitted successfully");
      setSubmitted(true);
      setFormData(initialSponsorData);
      setLogoFile(null);
      setTimeout(() => setSubmitted(false), 6000);
    } catch (error) {
      console.error(error);
      toast.error("Please fill all required fields");
    }
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Sahyog"
        title="Sponsor Us"
        subtitle="आपका सहयोग श्याम सेवा को और आगे ले जाएगा — बनें हमारे प्रायोजक"
      />

      {/* ── Sponsor Tiers ── */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs uppercase tracking-widest text-saffron">प्रायोजन स्तर</p>
          <h2 className="font-display text-4xl text-maroon">Sponsorship Tiers</h2>
          <div className="mx-auto mt-4 h-px w-24 bg-linear-to-r from-transparent via-yellow-500 to-transparent" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {sponsorTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-6 shadow-lg transition-transform hover:scale-[1.02] ${
                tier.featured
                  ? `bg-linear-to-br ${tier.color} text-white`
                  : "border bg-white"
              }`}
            >
              {tier.featured && (
                <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs">
                  <Crown size={12} />
                  Most Popular
                </div>
              )}
              <div
                className={`mb-1 flex h-10 w-10 items-center justify-center rounded-xl ${
                  tier.featured ? "bg-white/20" : `bg-linear-to-br ${tier.color}`
                }`}
              >
                <Star size={18} className="text-white" />
              </div>
              <h3
                className={`mt-3 text-lg font-bold ${
                  tier.featured ? "text-white" : "text-gray-800"
                }`}
              >
                {tier.name}
              </h3>
              <p
                className={`mt-1 font-display text-3xl font-bold ${
                  tier.featured ? "text-white" : "text-maroon"
                }`}
              >
                {tier.amount}
              </p>
              <p className={`text-xs ${tier.featured ? "text-white/70" : "text-gray-400"}`}>
                {tier.period}
              </p>
              <p
                className={`mt-3 text-xs leading-relaxed ${
                  tier.featured ? "text-white/80" : "text-gray-500"
                }`}
              >
                {tier.description}
              </p>
              <ul className="mt-4 space-y-2">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <Check
                      size={14}
                      className={`mt-0.5 shrink-0 ${
                        tier.featured ? "text-white" : "text-yellow-600"
                      }`}
                    />
                    <span
                      className={`text-xs leading-relaxed ${
                        tier.featured ? "text-white/90" : "text-gray-600"
                      }`}
                    >
                      {perk}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setShowSponsorForm(true)}
                className={`mt-6 w-full rounded-2xl py-3 px-4 font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  tier.featured
                    ? "bg-white text-maroon hover:bg-gray-100"
                    : `bg-linear-to-r ${tier.color} text-white`
                }`}
              >
                {tier.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sponsor Form Modal ── */}
      {showSponsorForm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm ">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">

            {/* Header */}
            <div className="bg-linear-to-r from-orange-500 to-yellow-500 px-4 py-6 text-white">
              <button
                onClick={() => setShowSponsorForm(false)}
                className="absolute right-5 top-5 flex h-10 w-12 items-center justify-center rounded-full bg-white/20"
              >
                <X size={20} />
              </button>
              <h2 className="text-4xl font-bold">Become a Sponsor</h2>
              <p className="mt-2 text-sm text-white/90">
                Complete the form below to submit your sponsorship request.
              </p>
            </div>

            {/* Scrollable form body */}
            <div className="max-h-[75vh] overflow-y-auto p-6 scrollbar-hide">
              <section className="mx-auto max-w-4xl px-5 pb-24">
                <div className="rounded-3xl bg-white p-8 shadow-xl md:p-12">
                  <div className="mb-8 border-b pb-6">
                    <h2 className="font-display text-3xl text-maroon">Sponsor Application</h2>
                    <p className="mt-2 text-sm text-gray-500">
                      नीचे दिया गया फॉर्म भरें। हमारी टीम 24–48 घंटों में आपसे संपर्क करेगी।
                    </p>
                  </div>

                  {submitted && (
                    <div className="mb-8 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                      <Check size={20} className="text-green-500" />
                      <span className="font-medium">
                        जय श्री श्याम! आपका प्रायोजन अनुरोध प्राप्त हो गया। हम शीघ्र संपर्क करेंगे।
                      </span>
                    </div>
                  )}

                  <form onSubmit={handleSponsorSubmit} className="space-y-8">
                    {/* Sponsor Identity */}
                    <SectionCard icon={<Building2 size={20} />} title="Sponsor Details">
                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="md:col-span-2">
                          <Label required>Sponsor / Organization Name</Label>
                          <input
                            name="sponsorName"
                            value={formData.sponsorName}
                            onChange={handleChange}
                            required
                            placeholder="Your name or organization name"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <Label required>Sponsor Type</Label>
                          <select
                            name="sponsorType"
                            value={formData.sponsorType}
                            onChange={handleChange}
                            required
                            className={inputCls}
                          >
                            <option value="">Select type</option>
                            {SPONSOR_TYPES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label required>Contact Person Name</Label>
                          <input
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            required
                            placeholder="Name of contact person"
                            className={inputCls}
                          />
                        </div>

                        {/* Logo Upload */}
                        <div className="md:col-span-2">
                          <Label>Logo / Profile Image</Label>
                          <div className="mt-2 flex items-center gap-4">
                            {logoFile ? (
                              <div className="relative h-20 w-20 overflow-hidden rounded-xl border">
                                <img
                                  src={URL.createObjectURL(logoFile)}
                                  alt="Logo"
                                  className="h-full w-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => setLogoFile(null)}
                                  className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ) : (
                              <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
                                <Building2 size={24} className="text-gray-400" />
                              </div>
                            )}
                            <label className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
                              <Upload size={16} />
                              Upload Logo
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleLogoUpload}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </SectionCard>

                    {/* Contact Info */}
                    <SectionCard icon={<Phone size={20} />} title="Contact Information">
                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <Label required>Mobile Number</Label>
                          <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+91 00000 00000"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <Label>Email Address</Label>
                          <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <Label>Website</Label>
                          <input
                            name="website"
                            type="url"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://yourwebsite.com"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <Label>City</Label>
                          <input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <Label>State</Label>
                          <input
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                            className={inputCls}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Address</Label>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="2"
                            placeholder="Full address"
                            className={`${inputCls} resize-none`}
                          />
                        </div>
                      </div>
                    </SectionCard>

                    {/* Message */}
                    <SectionCard icon={<User size={20} />} title="Your Message">
                      <div>
                        <Label>Your Message</Label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="4"
                          placeholder="कोई विशेष संदेश या सेवा अनुरोध..."
                          className={`${inputCls} resize-none`}
                        />
                      </div>
                    </SectionCard>

                    {/* Submit */}
                    <div className="border-t pt-8">
                      <button
                        type="submit"
                        className="w-full rounded-full bg-linear-to-r from-yellow-400 to-yellow-600 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-yellow-500 hover:to-yellow-700"
                      >
                        Submit Sponsorship Request
                      </button>
                      <p className="mt-4 text-center text-xs text-gray-400">
                        जय श्री श्याम। आपका सहयोग श्याम सेवा को आगे बढ़ाएगा।
                      </p>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : (
        /* ── Enquiry Form ── */
        <section>
          <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-slate-800">
              <Send size={20} className="text-yellow-600" />
              Enquiry Form
            </h2>

            <form onSubmit={handleEnquirySubmit} className="space-y-4">

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Contact Person <span className="text-yellow-600">*</span>
                  </label>
                  <div className="flex items-center rounded-xl border px-3 py-2.5">
                    <User size={16} className="mr-2 text-gray-400" />
                    <input
                      type="text"
                      name="contactPerson"
                      value={enquiryData.contactPerson}
                      onChange={handleEnquiryChange}
                      required
                      className="w-full text-sm outline-none"
                      placeholder="Enter name"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Organisation <span className="text-yellow-600">*</span>
                  </label>
                  <div className="flex items-center rounded-xl border px-3 py-2.5">
                    <Building2 size={16} className="mr-2 text-gray-400" />
                    <input
                      type="text"
                      name="organisationName"
                      value={enquiryData.organisationName}
                      onChange={handleEnquiryChange}
                      required
                      className="w-full text-sm outline-none"
                      placeholder="Organisation name"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Phone <span className="text-yellow-600">*</span>
                  </label>
                  <div className="flex items-center rounded-xl border px-3 py-2.5">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={enquiryData.phone}
                      onChange={handleEnquiryChange}
                      required
                      className="w-full text-sm outline-none"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email <span className="text-yellow-600">*</span>
                  </label>
                  <div className="flex items-center rounded-xl border px-3 py-2.5">
                    <Mail size={16} className="mr-2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={enquiryData.email}
                      onChange={handleEnquiryChange}
                      required
                      className="w-full text-sm outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Sponsor Amount <span className="text-yellow-600">*</span>
                </label>
                <div className="flex items-center rounded-xl border px-3 py-2.5">
                  <IndianRupee size={16} className="mr-2 text-gray-400" />
                  <input
                    type="number"
                    name="amount"
                    value={enquiryData.amount}
                    onChange={handleEnquiryChange}
                    required
                    className="w-full text-sm outline-none"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Address <span className="text-yellow-600">*</span>
                </label>
                <div className="flex rounded-xl border px-3 py-2.5">
                  <MapPin size={16} className="mr-2 mt-0.5 text-gray-400" />
                  <textarea
                    rows={2}
                    name="address"
                    value={enquiryData.address}
                    onChange={handleEnquiryChange}
                    required
                    className="w-full resize-none text-sm outline-none"
                    placeholder="Enter address"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Message</label>
                <div className="flex rounded-xl border px-3 py-2.5">
                  <MessageSquare size={16} className="mr-2 mt-0.5 text-gray-400" />
                  <textarea
                    rows={2}
                    name="message"
                    value={enquiryData.message}
                    onChange={handleEnquiryChange}
                    className="w-full resize-none text-sm outline-none"
                    placeholder="Write your message"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-yellow-400 to-yellow-600 py-3 text-sm font-semibold text-white"
              >
                <Send size={16} />
                Submit Enquiry
              </button>
            </form>
          </div>
        </section>
      )}

      {/* ── Why Sponsor ── */}
      <section className="border-t border-border/60 bg-linear-to-b from-yellow-50 to-white py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs uppercase tracking-widest text-saffron">क्यों सहयोग करें</p>
            <h2 className="font-display text-4xl text-maroon">Why Sponsor?</h2>
            <div className="mx-auto mt-4 h-px w-24 bg-linear-to-r from-transparent via-yellow-500 to-transparent" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Punya Labh",
                desc: "श्याम सेवा में सहयोग देने से अपार पुण्य की प्राप्ति होती है।",
              },
              {
                icon: Star,
                title: "Brand Visibility",
                desc: "हजारों भक्तों के बीच अपने ब्रांड एवं व्यवसाय की पहचान बनाएं।",
              },
              {
                icon: Crown,
                title: "Community Legacy",
                desc: "अपने परिवार का नाम समिति के इतिहास में सदा के लिए अंकित कराएं।",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border bg-white p-6 shadow-sm text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <Icon size={22} className="text-yellow-600" />
                </div>
                <h3 className="font-display text-xl text-maroon">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Star size={28} className="mx-auto mb-4 text-yellow-500" />
            <p className="font-display text-2xl text-maroon">॥ जय श्री श्याम ॥</p>
            <p className="mt-2 text-sm text-muted-foreground">
              For queries: <Mail size={12} className="inline" /> seva@shyamsabhasamiti.org &nbsp;|&nbsp;
              <Phone size={12} className="inline" /> +91 98290 00000
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

const inputCls =
  "mt-2 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 transition-colors";

function SectionCard({ icon, title, children }) {
  return (
    <div className="rounded-2xl border bg-gray-50/50 p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="text-maroon">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Label({ children, required }) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default SponsorPage;
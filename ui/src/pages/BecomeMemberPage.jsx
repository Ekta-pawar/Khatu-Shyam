

import React, { useState } from "react";
import { PageShell, PageHeader } from "../components/PageShell";
import {
  Check, Crown, Plus, X, Upload, User, Building2,
  Camera, CalendarHeart, Users, Briefcase, Gift,
  Calendar, ChevronDown, ChevronUp,
} from "lucide-react";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const tiers = [
  {
    name: "Diamond Members",
    price: "₹11,00,000 / year",
    buttonText: "Become Diamond Member",
    perks: [
      "Member ID & welcome kit",
      "Event invitations",
      "Monthly bhajan satsang",
    ],
  },
  {
    name: "Golden Members",
    price: "₹5,00,000 / year",
    buttonText: "Become Golden Member",
    featured: true,
    perks: [
      "All Diamond benefits",
      "Reserved seating at sandhyas",
      "Family listing in directory",
      "Yatra priority booking",
    ],
  },
  {
    name: "Karyakarani Members",
    price: "₹3,00,000 / Year",
    buttonText: "Become Karyakarani Member",
    perks: [
      "All Golden benefits",
      "Patron recognition",
      "Bhandara sponsorship credit",
      "Trustee voting rights",
    ],
  },
  {
  name: "Even Member",
  price: "₹51,000 / Year",
  buttonText: "Become Even Member",
  perks: [
    "Member ID & welcome kit",
    "Event invitations",
    "Monthly satsang participation",
    "Community networking access",
  ],
},
{
  name: "Prernasrot",
  price: "₹21,000 / Year",
  buttonText: "Join Prernasrot",
  perks: [
    "Special recognition certificate",
    "Priority event registration",
    "Bhajan & spiritual workshops",
    "Community service participation",
  ],
},
{
  name: "Shrakshak",
  price: "₹16,000-51,000 / Year",
  buttonText: "Become Shrakshak",
  perks: [
    "Member ID card",
    "Regular event updates",
    "Access to satsang gatherings",
    "Volunteer opportunities",
  ],
},
{
  name: "Samiti Pillar",
  price: "By Invitation",
  buttonText: "Become Samiti Pillar",
  perks: [
    "Featured on home page",
    "Lifetime patron recognition",
    "VIP event seating",
    "Samiti leadership acknowledgement",
  ],
},
];

const GENDERS         = ["Male", "Female", "Other"];
const BLOOD_GROUPS    = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const JOB_TYPES       = ["Private Job", "Government Job", "Other"];
const FAMILY_RELATIONS = ["Son", "Daughter", "Father", "Mother", "Brother", "Sister", "Husband", "Wife", "Grandfather", "Grandmother", "Uncle", "Aunt", "Cousin", "Nephew", "Niece", "Other"];

// ─── EMPTY TEMPLATES ─────────────────────────────────────────────────────────

const emptyFamilyMember  = { name: "", relation: "", dob: "", age: "", occupation: "", phone: "" };
const emptyAnniversary   = { husbandName: "", wifeName: "", anniversaryDate: "", note: "" };
const emptyCustomDate    = { title: "", date: "", description: "" };

// ─── HELPER: compute age from dob ────────────────────────────────────────────

function calcAge(dob) {
  if (!dob) return "";
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age >= 0 ? String(age) : "";
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

function BecomeMemberPage() {
  const [submitted,    setSubmitted]    = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "", fatherName: "", gender: "", phone: "", email: "",
    birthday: "", occupation: "", bloodGroup: "", profileImage: null,
    address: "", city: "", state: "", country: "India", pincode: "",
    hasBusiness: false, hasJob: false,
    jobDetails: { jobType: "", companyName: "", designation: "", jobLocation: "", salary: "", experience: "" },
    businessDetails: { businessName: "", businessType: "", businessAddress: "", businessPhone: "", businessEmail: "", businessWebsite: "", businessDescription: "", businessImages: [] },
    tier: "",
    familyMembers: [],
    anniversaries: [],
    customDates: [],
  });

  // ─── generic helpers ───────────────────────────────────────────────────────

  const set = (key, val) => setFormData(f => ({ ...f, [key]: val }));

  const handleInput = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleJobInput = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, jobDetails: { ...f.jobDetails, [name]: value } }));
  };

  const handleBizInput = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, businessDetails: { ...f.businessDetails, [name]: value } }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) set(field, file);
  };

  const handleBizImages = e => {
    const files = Array.from(e.target.files);
    const cur = formData.businessDetails.businessImages;
    if (cur.length + files.length > 5) { alert("Maximum 5 images allowed"); return; }
    setFormData(f => ({ ...f, businessDetails: { ...f.businessDetails, businessImages: [...cur, ...files] } }));
  };

  const removeBizImage = idx => {
    const imgs = formData.businessDetails.businessImages.filter((_, i) => i !== idx);
    setFormData(f => ({ ...f, businessDetails: { ...f.businessDetails, businessImages: imgs } }));
  };

  // ─── FAMILY MEMBERS ────────────────────────────────────────────────────────

  const addFamilyMember = () =>
    setFormData(f => ({ ...f, familyMembers: [...f.familyMembers, { ...emptyFamilyMember }] }));

  const updateFamilyMember = (idx, field, value) =>
    setFormData(f => {
      const list = [...f.familyMembers];
      list[idx] = { ...list[idx], [field]: value };
      return { ...f, familyMembers: list };
    });

  // dob → age sync: typing dob auto-computes age; typing age directly keeps dob unchanged
  const handleFamilyDobChange = (idx, dob) => {
    const age = calcAge(dob);
    setFormData(f => {
      const list = [...f.familyMembers];
      list[idx] = { ...list[idx], dob, age };
      return { ...f, familyMembers: list };
    });
  };

  const removeFamilyMember = idx =>
    setFormData(f => ({ ...f, familyMembers: f.familyMembers.filter((_, i) => i !== idx) }));

  // ─── ANNIVERSARIES ─────────────────────────────────────────────────────────

  const addAnniversary = () =>
    setFormData(f => ({ ...f, anniversaries: [...f.anniversaries, { ...emptyAnniversary }] }));

  const updateAnniversary = (idx, field, value) =>
    setFormData(f => {
      const list = [...f.anniversaries];
      list[idx] = { ...list[idx], [field]: value };
      return { ...f, anniversaries: list };
    });

  const removeAnniversary = idx =>
    setFormData(f => ({ ...f, anniversaries: f.anniversaries.filter((_, i) => i !== idx) }));

  // ─── CUSTOM DATES ──────────────────────────────────────────────────────────

  const addCustomDate = () =>
    setFormData(f => ({ ...f, customDates: [...f.customDates, { ...emptyCustomDate }] }));

  const updateCustomDate = (idx, field, value) =>
    setFormData(f => {
      const list = [...f.customDates];
      list[idx] = { ...list[idx], [field]: value };
      return { ...f, customDates: list };
    });

  const removeCustomDate = idx =>
    setFormData(f => ({ ...f, customDates: f.customDates.filter((_, i) => i !== idx) }));

  // ─── SUBMIT ────────────────────────────────────────────────────────────────
  // New members are no longer created directly from the public site — this
  // submits a membership application as an Enquiry for an admin to review and
  // create the real member record from. The Enquiry schema only has a handful
  // of simple fields, so everything beyond contact info is folded into a
  // readable summary in `message` so admins have full context.

  const buildApplicationSummary = () => {
    const lines = [`Membership application — ${selectedTier}`, ""];

    lines.push(`Father's name: ${formData.fatherName || "-"}`);
    lines.push(`Gender: ${formData.gender || "-"}`);
    lines.push(`Birthday: ${formData.birthday || "-"}`);
    lines.push(`Occupation: ${formData.occupation || "-"}`);
    lines.push(`Blood group: ${formData.bloodGroup || "-"}`);
    lines.push(`Location: ${[formData.city, formData.state, formData.country, formData.pincode].filter(Boolean).join(", ") || "-"}`);

    if (formData.hasJob) {
      const j = formData.jobDetails;
      lines.push("", "Job details:");
      lines.push(`  Type: ${j.jobType || "-"}`);
      if (j.companyName) lines.push(`  Company/Org: ${j.companyName}`);
      if (j.governmentDepartment) lines.push(`  Department: ${j.governmentDepartment}`);
      if (j.designation) lines.push(`  Designation: ${j.designation}`);
      if (j.jobLocation) lines.push(`  Location: ${j.jobLocation}`);
      if (j.officeAddress) lines.push(`  Office address: ${j.officeAddress}`);
      if (j.otherDetails) lines.push(`  Details: ${j.otherDetails}`);
    }

    if (formData.hasBusiness) {
      const b = formData.businessDetails;
      lines.push("", "Business details:");
      if (b.businessName) lines.push(`  Name: ${b.businessName}`);
      if (b.businessType) lines.push(`  Type: ${b.businessType}`);
      if (b.businessPhone) lines.push(`  Phone: ${b.businessPhone}`);
      if (b.businessEmail) lines.push(`  Email: ${b.businessEmail}`);
      if (b.businessWebsite) lines.push(`  Website: ${b.businessWebsite}`);
      if (b.businessAddress) lines.push(`  Address: ${b.businessAddress}`);
      if (b.businessDescription) lines.push(`  Description: ${b.businessDescription}`);
    }

    if (formData.familyMembers.length) {
      lines.push("", "Family members:");
      formData.familyMembers.forEach((m) => {
        lines.push(`  - ${m.name} (${m.relation}), age ${m.age || "-"}, ${m.occupation || "-"}, ${m.phone || "-"}`);
      });
    }

    if (formData.anniversaries.length) {
      lines.push("", "Anniversaries:");
      formData.anniversaries.forEach((a) => {
        lines.push(`  - ${a.husbandName} & ${a.wifeName} — ${a.anniversaryDate}${a.note ? ` (${a.note})` : ""}`);
      });
    }

    if (formData.customDates.length) {
      lines.push("", "Other special dates:");
      formData.customDates.forEach((d) => {
        lines.push(`  - ${d.title} — ${d.date}${d.description ? ` (${d.description})` : ""}`);
      });
    }

    lines.push("", "Note: profile/business photos were not attached — collect these during verification.");

    return lines.join("\n");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        contactPerson: formData.fullName,
        organisationName: `${selectedTier} Membership Application`,
        phone: formData.phone,
        email: formData.email,
        amount: 0,
        address: formData.address || "-",
        message: buildApplicationSummary(),
      };

      const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
      const response = await fetch(`${API_BASE}/enquiry/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        alert("Application received! Our team will review it and contact you soon.");
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleTierSelect = name => {
    setSelectedTier(name);
    setFormData(f => ({ ...f, tier: name }));
    // scroll to form smoothly
    setTimeout(() => {
      document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────

  return (
    <PageShell>
      <PageHeader
        eyebrow="सदस्यता"
        title="Become a Member"
        subtitle="Choose a membership tier and join our growing devotional family."
      />

      {/* ── Membership Tiers ── */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        {/*
          All three cards sit in the SAME grid row.
          The featured "Golden" card is taller because of the crown banner,
          so we use items-stretch to make all cards fill equal height and put
          the button at the very bottom with mt-auto.
        */}
        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {tiers.map(tier => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-3xl p-8 shadow-lg transition-all duration-300 ${
                tier.featured
                  ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-yellow-200"
                  : "border bg-white shadow-gray-200"
              }`}
            >
              {/* "Most Popular" banner — only for featured; non-featured get an invisible spacer so buttons align */}
              {tier.featured ? (
                <div className="mb-3 inline-flex items-center gap-2 self-start rounded-full bg-white/20 px-3 py-1 text-sm">
                  <Crown size={16} /> Most Popular
                </div>
              ) : (
                /* invisible spacer to keep name / price vertically aligned across cards */
                <div className="mb-3 h-[28px]" aria-hidden />
              )}

              <h3 className={`text-2xl font-bold ${tier.featured ? "text-white" : "text-gray-800"}`}>
                {tier.name}
              </h3>
              <p className={`mt-2 text-3xl font-bold ${tier.featured ? "text-white" : "text-maroon"}`}>
                {tier.price}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.perks.map(perk => (
                  <li key={perk} className="flex items-start gap-2">
                    <Check size={16} className="mt-1 flex-shrink-0" />
                    <span className="text-sm">{perk}</span>
                  </li>
                ))}
              </ul>

              {/* mt-auto pushes button to the bottom regardless of perk count */}
              <button
                onClick={() => handleTierSelect(tier.name)}
                className={`mt-8 w-full rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                  selectedTier === tier.name
                    ? tier.featured
                      ? "bg-white/90 text-yellow-700 ring-2 ring-white"
                      : "bg-maroon text-white ring-2 ring-maroon/40"
                    : tier.featured
                    ? "bg-white text-yellow-600 hover:bg-gray-100"
                    : "bg-maroon text-white hover:bg-red-800"
                }`}
              >
                {selectedTier === tier.name ? "✓ Selected" : tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Application Form ── */}
      {selectedTier && (
        <section id="application-form" className="mx-auto max-w-4xl px-5 pb-24">
          <div className="rounded-3xl bg-white p-8 shadow-xl md:p-12">
            <div className="mb-8 border-b pb-6">
              <h2 className="text-3xl font-bold text-maroon">
                Membership Application — {selectedTier}
              </h2>
              <p className="mt-2 text-gray-500">
                Fill out the form below. Fields marked <span className="text-red-500">*</span> are mandatory.
              </p>
            </div>

            {submitted && (
              <div className="mb-8 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                <Check size={20} className="text-green-500" />
                <span className="font-medium">Jai Shree Shyam! Your application has been received. We will contact you soon.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">

              {/* ── Personal Information ── */}
              <SectionCard icon={<User size={20} />} title="Personal Information">
                <div className="grid gap-5 md:grid-cols-2">
                  {/* Profile photo */}
                  <div className="md:col-span-2">
                    <Label>Profile Photo</Label>
                    <div className="mt-2 flex items-center gap-4">
                      {formData.profileImage ? (
                        <div className="relative h-24 w-24 overflow-hidden rounded-full">
                          <img src={URL.createObjectURL(formData.profileImage)} alt="Profile" className="h-full w-full object-cover" />
                          <button type="button" onClick={() => set("profileImage", null)} className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white">
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50">
                          <Camera size={24} className="text-gray-400" />
                        </div>
                      )}
                      <label className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
                        <Upload size={16} /> Upload Photo
                        <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, "profileImage")} />
                      </label>
                    </div>
                  </div>

                  <Field label="Full Name" name="fullName" value={formData.fullName} onChange={handleInput} required />
                  <Field label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleInput} />

                  <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleInput} required options={GENDERS} placeholder="Select Gender" />
                  <Field label="Birthday" type="date" name="birthday" value={formData.birthday} onChange={handleInput} />
                  <SelectField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleInput} options={BLOOD_GROUPS} placeholder="Select Blood Group" />
                  <Field label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInput} required />
                  <Field label="Email" name="email" type="email" value={formData.email} onChange={handleInput} />
                </div>
              </SectionCard>

              {/* ── Address ── */}
              <SectionCard icon={<Building2 size={20} />} title="Address Details">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <Label>Address</Label>
                    <textarea name="address" value={formData.address} onChange={handleInput} rows="3"
                      className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                      placeholder="Enter your full address" />
                  </div>
                  <Field label="City" name="city" value={formData.city} onChange={handleInput} required />
                  <Field label="State" name="state" value={formData.state} onChange={handleInput} />
                  <Field label="Country" name="country" value={formData.country} onChange={handleInput} />
                  <Field label="Pincode" name="pincode" value={formData.pincode} onChange={handleInput} />
                </div>
              </SectionCard>

              {/* ── Professional Information ── */}
              <SectionCard icon={<Briefcase size={20} />} title="Professional Information">
                <div className="flex flex-wrap gap-6">
                  {[
                    { label: "I have a Business", key: "business" },
                    { label: "I have a Job",      key: "job"      },
                   
                  ].map(opt => (
                    <label key={opt.key} className="flex cursor-pointer items-center gap-2">
                      <input type="radio" name="profType" className="h-4 w-4 accent-maroon"
                        checked={
                          opt.key === "business" ? (formData.hasBusiness && !formData.hasJob) :
                          opt.key === "job"      ? (formData.hasJob && !formData.hasBusiness) :
                          (!formData.hasBusiness && !formData.hasJob)
                        }
                        onChange={() => setFormData(f => ({
                          ...f,
                          hasBusiness: opt.key === "business",
                          hasJob:      opt.key === "job",
                        }))}
                      />
                      <span className="text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>

               {formData.hasJob && (
  <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
    <h4 className="mb-4 flex items-center gap-2 font-semibold text-blue-800">
      <Briefcase size={18} /> Job Details
    </h4>

    <div className="grid gap-4 md:grid-cols-2">

      {/* Job Type */}
      <SelectField
        label="Job Type"
        name="jobType"
        value={formData.jobDetails.jobType}
        onChange={handleJobInput}
        required
        options={JOB_TYPES}
        placeholder="Select Job Type"
      />

      {/* ───────── PRIVATE JOB ───────── */}
      {formData.jobDetails.jobType === "Private Job" && (
        <>
          <Field
            label="Company / Organization"
            name="companyName"
            value={formData.jobDetails.companyName}
            onChange={handleJobInput}
            required
          />

          <Field
            label="Designation"
            name="designation"
            value={formData.jobDetails.designation}
            onChange={handleJobInput}
            required
          />

          <Field
            label="Department"
            name="department"
            value={formData.jobDetails.department || ""}
            onChange={handleJobInput}
          />

          <Field
            label="Job Location"
            name="jobLocation"
            value={formData.jobDetails.jobLocation}
            onChange={handleJobInput}
          />

         
        </>
      )}

      {/* ───────── GOVERNMENT JOB ───────── */}
      {formData.jobDetails.jobType === "Government Job" && (
        <>
          <Field
            label="Department Name"
            name="governmentDepartment"
            value={formData.jobDetails.governmentDepartment || ""}
            onChange={handleJobInput}
            required
          />

          <Field
            label="Designation / Rank"
            name="designation"
            value={formData.jobDetails.designation}
            onChange={handleJobInput}
            required
          />

        

         

          

          <Field
            label="Office Address"
            name="officeAddress"
            value={formData.jobDetails.officeAddress || ""}
            onChange={handleJobInput}
          />
        </>
      )}

      {/* ───────── OTHER ───────── */}
      {formData.jobDetails.jobType === "Other" && (
        <>
          <Field
            label="Profession"
            name="designation"
            value={formData.jobDetails.designation}
            onChange={handleJobInput}
            required
          />

          <Field
            label="Work Place / Organization"
            name="companyName"
            value={formData.jobDetails.companyName}
            onChange={handleJobInput}
          />

          <Field
            label="Location"
            name="jobLocation"
            value={formData.jobDetails.jobLocation}
            onChange={handleJobInput}
          />

          <Field
            label="Details"
            name="otherDetails"
            value={formData.jobDetails.otherDetails || ""}
            onChange={handleJobInput}
          />
        </>
      )}

    </div>
  </div>
)}

                {formData.hasBusiness && (
                  <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-6">
                    <h4 className="mb-4 flex items-center gap-2 font-semibold text-green-800">
                      <Building2 size={18} /> Business Details
                    </h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Business Name" name="businessName" value={formData.businessDetails.businessName} onChange={handleBizInput} required />
                      <Field label="Business Type" name="businessType" value={formData.businessDetails.businessType} onChange={handleBizInput} />
                      <Field label="Business Phone" name="businessPhone" type="tel" value={formData.businessDetails.businessPhone} onChange={handleBizInput} />
                      <Field label="Business Email" name="businessEmail" type="email" value={formData.businessDetails.businessEmail} onChange={handleBizInput} />
                      <Field label="Website" name="businessWebsite" type="url" value={formData.businessDetails.businessWebsite} onChange={handleBizInput} />
                      <div className="md:col-span-2">
                        <Label>Business Address</Label>
                        <textarea name="businessAddress" value={formData.businessDetails.businessAddress} onChange={handleBizInput} rows="2"
                          className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                          placeholder="Enter business address" />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Business Description</Label>
                        <textarea name="businessDescription" value={formData.businessDetails.businessDescription} onChange={handleBizInput} rows="3"
                          className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                          placeholder="Brief description about your business" />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Business Photos (Max 5)</Label>
                        <div className="mt-3 flex flex-wrap gap-3">
                          {formData.businessDetails.businessImages.map((file, idx) => (
                            <div key={idx} className="relative h-24 w-24 overflow-hidden rounded-lg">
                              <img src={URL.createObjectURL(file)} alt={`Biz ${idx + 1}`} className="h-full w-full object-cover" />
                              <button type="button" onClick={() => removeBizImage(idx)} className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white">
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                          {formData.businessDetails.businessImages.length < 5 && (
                            <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 hover:border-maroon">
                              <Plus size={20} className="text-gray-400" />
                              <span className="text-xs text-gray-400">Add Image</span>
                              <input type="file" accept="image/*" className="hidden" onChange={handleBizImages} />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </SectionCard>

              {/* ── Family Members ── */}
              <SectionCard icon={<Users size={20} />} title="Family Members">

                {/* ── Repeatable family member forms ── */}
                {formData.familyMembers.length > 0 && (
                  <div className="mb-4 space-y-4">
                    {formData.familyMembers.map((m, i) => (
                      <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800">Family Member {i + 1}</h4>
                          <button type="button" onClick={() => removeFamilyMember(i)} title="Remove"
                            className="rounded-md p-1 text-red-500 hover:bg-red-50">
                            <X size={16} />
                          </button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Field label="Name" value={m.name}
                            onChange={e => updateFamilyMember(i, "name", e.target.value)} required />

                          <SelectField label="Relation" value={m.relation}
                            onChange={e => updateFamilyMember(i, "relation", e.target.value)}
                            options={FAMILY_RELATIONS} placeholder="Select Relation" required />

                          {/* DOB — typing here auto-computes age */}
                          <div>
                            <Label>Date of Birth</Label>
                            <input type="date" value={m.dob} onChange={e => handleFamilyDobChange(i, e.target.value)}
                              className={INPUT} />
                            {m.dob && m.age &&
                              <p className="mt-1 text-xs text-gray-500">Auto-computed age: {m.age} yrs</p>
                            }
                          </div>

                          {/* Age — typing here keeps dob unchanged */}
                          <div>
                            <Label>Age (override)</Label>
                            <input type="number" min="0" max="120" value={m.age}
                              onChange={e => updateFamilyMember(i, "age", e.target.value)}
                              placeholder="Type age manually"
                              className={INPUT} />
                          </div>

                          <Field label="Occupation" value={m.occupation}
                            onChange={e => updateFamilyMember(i, "occupation", e.target.value)} />
                          <Field label="Phone" type="tel" value={m.phone}
                            onChange={e => updateFamilyMember(i, "phone", e.target.value)} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button type="button" onClick={addFamilyMember}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-maroon/40 px-4 py-3 text-sm text-maroon hover:border-maroon hover:bg-maroon/5">
                  <Plus size={18} /> Add Family Member
                </button>
              </SectionCard>

              {/* ── Wedding Anniversaries ── */}
              <SectionCard icon={<CalendarHeart size={20} />} title="Wedding Anniversaries">

                {/* ── Repeatable anniversary forms ── */}
                {formData.anniversaries.length > 0 && (
                  <div className="mb-4 space-y-4">
                    {formData.anniversaries.map((a, i) => (
                      <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800">Anniversary {i + 1}</h4>
                          <button type="button" onClick={() => removeAnniversary(i)} title="Remove"
                            className="rounded-md p-1 text-red-500 hover:bg-red-50">
                            <X size={16} />
                          </button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Field label="Husband's Name" value={a.husbandName}
                            onChange={e => updateAnniversary(i, "husbandName", e.target.value)} required />
                          <Field label="Wife's Name" value={a.wifeName}
                            onChange={e => updateAnniversary(i, "wifeName", e.target.value)} required />
                          <Field label="Anniversary Date" type="date" value={a.anniversaryDate}
                            onChange={e => updateAnniversary(i, "anniversaryDate", e.target.value)} required />
                          <Field label="Note (optional)" value={a.note}
                            onChange={e => updateAnniversary(i, "note", e.target.value)} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button type="button" onClick={addAnniversary}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-maroon/40 px-4 py-3 text-sm text-maroon hover:border-maroon hover:bg-maroon/5">
                  <Plus size={18} /> Add Anniversary Date
                </button>
              </SectionCard>

              {/* ── Other Special Dates ── */}
              <SectionCard icon={<Calendar size={20} />} title="Other Special Dates">

                {/* ── Repeatable special date forms ── */}
                {formData.customDates.length > 0 && (
                  <div className="mb-4 space-y-4">
                    {formData.customDates.map((d, i) => (
                      <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800">Special Date {i + 1}</h4>
                          <button type="button" onClick={() => removeCustomDate(i)} title="Remove"
                            className="rounded-md p-1 text-red-500 hover:bg-red-50">
                            <X size={16} />
                          </button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Field label="Title / Occasion" value={d.title}
                            onChange={e => updateCustomDate(i, "title", e.target.value)} required />
                          <Field label="Date" type="date" value={d.date}
                            onChange={e => updateCustomDate(i, "date", e.target.value)} required />
                          <div className="md:col-span-2">
                            <Label>Description (optional)</Label>
                            <textarea rows="2" value={d.description}
                              onChange={e => updateCustomDate(i, "description", e.target.value)}
                              className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button type="button" onClick={addCustomDate}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-maroon/40 px-4 py-3 text-sm text-maroon hover:border-maroon hover:bg-maroon/5">
                  <Plus size={18} /> Add Special Date
                </button>
              </SectionCard>

              {/* ── Submit ── */}
              <div className="border-t pt-8">
                <button type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-yellow-500 hover:to-yellow-700">
                  Submit Application — {selectedTier}
                </button>
                <p className="mt-4 text-center text-sm text-gray-500">
                  By submitting, you agree to be contacted for membership verification and payment.
                  Your information will be kept confidential.
                </p>
              </div>
            </form>
          </div>
        </section>
      )}
    </PageShell>
  );
}

// ─── SHARED TAILWIND INPUT CLASS ─────────────────────────────────────────────
const INPUT = "mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 transition-colors";

// ─── REUSABLE COMPONENTS ─────────────────────────────────────────────────────

function SectionCard({ icon, title, children }) {
  return (
    <div className="rounded-2xl border bg-gray-50/60 p-6">
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

function Field({ label, required, ...props }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <input {...props} className={INPUT} />
    </div>
  );
}

function SelectField({ label, required, options, placeholder, ...props }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <select {...props} className={INPUT}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default BecomeMemberPage;
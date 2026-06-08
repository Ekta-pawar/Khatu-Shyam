import React, { useState } from "react";
import { PageShell, PageHeader } from "../components/PageShell";
import { Check, Crown, Plus, X, Upload, User, Building2, Camera, CalendarHeart, Users } from "lucide-react";

const tiers = [
  {
    name: "Bronze Member",
    price: "₹2,100 / year",
    perks: [
      "Member ID & welcome kit",
      "Event invitations",
      "Monthly bhajan satsang",
    ],
  },
  {
    name: "Silver Member",
    price: "₹11,000 / year",
    featured: true,
    perks: [
      "All Bronze benefits",
      "Reserved seating at sandhyas",
      "Family listing in directory",
      "Yatra priority booking",
    ],
  },
  {
    name: "Golden Patron",
    price: "₹1,11,000 / lifetime",
    perks: [
      "All Silver benefits",
      "Patron recognition",
      "Bhandara sponsorship credit",
      "Trustee voting rights",
    ],
  },
];

const GENDERS = ["Male", "Female", "Other"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function BecomeMemberPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    fatherName: "",
    gender: "",
    phone: "",
    alternatePhone: "",
    email: "",
    occupation: "",
    bloodGroup: "",
    profileImage: null,
    
    // Address
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    
    // Membership
    tier: "",
    reason: "",
    
    // Special Dates (Optional)
    birthdays: [],
    anniversaries: [],
    customDates: [],
    
    // Family Details (Optional)
    familyMembers: [],
    familyImages: [],
    
    // Business Info (Optional)
    businessName: "",
    businessType: "",
    businessAddress: "",
    businessPhone: "",
    businessEmail: "",
    businessWebsite: "",
    businessDescription: "",
    businessImages: [],
  });

  // New item states
  const [newBirthday, setNewBirthday] = useState({ personName: "", relation: "", birthDate: "", note: "" });
  const [newAnniversary, setNewAnniversary] = useState({ husbandName: "", wifeName: "", anniversaryDate: "", note: "" });
  const [newCustomDate, setNewCustomDate] = useState({ title: "", date: "", description: "" });
  const [newFamilyMember, setNewFamilyMember] = useState({ name: "", relation: "", age: "", occupation: "", phone: "" });

  // Show/Hide optional sections
  const [showBirthdays, setShowBirthdays] = useState(false);
  const [showAnniversaries, setShowAnniversaries] = useState(false);
  const [showCustomDates, setShowCustomDates] = useState(false);
  const [showFamilyMembers, setShowFamilyMembers] = useState(false);
  const [showBusinessInfo, setShowBusinessInfo] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file && field === 'profileImage') {
      setFormData({ ...formData, profileImage: file });
    }
  };

  const handleMultipleImages = (e, field) => {
    const files = Array.from(e.target.files);
    const currentImages = formData[field] || [];
    const maxImages = field === 'businessImages' ? 5 : 5;
    
    if (currentImages.length + files.length <= maxImages) {
      setFormData({ ...formData, [field]: [...currentImages, ...files] });
    } else {
      alert(`Maximum ${maxImages} images allowed`);
    }
  };

  const removeImage = (field, index) => {
    const images = [...formData[field]];
    images.splice(index, 1);
    setFormData({ ...formData, [field]: images });
  };

  const addBirthday = () => {
    if (newBirthday.personName && newBirthday.birthDate) {
      setFormData({
        ...formData,
        birthdays: [...formData.birthdays, { ...newBirthday }],
      });
      setNewBirthday({ personName: "", relation: "", birthDate: "", note: "" });
    }
  };

  const addAnniversary = () => {
    if (newAnniversary.husbandName && newAnniversary.wifeName && newAnniversary.anniversaryDate) {
      setFormData({
        ...formData,
        anniversaries: [...formData.anniversaries, { ...newAnniversary }],
      });
      setNewAnniversary({ husbandName: "", wifeName: "", anniversaryDate: "", note: "" });
    }
  };

  const addCustomDate = () => {
    if (newCustomDate.title && newCustomDate.date) {
      setFormData({
        ...formData,
        customDates: [...formData.customDates, { ...newCustomDate }],
      });
      setNewCustomDate({ title: "", date: "", description: "" });
    }
  };

  const addFamilyMember = () => {
    if (newFamilyMember.name && newFamilyMember.relation) {
      setFormData({
        ...formData,
        familyMembers: [...formData.familyMembers, { ...newFamilyMember }],
      });
      setNewFamilyMember({ name: "", relation: "", age: "", occupation: "", phone: "" });
    }
  };

  const removeItem = (type, index) => {
    setFormData({
      ...formData,
      [type]: formData[type].filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submissionData = {
      ...formData,
      specialDates: {
        birthdays: formData.birthdays,
        anniversaries: formData.anniversaries,
        customDates: formData.customDates,
      },
      familyDetails: {
        members: formData.familyMembers,
        images: formData.familyImages,
      },
      businessInfo: showBusinessInfo ? {
        businessName: formData.businessName,
        businessType: formData.businessType,
        businessAddress: formData.businessAddress,
        businessPhone: formData.businessPhone,
        businessEmail: formData.businessEmail,
        businessWebsite: formData.businessWebsite,
        businessDescription: formData.businessDescription,
        businessImages: formData.businessImages,
      } : null,
    };
    
    console.log("Submitting:", submissionData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Sadasyata"
        title="Become a Member"
        subtitle="Choose a membership tier and join our growing devotional family."
      />

      {/* Membership Tiers */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 shadow-lg transition-transform hover:scale-105 ${
                tier.featured
                  ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-yellow-200"
                  : "border bg-white shadow-gray-200"
              }`}
            >
              {tier.featured && (
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm">
                  <Crown size={16} />
                  Most Popular
                </div>
              )}
              <h3 className={`text-2xl font-bold ${tier.featured ? "text-white" : "text-gray-800"}`}>
                {tier.name}
              </h3>
              <p className={`mt-2 text-3xl font-bold ${tier.featured ? "text-white" : "text-maroon"}`}>
                {tier.price}
              </p>
              <ul className="mt-6 space-y-3">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <Check size={16} className="mt-1 flex-shrink-0" />
                    <span className="text-sm">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="mx-auto max-w-4xl px-5 pb-24">
        <div className="rounded-3xl bg-white p-8 shadow-xl md:p-12">
          <div className="mb-8 border-b pb-6">
            <h2 className="text-3xl font-bold text-maroon">
              Membership Application
            </h2>
            <p className="mt-2 text-gray-500">
              Fill out the form below with all required details. Fields marked with * are mandatory.
            </p>
          </div>

          {submitted && (
            <div className="mb-8 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700 animate-fadeIn">
              <Check size={20} className="text-green-500" />
              <span className="font-medium">Jai Shree Shyam! Your application has been received. We will contact you soon.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Personal Information */}
            <SectionCard icon={<User size={20} />} title="Personal Information">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label required>Profile Photo</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="relative">
                      {formData.profileImage ? (
                        <div className="relative h-24 w-24 overflow-hidden rounded-full">
                          <img
                            src={URL.createObjectURL(formData.profileImage)}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, profileImage: null })}
                            className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50">
                          <Camera size={24} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
                      <Upload size={16} />
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'profileImage')}
                      />
                    </label>
                  </div>
                </div>

                <Field label="Full Name *" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                <Field label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleInputChange} />
                
                <div>
                  <Label required>Gender *</Label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                  >
                    <option value="">Select Gender</option>
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Blood Group</Label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                  >
                    <option value="">Select Blood Group</option>
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <Field label="Phone Number *" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                <Field label="Alternate Phone" name="alternatePhone" type="tel" value={formData.alternatePhone} onChange={handleInputChange} />
                <Field label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                <Field label="Occupation" name="occupation" value={formData.occupation} onChange={handleInputChange} />
              </div>
            </SectionCard>

            {/* Address */}
            <SectionCard icon={<Building2 size={20} />} title="Address Details">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label>Address</Label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                    placeholder="Enter your full address"
                  />
                </div>
                <Field label="City *" name="city" value={formData.city} onChange={handleInputChange} required />
                <Field label="State" name="state" value={formData.state} onChange={handleInputChange} />
                <Field label="Country" name="country" value={formData.country} onChange={handleInputChange} />
                <Field label="Pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} />
              </div>
            </SectionCard>

            {/* Membership Selection */}
            <SectionCard icon={<Crown size={20} />} title="Membership Details">
              <div className="grid gap-5">
                <div>
                  <Label required>Membership Tier *</Label>
                  <select
                    name="tier"
                    value={formData.tier}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                  >
                    <option value="">Select Tier</option>
                    <option value="bronze">Bronze Member (₹2,100/year)</option>
                    <option value="silver">Silver Member (₹11,000/year)</option>
                    <option value="golden">Golden Patron (₹1,11,000/lifetime)</option>
                  </select>
                </div>
                <div>
                  <Label required>Why do you want to join? *</Label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                    placeholder="Share your thoughts and motivation for joining our devotional family..."
                  />
                </div>
              </div>
            </SectionCard>

            {/* Special Dates - Birthdays (Optional) */}
            <OptionalSection
              icon={<CalendarHeart size={20} />}
              title="Family Birthdays"
              show={showBirthdays}
              onToggle={() => setShowBirthdays(!showBirthdays)}
            >
              <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
                <Field
                  label="Person Name"
                  value={newBirthday.personName}
                  onChange={(e) => setNewBirthday({ ...newBirthday, personName: e.target.value })}
                />
                <Field
                  label="Relation"
                  value={newBirthday.relation}
                  onChange={(e) => setNewBirthday({ ...newBirthday, relation: e.target.value })}
                />
                <Field
                  label="Birth Date"
                  type="date"
                  value={newBirthday.birthDate}
                  onChange={(e) => setNewBirthday({ ...newBirthday, birthDate: e.target.value })}
                />
                <Field
                  label="Note"
                  value={newBirthday.note}
                  onChange={(e) => setNewBirthday({ ...newBirthday, note: e.target.value })}
                />
                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={addBirthday}
                    className="flex items-center gap-2 rounded-lg bg-maroon px-4 py-2 text-sm text-white hover:bg-maroon/90"
                  >
                    <Plus size={16} /> Add Birthday
                  </button>
                </div>
              </div>
              {formData.birthdays.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.birthdays.map((b, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                      <span className="text-sm">{b.personName} - {b.relation} - {b.birthDate}</span>
                      <button type="button" onClick={() => removeItem("birthdays", i)} className="text-red-500 hover:text-red-700">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </OptionalSection>

            {/* Special Dates - Anniversaries (Optional) */}
            <OptionalSection
              icon={<CalendarHeart size={20} />}
              title="Wedding Anniversaries"
              show={showAnniversaries}
              onToggle={() => setShowAnniversaries(!showAnniversaries)}
            >
              <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
                <Field
                  label="Husband Name"
                  value={newAnniversary.husbandName}
                  onChange={(e) => setNewAnniversary({ ...newAnniversary, husbandName: e.target.value })}
                />
                <Field
                  label="Wife Name"
                  value={newAnniversary.wifeName}
                  onChange={(e) => setNewAnniversary({ ...newAnniversary, wifeName: e.target.value })}
                />
                <Field
                  label="Anniversary Date"
                  type="date"
                  value={newAnniversary.anniversaryDate}
                  onChange={(e) => setNewAnniversary({ ...newAnniversary, anniversaryDate: e.target.value })}
                />
                <Field
                  label="Note"
                  value={newAnniversary.note}
                  onChange={(e) => setNewAnniversary({ ...newAnniversary, note: e.target.value })}
                />
                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={addAnniversary}
                    className="flex items-center gap-2 rounded-lg bg-maroon px-4 py-2 text-sm text-white hover:bg-maroon/90"
                  >
                    <Plus size={16} /> Add Anniversary
                  </button>
                </div>
              </div>
              {formData.anniversaries.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.anniversaries.map((a, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                      <span className="text-sm">{a.husbandName} & {a.wifeName} - {a.anniversaryDate}</span>
                      <button type="button" onClick={() => removeItem("anniversaries", i)} className="text-red-500 hover:text-red-700">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </OptionalSection>

            {/* Special Dates - Custom (Optional) */}
            <OptionalSection
              icon={<CalendarHeart size={20} />}
              title="Other Special Dates"
              show={showCustomDates}
              onToggle={() => setShowCustomDates(!showCustomDates)}
            >
              <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
                <Field
                  label="Title"
                  value={newCustomDate.title}
                  onChange={(e) => setNewCustomDate({ ...newCustomDate, title: e.target.value })}
                />
                <Field
                  label="Date"
                  type="date"
                  value={newCustomDate.date}
                  onChange={(e) => setNewCustomDate({ ...newCustomDate, date: e.target.value })}
                />
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <textarea
                    rows="3"
                    value={newCustomDate.description}
                    onChange={(e) => setNewCustomDate({ ...newCustomDate, description: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                    placeholder="Add description for this special date..."
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={addCustomDate}
                    className="flex items-center gap-2 rounded-lg bg-maroon px-4 py-2 text-sm text-white hover:bg-maroon/90"
                  >
                    <Plus size={16} /> Add Special Date
                  </button>
                </div>
              </div>
              {formData.customDates.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.customDates.map((d, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                      <span className="text-sm">{d.title} - {d.date}</span>
                      <button type="button" onClick={() => removeItem("customDates", i)} className="text-red-500 hover:text-red-700">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </OptionalSection>

            {/* Family Members (Optional) */}
            <OptionalSection
              icon={<Users size={20} />}
              title="Family Members"
              show={showFamilyMembers}
              onToggle={() => setShowFamilyMembers(!showFamilyMembers)}
            >
              <div className="space-y-4">
                <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
                  <Field
                    label="Name *"
                    value={newFamilyMember.name}
                    onChange={(e) => setNewFamilyMember({ ...newFamilyMember, name: e.target.value })}
                  />
                  <Field
                    label="Relation *"
                    value={newFamilyMember.relation}
                    onChange={(e) => setNewFamilyMember({ ...newFamilyMember, relation: e.target.value })}
                  />
                  <Field
                    label="Age"
                    type="number"
                    value={newFamilyMember.age}
                    onChange={(e) => setNewFamilyMember({ ...newFamilyMember, age: e.target.value })}
                  />
                  <Field
                    label="Occupation"
                    value={newFamilyMember.occupation}
                    onChange={(e) => setNewFamilyMember({ ...newFamilyMember, occupation: e.target.value })}
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    value={newFamilyMember.phone}
                    onChange={(e) => setNewFamilyMember({ ...newFamilyMember, phone: e.target.value })}
                  />
                  <div className="md:col-span-2">
                    <button
                      type="button"
                      onClick={addFamilyMember}
                      className="flex items-center gap-2 rounded-lg bg-maroon px-4 py-2 text-sm text-white hover:bg-maroon/90"
                    >
                      <Plus size={16} /> Add Family Member
                    </button>
                  </div>
                </div>
                {formData.familyMembers.length > 0 && (
                  <div className="space-y-2">
                    {formData.familyMembers.map((m, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <div>
                          <span className="font-medium text-sm">{m.name}</span>
                          <span className="text-sm text-gray-500"> - {m.relation}</span>
                          {m.age && <span className="text-sm text-gray-500"> ({m.age} yrs)</span>}
                        </div>
                        <button type="button" onClick={() => removeItem("familyMembers", i)} className="text-red-500 hover:text-red-700">
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Family Images Upload */}
                <div className="rounded-lg border p-4">
                  <Label>Family Photos (Max 5)</Label>
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-3 mb-3">
                      {formData.familyImages.map((file, index) => (
                        <div key={index} className="relative h-20 w-20 overflow-hidden rounded-lg">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Family ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage('familyImages', index)}
                            className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                      {formData.familyImages.length < 5 && (
                        <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-maroon">
                          <Plus size={20} className="text-gray-400" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleMultipleImages(e, 'familyImages')}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </OptionalSection>

            {/* Business Info (Optional) */}
            <OptionalSection
              icon={<Building2 size={20} />}
              title="Business Information"
              show={showBusinessInfo}
              onToggle={() => setShowBusinessInfo(!showBusinessInfo)}
            >
              <div className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Business Name" name="businessName" value={formData.businessName} onChange={handleInputChange} />
                  <Field label="Business Type" name="businessType" value={formData.businessType} onChange={handleInputChange} />
                  <Field label="Business Phone" name="businessPhone" type="tel" value={formData.businessPhone} onChange={handleInputChange} />
                  <Field label="Business Email" name="businessEmail" type="email" value={formData.businessEmail} onChange={handleInputChange} />
                  <Field label="Website" name="businessWebsite" type="url" value={formData.businessWebsite} onChange={handleInputChange} />
                  <div className="md:col-span-2">
                    <Label>Business Address</Label>
                    <textarea
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleInputChange}
                      rows="2"
                      className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                      placeholder="Enter business address"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Business Description</Label>
                    <textarea
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      rows="3"
                      className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                      placeholder="Brief description about your business"
                    />
                  </div>
                </div>
                
                {/* Business Images Upload */}
                <div className="rounded-lg border p-4">
                  <Label>Business Photos (Max 5)</Label>
                  <p className="text-xs text-gray-500 mt-1">Upload images of your business, products, or services</p>
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-3 mb-3">
                      {formData.businessImages.map((file, index) => (
                        <div key={index} className="relative h-24 w-24 overflow-hidden rounded-lg">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Business ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage('businessImages', index)}
                            className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                      {formData.businessImages.length < 5 && (
                        <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 hover:border-maroon">
                          <Plus size={20} className="text-gray-400" />
                          <span className="text-xs text-gray-400">Add Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleMultipleImages(e, 'businessImages')}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </OptionalSection>

            {/* Submit */}
            <div className="border-t pt-8">
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 py-4 text-lg font-semibold text-white shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Submit Application
              </button>
              <p className="mt-4 text-center text-sm text-gray-500">
                By submitting, you agree to be contacted for membership verification and payment.
                Your information will be kept confidential.
              </p>
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

// Reusable Components
function SectionCard({ icon, title, children }) {
  return (
    <div className="rounded-2xl border bg-gray-50/50 p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-maroon">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function OptionalSection({ icon, title, show, onToggle, children }) {
  return (
    <div className="rounded-2xl border bg-gray-50/50 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-maroon">{icon}</span>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">Optional</span>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="text-sm text-maroon hover:text-maroon/80 font-medium"
        >
          {show ? "Hide" : "Add"} Details
        </button>
      </div>
      {show && <div className="mt-4">{children}</div>}
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
      <input
        {...props}
        className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 transition-colors"
      />
    </div>
  );
}

export default BecomeMemberPage;
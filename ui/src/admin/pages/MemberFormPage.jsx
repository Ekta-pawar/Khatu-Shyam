import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import FormField from "../components/FormField";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useCreateMemberMutation, useGetMemberByIdQuery, useUpdateMemberMutation } from "../api/memberApi";
import { getErrorMessage } from "../utils/errorMessage";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const BLOOD_GROUP_OPTIONS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => ({ value: bg, label: bg }));

const initialPersonalInfo = {
  firstName: "",
  lastName: "",
  fatherName: "",
  motherName: "",
  gender: "",
  phone: "",
  alternatePhone: "",
  email: "",
  occupation: "",
  bloodGroup: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
};

let localIdCounter = 0;
const nextLocalId = () => `local-${++localIdCounter}`;

const SectionCard = ({ title, description, children }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-base font-semibold text-slate-800">{title}</h2>
    {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
    <div className="mt-4 flex flex-col gap-4">{children}</div>
  </div>
);

const RemovableRow = ({ onRemove, children }) => (
  <div className="relative rounded-lg border border-slate-200 bg-slate-50 p-4">
    <button
      type="button"
      onClick={onRemove}
      className="absolute right-3 top-3 rounded-lg p-1.5 text-red-500 hover:bg-red-50"
      title="Remove"
    >
      <Trash2 size={16} />
    </button>
    <div className="grid grid-cols-1 gap-3 pr-8 sm:grid-cols-2">{children}</div>
  </div>
);

const MemberFormPage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const { data: existingMember, isFetching: loadingMember } = useGetMemberByIdQuery(id, { skip: !isEditMode });
  const [createMember, { isLoading: isCreating }] = useCreateMemberMutation();
  const [updateMember, { isLoading: isUpdating }] = useUpdateMemberMutation();
  const isSubmitting = isCreating || isUpdating;

  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);

  const [showBirthdaySection, setShowBirthdaySection] = useState(false);
  const [showAnniversarySection, setShowAnniversarySection] = useState(false);
  const [showCustomDateSection, setShowCustomDateSection] = useState(false);
  const [birthdays, setBirthdays] = useState([]);
  const [anniversaries, setAnniversaries] = useState([]);
  const [customDates, setCustomDates] = useState([]);

  const [familyMembers, setFamilyMembers] = useState([]);

  const [profileImage, setProfileImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [familyImages, setFamilyImages] = useState([]);

  // Pre-fill the form when editing
  useEffect(() => {
    if (!existingMember) return;

    setPersonalInfo({
      firstName: existingMember.firstName || "",
      lastName: existingMember.lastName || "",
      fatherName: existingMember.fatherName || "",
      motherName: existingMember.motherName || "",
      gender: existingMember.gender || "",
      phone: existingMember.phone || "",
      alternatePhone: existingMember.alternatePhone || "",
      email: existingMember.email || "",
      occupation: existingMember.occupation || "",
      bloodGroup: existingMember.bloodGroup || "",
      address: existingMember.address || "",
      city: existingMember.city || "",
      state: existingMember.state || "",
      country: existingMember.country || "India",
      pincode: existingMember.pincode || "",
    });

    const toDateInput = (value) => (value ? new Date(value).toISOString().slice(0, 10) : "");

    const existingBirthdays = (existingMember.specialDates?.birthdays || []).map((b) => ({
      _localId: nextLocalId(),
      personName: b.personName || "",
      relation: b.relation || "",
      birthDate: toDateInput(b.birthDate),
      note: b.note || "",
    }));
    const existingAnniversaries = (existingMember.specialDates?.anniversaries || []).map((a) => ({
      _localId: nextLocalId(),
      husbandName: a.husbandName || "",
      wifeName: a.wifeName || "",
      anniversaryDate: toDateInput(a.anniversaryDate),
      note: a.note || "",
    }));
    const existingCustomDates = (existingMember.specialDates?.customDates || []).map((c) => ({
      _localId: nextLocalId(),
      title: c.title || "",
      date: toDateInput(c.date),
      description: c.description || "",
    }));

    setBirthdays(existingBirthdays);
    setAnniversaries(existingAnniversaries);
    setCustomDates(existingCustomDates);
    setShowBirthdaySection(existingBirthdays.length > 0);
    setShowAnniversarySection(existingAnniversaries.length > 0);
    setShowCustomDateSection(existingCustomDates.length > 0);

    setFamilyMembers(
      (existingMember.familyDetails?.members || []).map((fm) => ({
        _localId: nextLocalId(),
        name: fm.name || "",
        relation: fm.relation || "",
        age: fm.age ?? "",
        occupation: fm.occupation || "",
        phone: fm.phone || "",
      }))
    );
  }, [existingMember]);

  const handlePersonalInfoChange = (event) => {
    const { name, value } = event.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------------------- Special dates: dynamic add/remove ---------------------------- */

  const addBirthday = () => {
    setShowBirthdaySection(true);
    setBirthdays((prev) => [...prev, { _localId: nextLocalId(), personName: "", relation: "", birthDate: "", note: "" }]);
  };
  const addAnniversary = () => {
    setShowAnniversarySection(true);
    setAnniversaries((prev) => [...prev, { _localId: nextLocalId(), husbandName: "", wifeName: "", anniversaryDate: "", note: "" }]);
  };
  const addCustomDate = () => {
    setShowCustomDateSection(true);
    setCustomDates((prev) => [...prev, { _localId: nextLocalId(), title: "", date: "", description: "" }]);
  };

  const updateListItem = (setter) => (localId, field, value) => {
    setter((prev) => prev.map((item) => (item._localId === localId ? { ...item, [field]: value } : item)));
  };
  const removeListItem = (setter) => (localId) => {
    setter((prev) => prev.filter((item) => item._localId !== localId));
  };

  const updateBirthday = updateListItem(setBirthdays);
  const removeBirthday = removeListItem(setBirthdays);
  const updateAnniversary = updateListItem(setAnniversaries);
  const removeAnniversary = removeListItem(setAnniversaries);
  const updateCustomDate = updateListItem(setCustomDates);
  const removeCustomDate = removeListItem(setCustomDates);

  /* ------------------------------ Family details: dynamic rows ------------------------------- */

  const addFamilyMember = () => {
    setFamilyMembers((prev) => [
      ...prev,
      { _localId: nextLocalId(), name: "", relation: "", age: "", occupation: "", phone: "" },
    ]);
  };
  const updateFamilyMember = updateListItem(setFamilyMembers);
  const removeFamilyMember = removeListItem(setFamilyMembers);

  /* ---------------------------------------- File inputs -------------------------------------- */

  const handleAdditionalImagesChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 10) {
      toast.error("You can upload a maximum of 10 additional images");
      return;
    }
    setAdditionalImages(files);
  };

  const handleFamilyImagesChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 5) {
      toast.error("You can upload a maximum of 5 family images");
      return;
    }
    setFamilyImages(files);
  };

  const buildFormData = () => {
    const formData = new FormData();

    Object.entries(personalInfo).forEach(([key, value]) => {
      if (value !== "" && value !== undefined && value !== null) formData.append(key, value);
    });

    const specialDates = {
      birthdays: birthdays.map(({ _localId, ...rest }) => rest),
      anniversaries: anniversaries.map(({ _localId, ...rest }) => rest),
      customDates: customDates.map(({ _localId, ...rest }) => rest),
    };
    formData.append("specialDates", JSON.stringify(specialDates));

    const familyDetails = {
      members: familyMembers.map(({ _localId, age, ...rest }) => ({
        ...rest,
        age: age === "" ? undefined : Number(age),
      })),
    };
    formData.append("familyDetails", JSON.stringify(familyDetails));

    if (profileImage) formData.append("profileImage", profileImage);
    additionalImages.forEach((file) => formData.append("additionalImages", file));
    familyImages.forEach((file) => formData.append("familyImages", file));

    return formData;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.gender || !personalInfo.phone) {
      toast.error("Please fill in all required personal information fields");
      return;
    }

    const formData = buildFormData();

    try {
      if (isEditMode) {
        await updateMember({ id, formData }).unwrap();
        toast.success("Member updated successfully");
      } else {
        await createMember(formData).unwrap();
        toast.success("Member created successfully");
      }
      navigate("/admin/members");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to save member"));
    }
  };

  const heading = useMemo(() => (isEditMode ? "Edit member" : "Add new member"), [isEditMode]);

  if (isEditMode && loadingMember) return <Loader label="Loading member..." />;

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-800">{heading}</h1>
        <p className="text-sm text-slate-500">Fill in the sections below. Special dates and family details are optional.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* A. Personal information */}
        <SectionCard title="Personal information">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FormField label="First name" name="firstName" required value={personalInfo.firstName} onChange={handlePersonalInfoChange} />
            <FormField label="Last name" name="lastName" required value={personalInfo.lastName} onChange={handlePersonalInfoChange} />
            <FormField label="Father's name" name="fatherName" value={personalInfo.fatherName} onChange={handlePersonalInfoChange} />
            <FormField label="Mother's name" name="motherName" value={personalInfo.motherName} onChange={handlePersonalInfoChange} />
            <FormField as="select" label="Gender" name="gender" required options={GENDER_OPTIONS} value={personalInfo.gender} onChange={handlePersonalInfoChange} />
            <FormField label="Phone" name="phone" required value={personalInfo.phone} onChange={handlePersonalInfoChange} />
            <FormField label="Alternate phone" name="alternatePhone" value={personalInfo.alternatePhone} onChange={handlePersonalInfoChange} />
            <FormField label="Email" name="email" type="email" value={personalInfo.email} onChange={handlePersonalInfoChange} />
            <FormField label="Occupation" name="occupation" value={personalInfo.occupation} onChange={handlePersonalInfoChange} />
            <FormField as="select" label="Blood group" name="bloodGroup" options={BLOOD_GROUP_OPTIONS} value={personalInfo.bloodGroup} onChange={handlePersonalInfoChange} />
            <FormField label="City" name="city" value={personalInfo.city} onChange={handlePersonalInfoChange} />
            <FormField label="State" name="state" value={personalInfo.state} onChange={handlePersonalInfoChange} />
            <FormField label="Country" name="country" value={personalInfo.country} onChange={handlePersonalInfoChange} />
            <FormField label="Pincode" name="pincode" value={personalInfo.pincode} onChange={handlePersonalInfoChange} />
          </div>
          <FormField as="textarea" label="Address" name="address" value={personalInfo.address} onChange={handlePersonalInfoChange} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField label="Profile image" name="profileImage" type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files?.[0] || null)} />
            <FormField label="Additional images (max 10)" name="additionalImages" type="file" accept="image/*" multiple onChange={handleAdditionalImagesChange} />
          </div>
          {existingMember?.profileImage?.url && (
            <img src={existingMember.profileImage.url} alt="Current profile" className="h-16 w-16 rounded-full object-cover" />
          )}
        </SectionCard>

        {/* B. Special dates */}
        <SectionCard title="Special dates" description="Optional — expand a section to add entries.">
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={addBirthday}>
              <Plus size={16} /> Add Birthday
            </Button>
            <Button type="button" variant="outline" onClick={addAnniversary}>
              <Plus size={16} /> Add Anniversary
            </Button>
            <Button type="button" variant="outline" onClick={addCustomDate}>
              <Plus size={16} /> Add Custom Special Date
            </Button>
          </div>

          {showBirthdaySection && (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-slate-600">Birthdays</p>
              {birthdays.map((b) => (
                <RemovableRow key={b._localId} onRemove={() => removeBirthday(b._localId)}>
                  <FormField label="Person name" required value={b.personName} onChange={(e) => updateBirthday(b._localId, "personName", e.target.value)} />
                  <FormField label="Relation" value={b.relation} onChange={(e) => updateBirthday(b._localId, "relation", e.target.value)} />
                  <FormField label="Birth date" type="date" required value={b.birthDate} onChange={(e) => updateBirthday(b._localId, "birthDate", e.target.value)} />
                  <FormField label="Note" value={b.note} onChange={(e) => updateBirthday(b._localId, "note", e.target.value)} />
                </RemovableRow>
              ))}
              {birthdays.length === 0 && <p className="text-sm text-slate-400">No birthdays added yet.</p>}
            </div>
          )}

          {showAnniversarySection && (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-slate-600">Anniversaries</p>
              {anniversaries.map((a) => (
                <RemovableRow key={a._localId} onRemove={() => removeAnniversary(a._localId)}>
                  <FormField label="Husband's name" required value={a.husbandName} onChange={(e) => updateAnniversary(a._localId, "husbandName", e.target.value)} />
                  <FormField label="Wife's name" required value={a.wifeName} onChange={(e) => updateAnniversary(a._localId, "wifeName", e.target.value)} />
                  <FormField label="Anniversary date" type="date" required value={a.anniversaryDate} onChange={(e) => updateAnniversary(a._localId, "anniversaryDate", e.target.value)} />
                  <FormField label="Note" value={a.note} onChange={(e) => updateAnniversary(a._localId, "note", e.target.value)} />
                </RemovableRow>
              ))}
              {anniversaries.length === 0 && <p className="text-sm text-slate-400">No anniversaries added yet.</p>}
            </div>
          )}

          {showCustomDateSection && (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-slate-600">Custom special dates</p>
              {customDates.map((c) => (
                <RemovableRow key={c._localId} onRemove={() => removeCustomDate(c._localId)}>
                  <FormField label="Title" required value={c.title} onChange={(e) => updateCustomDate(c._localId, "title", e.target.value)} />
                  <FormField label="Date" type="date" required value={c.date} onChange={(e) => updateCustomDate(c._localId, "date", e.target.value)} />
                  <div className="sm:col-span-2">
                    <FormField as="textarea" label="Description" value={c.description} onChange={(e) => updateCustomDate(c._localId, "description", e.target.value)} />
                  </div>
                </RemovableRow>
              ))}
              {customDates.length === 0 && <p className="text-sm text-slate-400">No custom dates added yet.</p>}
            </div>
          )}
        </SectionCard>

        {/* C. Family details */}
        <SectionCard title="Family details" description="Optional — add family members and up to 5 photos for this section.">
          <Button type="button" variant="outline" onClick={addFamilyMember} className="self-start">
            <Plus size={16} /> Add family member
          </Button>

          {familyMembers.map((fm) => (
            <RemovableRow key={fm._localId} onRemove={() => removeFamilyMember(fm._localId)}>
              <FormField label="Name" required value={fm.name} onChange={(e) => updateFamilyMember(fm._localId, "name", e.target.value)} />
              <FormField label="Relation" required value={fm.relation} onChange={(e) => updateFamilyMember(fm._localId, "relation", e.target.value)} />
              <FormField label="Age" type="number" min="0" max="150" value={fm.age} onChange={(e) => updateFamilyMember(fm._localId, "age", e.target.value)} />
              <FormField label="Occupation" value={fm.occupation} onChange={(e) => updateFamilyMember(fm._localId, "occupation", e.target.value)} />
              <FormField label="Phone" value={fm.phone} onChange={(e) => updateFamilyMember(fm._localId, "phone", e.target.value)} />
            </RemovableRow>
          ))}

          <FormField label="Family images (max 5)" name="familyImages" type="file" accept="image/*" multiple onChange={handleFamilyImagesChange} />
          {existingMember?.familyDetails?.images?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {existingMember.familyDetails.images.map((img) => (
                <img key={img.publicId} src={img.url} alt="Family" className="h-14 w-14 rounded-lg object-cover" />
              ))}
            </div>
          )}
        </SectionCard>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isEditMode ? "Save changes" : "Create member"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MemberFormPage;

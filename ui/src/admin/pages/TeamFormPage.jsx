import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import FormField from "../components/FormField";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useCreateTeamMemberMutation, useGetTeamMemberByIdQuery, useUpdateTeamMemberMutation } from "../api/teamApi";
import { getErrorMessage } from "../utils/errorMessage";

const TEAM_TIERS = ["मुख्य कार्यकारिणी", "प्रेरणा स्रोत", "कार्यकारिणी", "संरक्षक", "सदस्य"];

const initialTeamInfo = {
  fullName: "",
  tier: "",
  designation: "",
  phone: "",
  email: "",
  occupation: "",
  city: "",
  state: "",
  country: "India",
  additionalInfo: "",
};

const SectionCard = ({ title, description, children }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-base font-semibold text-slate-800">{title}</h2>
    {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
    <div className="mt-4 flex flex-col gap-4">{children}</div>
  </div>
);

const TeamFormPage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const location = useLocation();

  const { data: existingTeamMember, isFetching: loadingTeamMember } = useGetTeamMemberByIdQuery(id, { skip: !isEditMode });
  const [createTeamMember, { isLoading: isCreating }] = useCreateTeamMemberMutation();
  const [updateTeamMember, { isLoading: isUpdating }] = useUpdateTeamMemberMutation();
  const isSubmitting = isCreating || isUpdating;

  const [teamInfo, setTeamInfo] = useState(initialTeamInfo);
  const [profileImage, setProfileImage] = useState(null);

  // Pre-fill once the existing team member loads (edit mode).
  const [prefilledId, setPrefilledId] = useState(null);
  if (existingTeamMember && existingTeamMember._id !== prefilledId) {
    setPrefilledId(existingTeamMember._id);
    setTeamInfo({
      fullName: existingTeamMember.fullName || "",
      tier: existingTeamMember.tier || "",
      designation: existingTeamMember.designation || "",
      phone: existingTeamMember.phone || "",
      email: existingTeamMember.email || "",
      occupation: existingTeamMember.occupation || "",
      city: existingTeamMember.city || "",
      state: existingTeamMember.state || "",
      country: existingTeamMember.country || "India",
      additionalInfo: existingTeamMember.additionalInfo || "",
    });
  }

  // Applies name/phone/email/tier passed from EnquiryManagementPage's
  // "Convert to Team Member" action (navigate(..., { state: { prefill } })).
  const [appliedPrefill, setAppliedPrefill] = useState(false);
  if (!isEditMode && !appliedPrefill && location.state?.prefill) {
    setAppliedPrefill(true);
    setTeamInfo((prev) => ({ ...prev, ...location.state.prefill }));
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeamInfo((prev) => ({ ...prev, [name]: value }));
  };

  const buildFormData = () => {
    const formData = new FormData();

    Object.entries(teamInfo).forEach(([key, value]) => {
      if (value !== "" && value !== undefined && value !== null) formData.append(key, value);
    });

    if (profileImage) formData.append("profileImage", profileImage);

    return formData;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!teamInfo.fullName) {
      toast.error("Full name is required");
      return;
    }
    if (!teamInfo.tier) {
      toast.error("Membership tier is required");
      return;
    }

    const formData = buildFormData();

    try {
      if (isEditMode) {
        await updateTeamMember({ id, formData }).unwrap();
        toast.success("Team member updated successfully");
      } else {
        await createTeamMember(formData).unwrap();
        toast.success("Team member created successfully");
      }
      navigate("/admin/team");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to save team member"));
    }
  };

  const heading = useMemo(() => (isEditMode ? "Edit team member" : "member"), [isEditMode]);

  if (isEditMode && loadingTeamMember) return <Loader label="Loading team member..." />;

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-yellow-500">{heading}</h1>
        <p className="text-sm text-slate-500">Committee tier, contact details, and public bio shown on /team.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <SectionCard title="Team member details">
          <FormField label="Full name" name="fullName" required value={teamInfo.fullName} onChange={handleChange} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              as="select"
              label="Membership tier"
              name="tier"
              required
              value={teamInfo.tier}
              onChange={handleChange}
              options={TEAM_TIERS.map((t) => ({ value: t, label: t }))}
            />
            <FormField label="Designation / role" name="designation" value={teamInfo.designation} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Phone" name="phone" value={teamInfo.phone} onChange={handleChange} />
            <FormField label="Email" name="email" type="email" value={teamInfo.email} onChange={handleChange} />
          </div>

          <FormField label="Occupation" name="occupation" value={teamInfo.occupation} onChange={handleChange} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField label="City" name="city" value={teamInfo.city} onChange={handleChange} />
            <FormField label="State" name="state" value={teamInfo.state} onChange={handleChange} />
            <FormField label="Country" name="country" value={teamInfo.country} onChange={handleChange} />
          </div>

          <FormField
            as="textarea"
            label="Additional information"
            name="additionalInfo"
            value={teamInfo.additionalInfo}
            onChange={handleChange}
          />

          <FormField
            label="Profile photo"
            name="profileImage"
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
          />
          {existingTeamMember?.profileImage && (
            <img src={existingTeamMember.profileImage} alt="Current team member" className="h-16 w-16 rounded-full object-cover" />
          )}
        </SectionCard>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isEditMode ? "Save changes" : "Create team member"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TeamFormPage;

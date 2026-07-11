import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import FormField from "../components/FormField";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useCreateMemberMutation, useGetMemberByIdQuery, useUpdateMemberMutation } from "../api/memberApi";
import { getErrorMessage } from "../utils/errorMessage";

const initialGuestInfo = {
  fullName: "",
  eventName: "",
  eventDate: "",
  additionalInfo: "",
};

const SectionCard = ({ title, description, children }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-base font-semibold text-slate-800">{title}</h2>
    {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
    <div className="mt-4 flex flex-col gap-4">{children}</div>
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

  const [guestInfo, setGuestInfo] = useState(initialGuestInfo);
  const [profileImage, setProfileImage] = useState(null);

  // Pre-fill the form once the existing guest loads. Adjusting state during
  // render (guarded so it only fires once per record) avoids the extra
  // render-then-effect flash of an empty form before the fetch resolves.
  const [prefilledId, setPrefilledId] = useState(null);
  if (existingMember && existingMember._id !== prefilledId) {
    setPrefilledId(existingMember._id);

    const toDateInput = (value) => (value ? new Date(value).toISOString().slice(0, 10) : "");

    setGuestInfo({
      fullName: existingMember.fullName || "",
      eventName: existingMember.eventName || "",
      eventDate: toDateInput(existingMember.eventDate),
      additionalInfo: existingMember.additionalInfo || "",
    });
  }

  const handleGuestInfoChange = (event) => {
    const { name, value } = event.target;
    setGuestInfo((prev) => ({ ...prev, [name]: value }));
  };

  const buildFormData = () => {
    const formData = new FormData();

    Object.entries(guestInfo).forEach(([key, value]) => {
      if (value !== "" && value !== undefined && value !== null) formData.append(key, value);
    });

    if (profileImage) formData.append("profileImage", profileImage);

    return formData;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!guestInfo.fullName) {
      toast.error("Guest name is required");
      return;
    }

    const formData = buildFormData();

    try {
      if (isEditMode) {
        await updateMember({ id, formData }).unwrap();
        toast.success("Guest updated successfully");
      } else {
        await createMember(formData).unwrap();
        toast.success("Guest created successfully");
      }
      navigate("/admin/members");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to save guest"));
    }
  };

  const heading = useMemo(() => (isEditMode ? "Edit guest" : "Add new guest"), [isEditMode]);

  if (isEditMode && loadingMember) return <Loader label="Loading guest..." />;

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-yellow-500">{heading}</h1>
        <p className="text-sm text-slate-500">Guest name, event details, and any extra notes.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <SectionCard title="Guest details">
          <FormField label="Guest name" name="fullName" required value={guestInfo.fullName} onChange={handleGuestInfoChange} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Event name" name="eventName" value={guestInfo.eventName} onChange={handleGuestInfoChange} />
            <FormField label="Event date" name="eventDate" type="date" value={guestInfo.eventDate} onChange={handleGuestInfoChange} />
          </div>

          <FormField
            as="textarea"
            label="Additional information"
            name="additionalInfo"
            value={guestInfo.additionalInfo}
            onChange={handleGuestInfoChange}
          />

          <FormField
            label="Guest image"
            name="profileImage"
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
          />
          {existingMember?.profileImage && (
            <img src={existingMember.profileImage} alt="Current guest" className="h-16 w-16 rounded-full object-cover" />
          )}
        </SectionCard>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isEditMode ? "Save changes" : "Create guest"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MemberFormPage;

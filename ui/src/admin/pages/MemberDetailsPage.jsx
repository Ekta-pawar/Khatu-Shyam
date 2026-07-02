import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { useGetMemberByIdQuery } from "../api/memberApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { getErrorMessage } from "../utils/errorMessage";

const Section = ({ title, children }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-base font-semibold text-slate-800">{title}</h2>
    {children}
  </div>
);

const InfoRow = ({ label, value }) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
    <p className="text-sm font-medium text-slate-700">{value || "-"}</p>
  </div>
);

const MemberDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: member, isFetching, isError, error } = useGetMemberByIdQuery(id);

  if (isFetching) return <Loader label="Loading member details..." />;
  if (isError || !member) {
    return <EmptyState title="Member not found" description={getErrorMessage(error, "This member may have been removed")} />;
  }

  const { familyDetails = {} } = member;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
            <ArrowLeft size={16} /> Back
          </button>
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{member.fullName}</h1>
            <p className="text-sm text-slate-500">Member profile details and family history</p>
          </div>
        </div>

        <Link to={`/admin/members/${id}/edit`}>
          <Button variant="primary">
            <Pencil size={16} /> Edit member
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={member.profileImage || "https://placehold.co/96x96?text=👤"}
                alt={member.fullName}
                className="h-28 w-28 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold text-slate-900">{member.fullName}</p>
                <p className="text-sm text-slate-500">{member.occupation || "Occupation not specified"}</p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <Badge color="orange">{member.gender}</Badge>
              {member.bloodGroup && <Badge color="red">{member.bloodGroup}</Badge>}
              <Badge color={member.isActive ? "green" : "slate"}>{member.isActive ? "Active" : "Inactive"}</Badge>
            </div>
          </div>

          <Section title="Personal information">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoRow label="Father's name" value={member.fatherName} />
              <InfoRow label="Mother's name" value={member.motherName} />
              <InfoRow label="Phone" value={member.phone} />
              <InfoRow label="Alternate phone" value={member.alternatePhone} />
              <InfoRow label="Email" value={member.email} />
              <InfoRow label="Occupation" value={member.occupation} />
              <InfoRow label="Address" value={member.address} />
              <InfoRow label="City" value={member.city} />
              <InfoRow label="State" value={member.state} />
              <InfoRow label="Country" value={member.country} />
              <InfoRow label="Pincode" value={member.pincode} />
            </div>

            {member.additionalImages?.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Additional images</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {member.additionalImages.map((img) => (
                    <img key={img.publicId} src={img.url} alt="Member" className="h-28 w-full rounded-3xl object-cover" />
                  ))}
                </div>
              </div>
            )}
          </Section>
        </div>

        {(familyDetails?.members?.length > 0 || familyDetails?.images?.length > 0) && (
          <Section title="Family details">
            {familyDetails.members?.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {familyDetails.members.map((fm) => (
                  <div key={fm._id} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <img
                      src={fm.image?.url || "https://placehold.co/48x48?text=👤"}
                      alt={fm.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-slate-800">{fm.name}</p>
                      <p className="text-sm text-slate-500">{fm.relation} {fm.age ? `• ${fm.age} yrs` : ""}</p>
                      {fm.occupation && <p className="text-xs text-slate-400">{fm.occupation}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {familyDetails.images?.length > 0 && (
              <div className="mt-4">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Family images</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {familyDetails.images.map((img) => (
                    <img key={img.publicId} src={img.url} alt="Family" className="h-28 w-full rounded-3xl object-cover" />
                  ))}
                </div>
              </div>
            )}
          </Section>
        )}
      </div>
    </div>
  );
};

export default MemberDetailsPage;

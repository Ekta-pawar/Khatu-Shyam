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

const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "-");

const MemberDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: member, isFetching, isError, error } = useGetMemberByIdQuery(id);

  if (isFetching) return <Loader label="Loading member details..." />;
  if (isError || !member) {
    return <EmptyState title="Member not found" description={getErrorMessage(error, "This member may have been removed")} />;
  }

  const { specialDates, familyDetails } = member;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={16} /> Back
        </button>
        <Link to={`/admin/members/${id}/edit`}>
          <Button variant="outline">
            <Pencil size={16} /> Edit member
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <img
          src={member.profileImage?.url || "https://placehold.co/96x96?text=👤"}
          alt={member.fullName}
          className="h-24 w-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-bold text-slate-800">{member.fullName}</h1>
          <p className="text-sm text-slate-500">{member.occupation || "Occupation not specified"}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge color="orange">{member.gender}</Badge>
            {member.bloodGroup && <Badge color="red">{member.bloodGroup}</Badge>}
            <Badge color={member.isActive ? "green" : "slate"}>{member.isActive ? "Active" : "Inactive"}</Badge>
          </div>
        </div>
      </div>

      <Section title="Personal information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Additional images</p>
            <div className="flex flex-wrap gap-3">
              {member.additionalImages.map((img) => (
                <img key={img.publicId} src={img.url} alt="Member" className="h-20 w-20 rounded-lg object-cover" />
              ))}
            </div>
          </div>
        )}
      </Section>

      {(specialDates?.birthdays?.length > 0 || specialDates?.anniversaries?.length > 0 || specialDates?.customDates?.length > 0) && (
        <Section title="Special dates">
          <div className="flex flex-col gap-6">
            {specialDates.birthdays?.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-600">Birthdays</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {specialDates.birthdays.map((b, idx) => (
                    <div key={idx} className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm">
                      <p className="font-medium text-slate-700">{b.personName} {b.relation && `(${b.relation})`}</p>
                      <p className="text-slate-500">{formatDate(b.birthDate)}</p>
                      {b.note && <p className="mt-1 text-xs text-slate-400">{b.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {specialDates.anniversaries?.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-600">Anniversaries</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {specialDates.anniversaries.map((a, idx) => (
                    <div key={idx} className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm">
                      <p className="font-medium text-slate-700">{a.husbandName} & {a.wifeName}</p>
                      <p className="text-slate-500">{formatDate(a.anniversaryDate)}</p>
                      {a.note && <p className="mt-1 text-xs text-slate-400">{a.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {specialDates.customDates?.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-600">Custom special dates</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {specialDates.customDates.map((c, idx) => (
                    <div key={idx} className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm">
                      <p className="font-medium text-slate-700">{c.title}</p>
                      <p className="text-slate-500">{formatDate(c.date)}</p>
                      {c.description && <p className="mt-1 text-xs text-slate-400">{c.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {(familyDetails?.members?.length > 0 || familyDetails?.images?.length > 0) && (
        <Section title="Family details">
          {familyDetails.members?.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {familyDetails.members.map((fm) => (
                <div key={fm._id} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <img
                    src={fm.image?.url || "https://placehold.co/48x48?text=👤"}
                    alt={fm.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-slate-700">{fm.name}</p>
                    <p className="text-slate-500">{fm.relation} {fm.age ? `• ${fm.age} yrs` : ""}</p>
                    {fm.occupation && <p className="text-xs text-slate-400">{fm.occupation}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {familyDetails.images?.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Family images</p>
              <div className="flex flex-wrap gap-3">
                {familyDetails.images.map((img) => (
                  <img key={img.publicId} src={img.url} alt="Family" className="h-20 w-20 rounded-lg object-cover" />
                ))}
              </div>
            </div>
          )}
        </Section>
      )}
    </div>
  );
};

export default MemberDetailsPage;

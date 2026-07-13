import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useGetTeamMemberByIdQuery } from "../api/teamApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
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

const TeamDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: teamMember, isFetching, isError, error } = useGetTeamMemberByIdQuery(id);

  if (isFetching) return <Loader label="Loading team member details..." />;
  if (isError || !teamMember) {
    return <EmptyState title="Team member not found" description={getErrorMessage(error, "This team member may have been removed")} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
            <ArrowLeft size={16} /> Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-yellow-500">{teamMember.fullName}</h1>
            <p className="text-sm text-slate-500">Team member profile shown on the public /team page</p>
          </div>
        </div>
{/* 
        <Link to={`/admin/team/${id}/edit`}>
          <Button variant="primary">
            <Pencil size={16} /> Edit team member
          </Button>
        </Link> */}
      </div>

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={teamMember.profileImage || "https://placehold.co/96x96?text=👤"}
              alt={teamMember.fullName}
              className="h-28 w-28 rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-semibold text-slate-900">{teamMember.fullName}</p>
              <p className="text-sm text-slate-500">{teamMember.designation || teamMember.occupation || "Team member"}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge color="yellow">{teamMember.tier}</Badge>
            <Badge color={teamMember.isActive ? "green" : "slate"}>{teamMember.isActive ? "Active" : "Inactive"}</Badge>
          </div>
        </div>

        <Section title="Details">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoRow label="Designation" value={teamMember.designation} />
            <InfoRow label="Phone" value={teamMember.phone} />
            <InfoRow label="Email" value={teamMember.email} />
            <InfoRow label="Occupation" value={teamMember.occupation} />
            <InfoRow label="City" value={teamMember.city} />
            <InfoRow label="State" value={teamMember.state} />
            <InfoRow label="Country" value={teamMember.country} />
          </div>

          {teamMember.additionalInfo && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Additional information</p>
              <p className="whitespace-pre-wrap text-sm text-slate-700">{teamMember.additionalInfo}</p>
            </div>
          )}
        </Section>
      </div>
    </div>
  );
};

export default TeamDetailsPage;

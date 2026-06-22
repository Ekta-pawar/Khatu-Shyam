import { useMemo, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Handshake,
  ArrowUpRight,
  Crown,
  Medal,
  Award,
  Gem,
  Check,
  X as XIcon,
  Clock,
  ChevronDown,
  LayoutGrid,
  List,
  Search,
} from "lucide-react";
import { useGetSponsorsQuery } from "../api/sponsorApi";

/* ---------- tier system ---------- */

const TIER_CONFIG = {
  platinum: { icon: Gem, rail: "bg-slate-400", dot: "bg-slate-400", pill: "bg-slate-100 text-slate-700 ring-slate-300", iconColor: "text-slate-500" },
  gold: { icon: Crown, rail: "bg-amber-400", dot: "bg-amber-400", pill: "bg-amber-50 text-amber-700 ring-amber-600/20", iconColor: "text-amber-500" },
  silver: { icon: Award, rail: "bg-slate-300", dot: "bg-slate-300", pill: "bg-slate-50 text-slate-600 ring-slate-300", iconColor: "text-slate-400" },
  bronze: { icon: Medal, rail: "bg-orange-400", dot: "bg-orange-400", pill: "bg-orange-50 text-orange-700 ring-orange-600/20", iconColor: "text-orange-500" },
};

const DEFAULT_TIER = { icon: Handshake, rail: "bg-indigo-400", dot: "bg-indigo-400", pill: "bg-indigo-50 text-indigo-700 ring-indigo-600/20", iconColor: "text-indigo-500" };

const getTierConfig = (sponsor) => TIER_CONFIG[sponsor.sponsorTier?.toLowerCase()] || DEFAULT_TIER;

/* ---------- status system ---------- */

const STATUS_COLUMNS = [
  { key: "pending", label: "Pending review", dot: "bg-amber-500", headerText: "text-amber-700" },
  { key: "approved", label: "Approved", dot: "bg-emerald-500", headerText: "text-emerald-700" },
  { key: "rejected", label: "Rejected", dot: "bg-rose-500", headerText: "text-rose-700" },
];

const STATUS_PILL = {
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

const STATUS_LABEL = {
  pending: "Pending review",
  approved: "Approved",
  rejected: "Rejected",
};

const getStatusKey = (sponsor) => {
  const s = sponsor.status?.toLowerCase();
  return s === "approved" || s === "rejected" ? s : "pending";
};

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

/* ---------- small components ---------- */

const TierBadge = ({ tier }) => {
  const config = TIER_CONFIG[tier?.toLowerCase()] || DEFAULT_TIER;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${config.pill}`}>
      <Icon size={10} className={config.iconColor} strokeWidth={2.5} />
      {tier || "Unranked"}
    </span>
  );
};

const StatusPill = ({ statusKey }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${STATUS_PILL[statusKey]}`}>
    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_COLUMNS.find((c) => c.key === statusKey).dot}`} />
    {STATUS_LABEL[statusKey]}
  </span>
);

/* ---------- view toggle ---------- */

const ViewToggle = ({ view, onChange }) => (
  <div className="flex shrink-0 items-center rounded-lg border border-slate-200 bg-slate-50/80 p-0.5">
    <button
      type="button"
      onClick={() => onChange("kanban")}
      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
        view === "kanban" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
      }`}
      aria-pressed={view === "kanban"}
      title="Kanban view"
    >
      <LayoutGrid size={14} /> Kanban
    </button>
    <button
      type="button"
      onClick={() => onChange("list")}
      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
        view === "list" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
      }`}
      aria-pressed={view === "list"}
      title="List view"
    >
      <List size={14} /> List
    </button>
  </div>
);

/* ---------- sponsor card (kanban) ---------- */

const SponsorCard = ({ sponsor, statusKey, onStatusChange, expanded, onToggleExpand }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        {sponsor.logo ? (
          <img src={sponsor.logo} alt={sponsor.sponsorName} className="h-9 w-9 shrink-0 rounded-lg border border-slate-200 object-cover" />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-semibold text-indigo-600">
            {initials(sponsor.sponsorName) || "?"}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">{sponsor.sponsorName || "Unknown sponsor"}</p>
          <p className="truncate text-xs text-slate-500">{sponsor.sponsorType || "Not specified"}</p>
        </div>
        <button
          onClick={() => onToggleExpand(sponsor._id)}
          className="shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          aria-label={expanded ? "Collapse details" : "Expand details"}
        >
          <ChevronDown size={15} className={`transition-transform duration-150 ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        <TierBadge tier={sponsor.sponsorTier} />
        {sponsor.city && (
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
            <MapPin size={10} /> {sponsor.city}
          </span>
        )}
      </div>

      {expanded && (
        <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
          {sponsor.contactPerson && <p className="font-medium text-slate-700">{sponsor.contactPerson}</p>}
          {sponsor.phone && (
            <p className="flex items-center gap-1.5 font-mono">
              <Phone size={11} className="text-slate-400" /> {sponsor.phone}
            </p>
          )}
          {sponsor.email && (
            <p className="flex items-center gap-1.5 truncate">
              <Mail size={11} className="shrink-0 text-slate-400" /> {sponsor.email}
            </p>
          )}
          {sponsor.website && (
            <a
              href={sponsor.website.startsWith("http") ? sponsor.website : `https://${sponsor.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-indigo-600 hover:underline"
            >
              <Globe size={11} /> Visit website <ArrowUpRight size={10} />
            </a>
          )}
          {sponsor.createdAt && (
            <p className="flex items-center gap-1.5 text-slate-400">
              <Calendar size={11} />
              {new Date(sponsor.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          )}
          {sponsor.message && (
            <p className="rounded-lg bg-slate-50 p-2 leading-relaxed text-slate-600">{sponsor.message}</p>
          )}
        </div>
      )}

      <div className="mt-3 flex gap-1.5 border-t border-slate-100 pt-3">
        {statusKey !== "approved" && (
          <button
            onClick={() => onStatusChange(sponsor._id, "approved")}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-emerald-50 px-2 py-1.5 text-[11px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            <Check size={12} /> Approve
          </button>
        )}
        {statusKey !== "rejected" && (
          <button
            onClick={() => onStatusChange(sponsor._id, "rejected")}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-rose-50 px-2 py-1.5 text-[11px] font-semibold text-rose-700 transition-colors hover:bg-rose-100"
          >
            <XIcon size={12} /> Reject
          </button>
        )}
        {statusKey !== "pending" && (
          <button
            onClick={() => onStatusChange(sponsor._id, "pending")}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-slate-100 px-2 py-1.5 text-[11px] font-semibold text-slate-600 transition-colors hover:bg-slate-200"
          >
            <Clock size={12} /> Reset
          </button>
        )}
      </div>
    </div>
  );
};

/* ---------- list / table view ----------
   No horizontal scroll: table-layout fixed with explicit column widths,
   and lower-priority columns (Website, Submitted) hide on narrower screens
   instead of forcing the table to overflow. */

const SponsorListView = ({ sponsors, effectiveStatus }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    {/* desktop / tablet table */}
    <div className="hidden md:block">
      <table className="w-full table-fixed divide-y divide-slate-200 text-sm">
        <colgroup>
          <col className="w-[26%]" />
          <col className="w-[12%]" />
          <col className="w-[14%]" />
          <col className="w-[22%]" />
          <col className="w-[14%]" />
          <col className="hidden w-[12%] lg:table-column" />
        </colgroup>
        <thead className="bg-slate-50/80">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Sponsor</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Tier</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Contact</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Location</th>
            <th className="hidden px-4 py-3 text-left font-semibold text-slate-600 lg:table-cell">Submitted</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sponsors.map((sponsor) => {
            const tierConfig = getTierConfig(sponsor);
            const statusKey = effectiveStatus(sponsor);
            return (
              <tr key={sponsor._id} className="group relative transition-colors hover:bg-slate-50">
                <td className="relative px-4 py-3">
                  <span className={`absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full ${tierConfig.rail}`} />
                  <div className="flex items-center gap-2.5">
                    {sponsor.logo ? (
                      <img src={sponsor.logo} alt={sponsor.sponsorName} className="h-9 w-9 shrink-0 rounded-lg border border-slate-200 object-cover" />
                    ) : (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-semibold text-indigo-600 ring-1 ring-slate-200">
                        {initials(sponsor.sponsorName) || "?"}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900">{sponsor.sponsorName || "Unknown sponsor"}</p>
                      <p className="truncate text-xs text-slate-500">{sponsor.sponsorType || "Not specified"}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <TierBadge tier={sponsor.sponsorTier} />
                </td>
                <td className="px-4 py-3">
                  <StatusPill statusKey={statusKey} />
                </td>
                <td className="px-4 py-3">
                  <p className="truncate text-slate-700">{sponsor.contactPerson || "-"}</p>
                  <div className="mt-0.5 flex flex-col gap-0.5 text-xs text-slate-500">
                    {sponsor.phone && (
                      <span className="inline-flex items-center gap-1 truncate font-mono">
                        <Phone size={11} className="shrink-0" /> {sponsor.phone}
                      </span>
                    )}
                    {sponsor.email && (
                      <span className="inline-flex items-center gap-1 truncate">
                        <Mail size={11} className="shrink-0" /> {sponsor.email}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  <span className="inline-flex items-center gap-1 truncate">
                    <MapPin size={12} className="shrink-0 text-slate-400" />
                    <span className="truncate">{[sponsor.city, sponsor.state].filter(Boolean).join(", ") || "-"}</span>
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-slate-600 lg:table-cell">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} className="shrink-0 text-slate-400" />
                    {sponsor.createdAt
                      ? new Date(sponsor.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
                      : "-"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* mobile cards */}
    <div className="space-y-3 p-4 md:hidden">
      {sponsors.map((sponsor) => {
        const tierConfig = getTierConfig(sponsor);
        const statusKey = effectiveStatus(sponsor);
        return (
          <div key={sponsor._id} className="relative overflow-hidden rounded-xl border border-slate-200 p-4">
            <span className={`absolute left-0 top-0 h-full w-1 ${tierConfig.rail}`} />
            <div className="flex items-start justify-between gap-3 pl-2">
              <div className="flex items-center gap-3">
                {sponsor.logo ? (
                  <img src={sponsor.logo} alt={sponsor.sponsorName} className="h-11 w-11 rounded-lg border border-slate-200 object-cover" />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-xs font-semibold text-indigo-600 ring-1 ring-slate-200">
                    {initials(sponsor.sponsorName) || "?"}
                  </div>
                )}
                <div>
                  <p className="font-medium text-slate-900">{sponsor.sponsorName || "Unknown sponsor"}</p>
                  <p className="text-xs text-slate-500">{sponsor.sponsorType || "Not specified"}</p>
                </div>
              </div>
              <StatusPill statusKey={statusKey} />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 pl-2">
              <TierBadge tier={sponsor.sponsorTier} />
              {sponsor.phone && (
                <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-500">
                  <Phone size={11} /> {sponsor.phone}
                </span>
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 pl-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <MapPin size={11} />
                {[sponsor.city, sponsor.state].filter(Boolean).join(", ") || "-"}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar size={11} />
                {sponsor.createdAt
                  ? new Date(sponsor.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                  : "-"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

/* ---------- kanban view ---------- */

const SponsorKanbanView = ({ sponsors, effectiveStatus, expandedId, onToggleExpand, onStatusChange }) => (
  <div className="grid gap-4 sm:grid-cols-3">
    {STATUS_COLUMNS.map((col) => {
      const colSponsors = sponsors.filter((s) => effectiveStatus(s) === col.key);
      return (
        <div key={col.key} className="rounded-2xl bg-slate-50 p-3">
          <div className="mb-3 flex items-center gap-2 px-1">
            <span className={`h-2 w-2 rounded-full ${col.dot}`} />
            <h2 className={`text-sm font-semibold ${col.headerText}`}>{col.label}</h2>
            <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-500">
              {colSponsors.length}
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {colSponsors.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 px-3 py-8 text-center text-xs text-slate-400">
                No sponsors here
              </div>
            ) : (
              colSponsors.map((sponsor) => (
                <SponsorCard
                  key={sponsor._id}
                  sponsor={sponsor}
                  statusKey={col.key}
                  onStatusChange={onStatusChange}
                  expanded={expandedId === sponsor._id}
                  onToggleExpand={onToggleExpand}
                />
              ))
            )}
          </div>
        </div>
      );
    })}
  </div>
);

/* ---------- page ---------- */

const SponsorManagementPage = () => {
  const { data: sponsors = [], isLoading, error } = useGetSponsorsQuery();
  const [view, setView] = useState("kanban");
  const [expandedId, setExpandedId] = useState(null);
  const [localStatus, setLocalStatus] = useState({});
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const handleToggleExpand = (id) => setExpandedId((prev) => (prev === id ? null : id));

  const handleStatusChange = (id, newStatus) => {
    setLocalStatus((prev) => ({ ...prev, [id]: newStatus }));
    // TODO: wire to an actual update-sponsor-status mutation here
  };

  const effectiveStatus = (sponsor) => localStatus[sponsor._id] || getStatusKey(sponsor);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setAppliedSearch(search.trim().toLowerCase());
  };

  const filteredSponsors = useMemo(() => {
    if (!appliedSearch) return sponsors;
    return sponsors.filter((s) => {
      const haystack = [s.sponsorName, s.sponsorType, s.contactPerson, s.email, s.phone, s.city, s.state]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(appliedSearch);
    });
  }, [sponsors, appliedSearch]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />
          <Handshake size={16} className="absolute inset-0 m-auto text-indigo-400" />
        </div>
        <p className="text-sm font-medium text-slate-500">Loading sponsors…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-rose-700">Failed to load sponsors</h2>
        <p className="mt-2 text-sm text-rose-600">Check the backend route and API URL, then try again.</p>
      </div>
    );
  }

  const statusCounts = sponsors.reduce(
    (acc, s) => {
      const key = effectiveStatus(s);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    { pending: 0, approved: 0, rejected: 0 }
  );

  return (
    <div className="space-y-6">
      {/* ---------- Flat header (no card box) ---------- */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <Handshake size={20} className="text-slate-900" />
            <h1 className="text-xl font-medium tracking-tight text-slate-900 sm:text-2xl">Sponsor management</h1>
          </div>
          <p className="mt-1 text-sm text-slate-500">Review sponsor requests and move them through approval.</p>
        </div>

        <div className="flex gap-6 text-right">
          <div>
            <p className="text-xl font-medium tabular-nums text-slate-900">{sponsors.length}</p>
            <p className="text-[11px] text-slate-400">total</p>
          </div>
          <div>
            <p className="text-xl font-medium tabular-nums text-amber-600">{statusCounts.pending}</p>
            <p className="text-[11px] text-slate-400">pending</p>
          </div>
          <div>
            <p className="text-xl font-medium tabular-nums text-emerald-600">{statusCounts.approved}</p>
            <p className="text-[11px] text-slate-400">approved</p>
          </div>
          <div>
            <p className="text-xl font-medium tabular-nums text-rose-600">{statusCounts.rejected}</p>
            <p className="text-[11px] text-slate-400">rejected</p>
          </div>
        </div>
      </div>

      {/* ---------- Search row: input -> search button -> view toggle ---------- */}
      <div className="rounded-2xl border border-yellow-100 bg-white p-2 shadow-sm sm:p-5">
        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sponsors by name, contact, email, or city…"
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pl-9 text-sm text-slate-800 placeholder:text-slate-400 transition-colors duration-150 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            <Search size={15} /> Search
          </button>

          <ViewToggle view={view} onChange={setView} />
        </form>

        {appliedSearch && (
          <p className="mt-3 text-xs text-slate-500">
            Showing results for <span className="font-medium text-slate-700">"{appliedSearch}"</span> ·{" "}
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setAppliedSearch("");
              }}
              className="text-indigo-600 hover:underline"
            >
              clear
            </button>
          </p>
        )}
      </div>

      {/* ---------- Empty state ---------- */}
      {filteredSponsors.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center sm:p-16">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
            <Handshake size={22} className="text-indigo-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-800">
            {sponsors.length === 0 ? "No sponsors found" : "No sponsors match your search"}
          </h3>
          <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-500">
            {sponsors.length === 0
              ? "Sponsor requests submitted from the website will appear here as soon as they come in."
              : "Try a different search term, or clear the search to see everyone."}
          </p>
        </div>
      )}

      {/* ---------- Board / List ---------- */}
      {filteredSponsors.length > 0 &&
        (view === "kanban" ? (
          <SponsorKanbanView
            sponsors={filteredSponsors}
            effectiveStatus={effectiveStatus}
            expandedId={expandedId}
            onToggleExpand={handleToggleExpand}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <SponsorListView sponsors={filteredSponsors} effectiveStatus={effectiveStatus} />
        ))}
    </div>
  );
};

export default SponsorManagementPage;
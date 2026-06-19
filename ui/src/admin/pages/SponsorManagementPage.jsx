import React from "react";
import {
  Building2,
  Mail,
  Phone,
  User,
  MapPin,
  Globe,
  FileText,
  Calendar,
  Handshake,
} from "lucide-react";
import { useGetSponsorsQuery } from "../api/sponsorApi";

/* ---------- helpers ---------- */

const tierStyles = {
  platinum: "bg-slate-100 text-slate-700 ring-slate-300",
  gold: "bg-amber-50 text-amber-700 ring-amber-600/20",
  silver: "bg-slate-50 text-slate-600 ring-slate-300",
  bronze: "bg-orange-50 text-orange-700 ring-orange-600/20",
};

const TierPill = ({ tier }) => {
  const key = tier?.toLowerCase();
  const cls = tierStyles[key] || "bg-indigo-50 text-indigo-700 ring-indigo-600/20";
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${cls}`}>
      {tier || "Unranked"}
    </span>
  );
};

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const DetailRow = ({ icon: Icon, label, value, mono = false, link = false }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
      <Icon size={15} />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      {link && value && value !== "-" ? (
        <a
          href={value.startsWith("http") ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`break-words text-sm font-medium text-indigo-600 hover:underline ${mono ? "font-mono" : ""}`}
        >
          {value}
        </a>
      ) : (
        <p className={`break-words text-sm font-medium text-slate-700 ${mono ? "font-mono" : ""}`}>{value}</p>
      )}
    </div>
  </div>
);

/* ---------- page ---------- */

const SponsorManagementPage = () => {
  const {
    data: sponsors = [],
    isLoading,
    error,
  } = useGetSponsorsQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />
        <p className="text-sm font-medium text-slate-500">Loading sponsors…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-rose-700">Failed to load sponsors</h2>
        <p className="mt-2 text-sm text-rose-600">
          Check the backend route and API URL, then try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Sponsor Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            All sponsor requests submitted from the website.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
          <Handshake size={16} className="text-indigo-600" />
          <span className="text-sm font-semibold text-slate-700">
            {sponsors.length} {sponsors.length === 1 ? "request" : "requests"}
          </span>
        </div>
      </div>

      {/* Empty State */}
      {sponsors.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm sm:p-16">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <Handshake size={20} className="text-slate-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-800">No sponsors found</h3>
          <p className="mt-1.5 text-sm text-slate-500">
            Sponsor requests submitted from the website will appear here.
          </p>
        </div>
      )}

      {/* Sponsor Cards */}
      <div className="grid gap-5">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor._id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Top Section */}
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-center gap-4">
                {sponsor.logo ? (
                  <img
                    src={sponsor.logo}
                    alt={sponsor.sponsorName}
                    className="h-14 w-14 shrink-0 rounded-xl border border-slate-200 object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-base font-bold text-indigo-600">
                    {initials(sponsor.sponsorName) || "?"}
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                    {sponsor.sponsorName || "Unknown Sponsor"}
                  </h2>
                  <p className="text-sm text-slate-500">{sponsor.sponsorType || "Not specified"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1.5">
                <TierPill tier={sponsor.sponsorTier} />
                <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                  Pending review
                </span>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
              <DetailRow icon={User} label="Contact person" value={sponsor.contactPerson || "-"} />
              <DetailRow icon={Phone} label="Phone" value={sponsor.phone || "-"} mono />
              <DetailRow icon={Mail} label="Email" value={sponsor.email || "-"} />
              <DetailRow
                icon={MapPin}
                label="Location"
                value={[sponsor.city, sponsor.state].filter(Boolean).join(", ") || "-"}
              />
              <DetailRow icon={Globe} label="Website" value={sponsor.website || "-"} link />
              <DetailRow icon={FileText} label="GSTIN" value={sponsor.gstin || "-"} mono />
              <DetailRow
                icon={Calendar}
                label="Submitted"
                value={
                  sponsor.createdAt
                    ? new Date(sponsor.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "-"
                }
              />
              <DetailRow icon={Building2} label="Tier" value={sponsor.sponsorTier || "-"} />
            </div>

            {/* Address & Message */}
            <div className="grid gap-3 px-5 pb-5 sm:grid-cols-2 sm:px-6 sm:pb-6">
              <div className="rounded-xl bg-slate-50 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Address</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {sponsor.address || "No address provided"}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Message</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {sponsor.message || "No message provided"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorManagementPage;
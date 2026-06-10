import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageShell, PageHeader } from "../components/PageShell";
import { members, tierLabel } from "../data/members";
import { MapPin, CalendarDays, Star, Diamond, Users, ArrowRight } from "lucide-react";

const FILTERS = [
  { key: "all", label: "All Members", icon: Users },
  { key: "golden", label: "Golden", icon: Star },
  { key: "Diamond", label: "Diamond", icon: Diamond },
  { key: "KaryaKarani", label: "KaryaKarani", icon: Users },
];

const tierStyle = {
  golden: {
    badge: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    ring: "ring-yellow-400",
  },
  Diamond: {
    badge: "bg-blue-100 text-blue-700 border border-blue-300",
    ring: "ring-blue-400",
  },
  KaryaKarani: {
    badge: "bg-red-100 text-red-700 border border-red-200",
    ring: "ring-red-400",
  },
};

function MembersPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? members
      : members.filter((m) => m.tier === activeFilter);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Hamare Sadasya"
        title="Our Members"
        subtitle="Meet the dedicated devotees who power every seva, yatra, and mahotsav of our samiti."
      />

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 px-5 pb-4 pt-2">
        {FILTERS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
              activeFilter === key
                ? "bg-maroon text-white shadow-lg"
                : "border border-gray-300 bg-white text-gray-600 hover:border-maroon hover:text-maroon"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-center text-sm text-muted-foreground pb-2">
        Showing <span className="font-semibold text-maroon">{filtered.length}</span> member{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((member) => {
            const style = tierStyle[member.tier] || tierStyle.golden;
            return (
              <Link
                key={member.id}
                to={`/team/${member.id}`}
                className={`group flex flex-col overflow-hidden rounded-3xl bg-card shadow-elegant transition-transform hover:-translate-y-1 ring-2 ring-transparent hover:${style.ring}`}
              >
                {/* Photo */}
                <div className="relative overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-56 w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {/* Tier badge on image */}
                  <span
                    className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style.badge}`}
                  >
                    {tierLabel[member.tier]}
                  </span>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-saffron">
                    {member.title}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-maroon leading-snug">
                    {member.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {member.contribution}
                  </p>

                  <div className="mt-auto pt-4 flex flex-col gap-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} className="shrink-0" />
                      {member.city}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={12} className="shrink-0" />
                      Member since {member.joinedYear}
                    </span>
                  </div>

                  <p className="mt-4 flex items-center gap-1 text-xs font-medium text-maroon group-hover:text-saffron transition-colors">
                    View Profile <ArrowRight size={13} />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}

export default MembersPage;

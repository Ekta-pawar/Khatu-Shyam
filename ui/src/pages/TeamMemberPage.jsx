import React from "react";
import {
  Link,
  useParams,
  Navigate,
} from "react-router-dom";

import { PageShell } from "../components/PageShell";

import {
  getMember,
  tierLabel,
} from "../data/members";

import {
  ArrowLeft,
  Briefcase,
  Cake,
  Gift,
  MapPin,
  Users,
} from "lucide-react";
function TeamMemberPage() {
  const { memberId } = useParams();

  const member = getMember(memberId);

  if (!member) {
    return <Navigate to="/team" replace />;
  }

  return (
    <PageShell>      <section className="relative border-b border-border/60 bg-secondary/40">
      
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-5 md:grid-cols-[1fr_1.3fr] md:items-end">

          <div>
            <img
              src={member.photo}
              alt={member.name}
              className="aspect-[4/5] w-full rounded-3xl object-cover"
            />
          </div>

          <div>
            

            <span
              className={`inline-block rounded-full px-3 py-1 text-xs ${
                member.tier === "golden"
                  ? "bg-yellow-500 text-black"
                  : "bg-white"
              }`}
            >
              {tierLabel[member.tier]}
            </span>

            <h1 className="mt-4 text-5xl text-maroon">
              {member.name}
            </h1>

            <p className="mt-3 text-lg text-saffron">
              {member.title}
            </p>

            <p className="mt-6 text-muted-foreground">
              {member.bio}
            </p>
            
                        <div className="mt-8 grid grid-cols-2 gap-4">

              <Stat
                icon={Cake}
                label="Birthday"
                value={member.birthday}
              />

              <Stat
                icon={MapPin}
                label="Based In"
                value={member.city}
              />

              <Stat
                icon={Gift}
                label="Joined"
                value={member.joinedYear}
              />

              <Stat
                icon={Users}
                label="Contribution"
                value={member.contribution}
              />

            </div>
          </div>
        </div>
      </section>
            <section className="mx-auto max-w-7xl px-5 py-20">

        <div className="mb-3 flex items-center gap-3">
          <Briefcase
            className="text-saffron"
            size={20}
          />

          <p className="text-xs uppercase tracking-widest text-saffron">
            Profession
          </p>
        </div>

        <h2 className="text-4xl text-maroon">
          {member.business.company}
        </h2>

        <p className="mt-2 text-lg text-muted-foreground">
          {member.business.position}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <InfoCard
            label="Experience"
            value={member.business.experience}
          />

          <InfoCard
            label="Industry"
            value={member.business.industry}
          />

          <InfoCard
            label="Products & Services"
            value={member.business.productsOrServices}
          />

        </div>

        <div className="mt-8 rounded-3xl border bg-card p-8">
          <h3 className="text-xl text-maroon">
            About The Company
          </h3>

          <p className="mt-3 text-muted-foreground">
            {member.business.about}
          </p>
        </div>
      </section>
               <section className="border-t border-border/60 bg-secondary/40 py-20">

        <div className="mx-auto max-w-7xl px-5">

          <div className="mb-3 flex items-center gap-3">
            <Users
              className="text-saffron"
              size={20}
            />

            <p className="text-xs uppercase tracking-widest text-saffron">
              Family
            </p>
          </div>

          <h2 className="text-4xl text-maroon">
            Family Members
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {member.family.map((person) => (
              <div
                key={person.name}
                className="rounded-2xl bg-card p-6 shadow"
              >
                <p className="text-xs text-saffron">
                  {person.relation}
                </p>

                <h3 className="mt-1 text-xl text-maroon">
                  {person.name}
                </h3>

                {person.birthday && (
                  <p className="mt-3 flex items-center gap-2 text-sm">
                    <Cake size={14} />
                    {person.birthday}
                  </p>
                )}

                {person.occupation && (
                  <p className="mt-2 flex items-center gap-2 text-sm">
                    <Briefcase size={14} />
                    {person.occupation}
                  </p>
                )}
              </div>
            ))}

          </div>
        </div>
      </section>

    </PageShell>
  );
}   
           

            function Stat({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 text-xs text-saffron">
        <Icon size={12} />
        {label}
      </div>

      <p className="mt-2 text-sm">
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <p className="text-xs uppercase text-saffron">
        {label}
      </p>

      <p className="mt-2 text-sm">
        {value}
      </p>
    </div>
  );
}

export default TeamMemberPage;
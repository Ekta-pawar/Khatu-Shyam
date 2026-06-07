import React from "react";
import { Link } from "react-router-dom";
import { PageShell, PageHeader } from "../components/PageShell";
import {
  members,
  tierLabel,
} from "../data/members";
import { ArrowRight } from "lucide-react";

const tierOrder = [
  "golden",
  "silver",
  "bronze",
];

function TeamPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Hamari Team"
        title="Our Team & Patrons"
        subtitle="Three categories of members shape our samiti — Golden patrons whose lifelong seva built this sangat, and Silver & Bronze members carrying the work forward every day."
      />

      <section className="mx-auto max-w-7xl space-y-20 px-5 py-20">
        {tierOrder.map((tier) => {
          const tierMembers = members.filter(
            (m) => m.tier === tier
          );

          if (!tierMembers.length) return null;

          return (
            <div key={tier}>
              <div className="mb-10 flex items-center gap-4">
                <span className="h-px flex-1 bg-gray-300" />

                <h2 className="whitespace-nowrap text-3xl text-maroon md:text-4xl">
                  {tierLabel[tier]}
                  {tierMembers.length > 1 ? "s" : ""}
                </h2>

                <span className="h-px flex-1 bg-gray-300" />
              </div>

              <div
                className={`grid gap-8 ${
                  tier === "golden"
                    ? "mx-auto max-w-3xl md:grid-cols-1"
                    : "md:grid-cols-2"
                }`}
              >
                {tierMembers.map((member) => (
                  <Link
                    key={member.id}
                    to={`/team/${member.id}`}
                    className={`group grid gap-6 rounded-3xl bg-card p-6 shadow-elegant transition-transform hover:-translate-y-1 ${
                      tier === "golden"
                        ? "md:grid-cols-[1fr_1.3fr] md:p-8"
                        : "sm:grid-cols-[140px_1fr]"
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <p className="text-xs uppercase tracking-[0.3em] text-saffron">
                        {member.title}
                      </p>

                      <h3 className="mt-2 text-2xl text-maroon md:text-3xl">
                        {member.name}
                      </h3>

                      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                        {member.bio}
                      </p>

                      <p className="mt-4 text-xs text-muted-foreground">
                        {member.city} · Member since{" "}
                        {member.joinedYear}
                      </p>

                      <p className="mt-5 inline-flex items-center gap-1 text-sm text-maroon group-hover:text-saffron">
                        View Full Profile
                        <ArrowRight size={14} />
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </PageShell>
  );
}

export default TeamPage;
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { Briefcase, Cake, Gift, Mail, MapPin, Phone, Users } from "lucide-react";

import { PageShell } from "../components/PageShell";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1604608672516-6a2f51c8d97f?auto=format&fit=crop&w=900&q=80";

function formatTierLabel(tier) {
  if (!tier) return "Member";

  return tier
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function TeamMemberPage() {
  const { memberId, id } = useParams();
  const activeMemberId = memberId || id;
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await axios.get(`${API_BASE}/members/${activeMemberId}`);
        setMember(res.data.member || res.data.data || null);
      } catch (err) {
        try {
          const listRes = await axios.get(`${API_BASE}/members`);
          const members = listRes.data.members || listRes.data.data || [];
          const foundMember = members.find((item) => item._id === activeMemberId);

          if (foundMember) {
            setMember(foundMember);
          } else {
            setError(true);
          }
        } catch (listErr) {
          console.error("Error fetching member:", listErr);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    if (activeMemberId) {
      fetchMember();
    }
  }, [activeMemberId]);

  if (loading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-7xl px-5 py-20 text-center">
          <h1 className="text-3xl text-maroon">Loading member...</h1>
        </div>
      </PageShell>
    );
  }

  if (error || !member) {
    return <Navigate to="/team" replace />;
  }

  const location = [member.city, member.state].filter(Boolean).join(", ");
  const business = member.businessDetails || {};
  const job = member.jobDetails || {};
  const familyMembers = member.familyMembers || [];
  const memberImage = member.profileImage || FALLBACK_IMAGE;
  const tier = formatTierLabel(member.tier);
  const professionTitle =
    business.businessName || job.companyName || member.occupation || "Professional details";
  const professionSubtitle =
    business.businessType || job.designation || job.jobType || member.occupation;

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-border/60 bg-secondary/40">
        <div className="absolute inset-0 bg-glow opacity-60" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-10 md:grid-cols-[0.9fr_1.25fr] md:items-end lg:py-14">
          <div className="overflow-hidden rounded-3xl border border-white/70 bg-card shadow-elegant">
            <img
              src={memberImage}
              alt={member.fullName}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="pb-2">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                tier.toLowerCase().includes("golden")
                  ? "bg-yellow-500 text-black"
                  : tier.toLowerCase().includes("diamond")
                  ? "bg-sky-600 text-white"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {tier}
            </span>

            <h1 className="mt-4 text-4xl text-maroon sm:text-5xl lg:text-6xl">
              {member.fullName}
            </h1>

            {(professionSubtitle || member.fatherName) && (
              <p className="mt-3 text-lg text-saffron">
                {professionSubtitle || `S/o ${member.fatherName}`}
              </p>
            )}

            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              {member.address ||
                "A valued member of Shyam Samiti, contributing to the community with devotion and service."}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <Stat icon={Cake} label="Birthday" value={formatDate(member.birthday)} />
              <Stat icon={MapPin} label="Based In" value={location || "-"} />
              <Stat icon={Gift} label="Joined" value={formatDate(member.createdAt)} />
              <Stat icon={Users} label="Blood Group" value={member.bloodGroup} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-3 flex items-center gap-3">
          <Briefcase className="text-saffron" size={20} />
          <p className="text-xs uppercase tracking-widest text-saffron">
            Profession
          </p>
        </div>

        <h2 className="text-4xl text-maroon">{professionTitle}</h2>

        {professionSubtitle && (
          <p className="mt-2 text-lg text-muted-foreground">
            {professionSubtitle}
          </p>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <InfoCard label="Business Address" value={business.businessAddress || job.officeAddress || job.jobLocation} />
          <InfoCard label="Phone" value={business.businessPhone || member.phone} icon={Phone} />
          <InfoCard label="Email" value={business.businessEmail || member.email} icon={Mail} />
        </div>

        {(business.businessDescription || job.otherDetails) && (
          <div className="mt-8 rounded-3xl border bg-card p-8">
            <h3 className="text-xl text-maroon">About The Profession</h3>
            <p className="mt-3 text-muted-foreground">
              {business.businessDescription || job.otherDetails}
            </p>
          </div>
        )}

        {business.businessWebsite && (
          <a
            href={business.businessWebsite}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-maroon px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-maroon/90"
          >
            Visit Website
          </a>
        )}
      </section>

      <section className="border-t border-border/60 bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-3 flex items-center gap-3">
            <Users className="text-saffron" size={20} />
            <p className="text-xs uppercase tracking-widest text-saffron">
              Family
            </p>
          </div>

          <h2 className="text-4xl text-maroon">Family Members</h2>

          {familyMembers.length > 0 ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {familyMembers.map((person) => (
                <div
                  key={`${person.name}-${person.relation}`}
                  className="rounded-2xl bg-card p-6 shadow"
                >
                  <p className="text-xs text-saffron">{person.relation}</p>

                  <h3 className="mt-1 text-xl text-maroon">{person.name}</h3>

                  {person.dob && (
                    <p className="mt-3 flex items-center gap-2 text-sm">
                      <Cake size={14} />
                      {formatDate(person.dob)}
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
          ) : (
            <p className="mt-6 text-muted-foreground">
              No family members added yet.
            </p>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 text-xs text-saffron">
        <Icon size={12} />
        {label}
      </div>

      <p className="mt-2 text-sm">{value || "-"}</p>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <p className="text-xs uppercase text-saffron">{label}</p>
      <p className="mt-2 text-sm">{value || "-"}</p>
    </div>
  );
}

export default TeamMemberPage;

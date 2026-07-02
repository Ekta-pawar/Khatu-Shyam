import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PageShell, PageHeader } from "../components/PageShell";
import { tierLabel } from "../data/members";
import { ArrowRight, Users, Star, Crown } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const tierOrder = [
  { id: "all", label: "All Members", icon: Users },
  { id: "golden", label: "Golden Members", icon: Crown },
  { id: "Diamond", label: "Diamond Members", icon: Star },
  { id: "KaryaKarani", label: "Karyakarani Members", icon: Users },
];

function TeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTier, setActiveTier] = useState("all");

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(`${API_BASE}/members`);
        setMembers(response.data.data || []);
      } catch (err) {
        console.error("Error fetching members:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers =
    activeTier === "all" ? members : members.filter((m) => m.tier === activeTier);

  if (loading) {
    return (
      <PageShell>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold">Loading Team...</h2>
        </div>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <div className="py-20 text-center">
          <h3 className="text-2xl font-semibold text-maroon">Could not load team members</h3>
          <p className="mt-2 text-muted-foreground">Please refresh the page or try again shortly.</p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="हमारी टीम"
        title="Our Team & Patrons"
        subtitle="तीन श्रेणियों के सदस्य हमारी समिति को आकार देते हैं — गोल्डन सदस्य जिनकी आजीवन सेवा ने इस संगत का निर्माण किया, और डायमंड एवं कार्यकारणी सदस्य जो हर दिन कार्य को आगे बढ़ाते हैं।"
      />

      <section className="mx-auto max-w-7xl px-5 py-12">
        {/* Filter Buttons - Responsive */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {tierOrder.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTier(id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeTier === id
                  ? id === "golden"
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-200"
                    : id === "Diamond"
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-blue-200"
                    : id === "KaryaKarani"
                    ? "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg shadow-orange-200"
                    : "bg-gradient-to-r from-maroon to-maroon/80 text-white shadow-lg"
                  : "border-2 border-gray-300 bg-white text-gray-600 hover:border-maroon hover:text-maroon"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Member Count */}
        <div className="mb-8 text-center">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-maroon">{filteredMembers.length}</span> members
          </p>
        </div>

        {/* Members Grid - Responsive: 2 columns on large, 1 on medium and small */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {filteredMembers.map((member) => (
            <Link
              key={member._id}
              to={`/team/${member._id}`}
              className="group grid gap-6 rounded-3xl bg-card p-6 shadow-elegant transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:grid-cols-[140px_1fr]"
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-col justify-center">
                {/* Tier Badge */}
                <div className="mb-2">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      member.tier === "golden"
                        ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black"
                        : member.tier === "Diamond"
                        ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white"
                        : "bg-gradient-to-r from-orange-400 to-red-500 text-white"
                    }`}
                  >
                    {tierLabel[member.tier]}
                  </span>
                </div>

                <p className="text-xs uppercase tracking-[0.3em] text-saffron">
                  {member.title}
                </p>

                <h3 className="mt-2 text-2xl text-maroon md:text-3xl">
                  {member.name}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <p className="text-xs text-muted-foreground">
                    📍 {member.city}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    📅 Joined {member.joinedYear}
                  </p>
                </div>

                <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-maroon transition-all group-hover:gap-2 group-hover:text-saffron">
                  View Full Profile
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Users size={40} className="text-gray-400" />
            </div>
            <p className="text-lg text-muted-foreground">No members found in this category.</p>
          </div>
        )}
      </section>
    </PageShell>
  );
}

export default TeamPage;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PageShell, PageHeader } from "../components/PageShell";
import { tierLabel } from "../data/members";
import { ArrowRight, Users, Star, Crown, MapPin, CalendarDays } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const tierOrder = [
  

  {
    id: "मुख्य कार्यकारिणी",
    label: "मुख्य कार्यकारिणी",
    icon: Crown,
  },
  {
    id: "प्रेरणा स्रोत",
    label: "प्रेरणा स्रोत",
    icon: Star,
  },
  {
    id: "कार्यकारिणी",
    label: "कार्यकारिणी सदस्य",
    icon: Users,
  },
  {
    id: "संरक्षक",
    label: "संरक्षक",
    icon: Crown,
  },
  {
    id: "सदस्य",
    label: "सदस्य",
    icon: Star,
  },


];

function TeamPage(){ 
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
          <h3 className="text-2xl font-semibold text-yellow-500">Could not load team members</h3>
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
        subtitle=""
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
                    ? "bg-linear-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-200"
                    : id === "Diamond"
                    ? "bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-blue-200"
                    : id === "KaryaKarani"
                    ? "bg-linear-to-r from-orange-400 to-red-500 text-white shadow-lg shadow-orange-200"
                    : "bg-linear-to-r from-yellow-200 to-yellow-500 text-white shadow-lg"
                  : "border-2 border-gray-300 bg-white text-gray-600 hover:border-yellow-400 hover:text-yellow-500"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Member Count */}
        {/* <div className="mb-8 text-center">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-yellow-500">{filteredMembers.length}</span> members
          </p>
        </div> */}

        {/* Members Grid - Responsive: 2 columns on large, 1 on medium and small */}
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {filteredMembers.map((member) => (
            <Link
              key={member._id}
              to={`/team/${member._id}`}
              className="group overflow-visible rounded-3xl bg-card shadow-elegant transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Tier Badge */}
                <span
                  className={`absolute -bottom-4 left-5 inline-block rounded-full px-4 py-1.5 text-xs font-semibold shadow-md ${
                    member.tier === "golden"
                      ? "bg-linear-to-r from-yellow-400 to-amber-500 text-black"
                      : member.tier === "Diamond"
                      ? "bg-linear-to-r from-sky-500 to-blue-600 text-white"
                      : "border border-yellow-400 bg-white text-yellow-700"
                  }`}
                >
                  {tierLabel[member.tier] || member.tier}
                </span>
              </div>

              <div className="flex flex-col px-6 pb-6 pt-8">
                <h3 className="text-xl font-bold text-yellow-600 md:text-2xl">
                  {member.name}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {member.title || "Member"}
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin size={13} /> {member.city}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays size={13} /> Joined {member.joinedYear}
                  </p>
                </div>

                <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-yellow-600 transition-all group-hover:gap-2 group-hover:text-yellow-500">
                  View Profile
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
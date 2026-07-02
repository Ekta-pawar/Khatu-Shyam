import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PageShell, PageHeader } from "../components/PageShell";
import {
  MapPin,
  CalendarDays,
  Star,
  Diamond,
  Users,
  ArrowRight,
} from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const FILTERS = [
  {
    key: "all",
    label: "All Members",
    icon: Users,
  },
  {
    key: "Golden Members",
    label: "Golden",
    icon: Star,
  },
  {
    key: "Diamond Members",
    label: "Diamond",
    icon: Diamond,
  },
  {
    key: "Karyakarani Members",
    label: "Karyakarani",
    icon: Users,
  },
];

const tierStyle = {
  "Golden Members": {
    badge: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  },
  "Diamond Members": {
    badge: "bg-blue-100 text-blue-700 border border-blue-300",
  },
  "Karyakarani Members": {
    badge: "bg-red-100 text-red-700 border border-red-300",
  },
};

function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${API_BASE}/members`);

        setMembers(response.data.members || []);
      } catch (err) {
        console.error("Error fetching members:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filtered =
    activeFilter === "all"
      ? members
      : members.filter((member) => member.tier === activeFilter);

  if (loading) {
    return (
      <PageShell>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold">
            Loading Members...
          </h2>
        </div>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold text-red-600">
            Failed to load members
          </h2>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Hamare Sadasya"
        title="Our Members"
        subtitle="Meet the dedicated devotees who support our samiti."
      />

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 px-5 py-4">
        {FILTERS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition ${
              activeFilter === key
                ? "bg-maroon text-white"
                : "bg-white border border-gray-300 hover:border-maroon"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-center text-sm text-gray-500 mb-6">
        Showing {filtered.length} member
        {filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Members Grid */}
      <section className="mx-auto max-w-7xl px-5 pb-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((member) => {
            const style =
              tierStyle[member.tier] ||
              tierStyle["Golden Members"];

            return (
              <Link
                key={member._id}
                to={`/team/${member._id}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-lg hover:-translate-y-1 transition"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={
                      member.profileImage ||
                      "https://via.placeholder.com/400x400?text=Member"
                    }
                    alt={member.fullName}
                    className="h-60 w-full object-cover"
                  />

                  <span
                    className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold ${style.badge}`}
                  >
                    {member.tier}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-maroon">
                    {member.fullName}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {member.fatherName
                      ? `S/O ${member.fatherName}`
                      : "Member"}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      {member.city}, {member.state}
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays size={14} />
                      Joined{" "}
                      {new Date(
                        member.createdAt
                      ).getFullYear()}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-maroon font-medium text-sm">
                    View Profile
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <Users
              size={50}
              className="mx-auto text-gray-400 mb-4"
            />
            <h3 className="text-lg text-gray-500">
              No members found
            </h3>
          </div>
        )}
      </section>
    </PageShell>
  );
}

export default MembersPage;
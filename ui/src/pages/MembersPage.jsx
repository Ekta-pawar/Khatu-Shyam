import { useEffect, useState } from "react";
import axios from "axios";
import { PageShell, PageHeader } from "../components/PageShell";
import MemberCardSkeleton from "../components/MemberCardSkeleton";
import { CalendarDays, Users } from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const formatDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  if (loading) {
    return (
      <PageShell>
        <PageHeader
          eyebrow="Hamare Sadasya"
          title="Our Guest"
          subtitle="Meet the devotees who have graced our events."
        />
        <section className="mx-auto max-w-7xl px-5 pb-10 pt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <MemberCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold text-red-600">
            Failed to load guests
          </h2>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Hamare Sadasya"
        title="Our Guest"
        subtitle="Meet the devotees who have graced our events."
      />

      <section className="mx-auto max-w-7xl px-5 pb-10 mt-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((guest) => (
            <div
              key={guest._id}
              className="overflow-hidden rounded-2xl bg-white shadow-lg"
            >
              <img
                src={
                  guest.profileImage ||
                  "https://via.placeholder.com/400x400?text=Guest"
                }
                alt={guest.fullName}
                className="h-60 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-bold text-yellow-500">
                  {guest.fullName}
                </h3>

                {guest.eventName && (
                  <p className="mt-1 text-sm text-gray-500">{guest.eventName}</p>
                )}

                {formatDate(guest.eventDate) && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays size={14} />
                    {formatDate(guest.eventDate)}
                  </div>
                )}

                {guest.additionalInfo && (
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {guest.additionalInfo}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {members.length === 0 && (
          <div className="py-20 text-center">
            <Users
              size={50}
              className="mx-auto text-gray-400 mb-4"
            />
            <h3 className="text-lg text-gray-500">
              No guests found
            </h3>
          </div>
        )}
      </section>
    </PageShell>
  );
}

export default MembersPage;

import { useEffect, useState } from "react";
import { PageShell, PageHeader } from "../components/PageShell";
import MemberCardSkeleton from "../components/MemberCardSkeleton";
import { MapPin, CalendarDays, Building2, Users } from "lucide-react";
import { getSponsors } from "../api/sponsor";

function SponsorsListPage() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        const res = await getSponsors();
        setSponsors(res.data.data || []);
      } catch (err) {
        console.error("Error fetching sponsors:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  if (loading) {
    return (
      <PageShell>
        <PageHeader
          eyebrow="Sahyog"
          title="Our Sponsors"
          subtitle="Meet the devotees and organizations supporting our samiti."
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
          <h2 className="text-2xl font-semibold text-red-600">Failed to load sponsors</h2>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Sahyog"
        title="Our Sponsors"
        subtitle="Meet the devotees and organizations supporting our samiti."
      />

      {/* <p className="mb-6 text-center text-sm text-gray-500">
        Showing {sponsors.length} sponsor{sponsors.length !== 1 ? "s" : ""}
      </p> */}

      <section className="mx-auto max-w-7xl px-5 pt-5 mt-5 pb-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor._id}
              className="overflow-hidden rounded-2xl bg-white shadow-lg"
            >
              {/* Image */}
              <div className="relative">
                {sponsor.logo ? (
                  <img
                    src={sponsor.logo}
                    alt={sponsor.sponsorName}
                    className="h-60 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-60 w-full items-center justify-center bg-secondary/40">
                    <Building2 size={40} className="text-muted-foreground" />
                  </div>
                )}

                {sponsor.sponsorType && (
                  <span className="absolute left-3 top-3 rounded-full border border-yellow-300 bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                    {sponsor.sponsorType}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-yellow-500">{sponsor.sponsorName}</h3>

                <p className="mt-1 text-sm text-gray-500">
                  {sponsor.contactPerson || "Sponsor"}
                </p>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    {[sponsor.city, sponsor.state].filter(Boolean).join(", ") || "-"}
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={14} />
                    Joined {new Date(sponsor.createdAt).getFullYear()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sponsors.length === 0 && (
          <div className="py-20 text-center">
            <Users size={50} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg text-gray-500">No sponsors listed yet</h3>
          </div>
        )}
      </section>
    </PageShell>
  );
}

export default SponsorsListPage;

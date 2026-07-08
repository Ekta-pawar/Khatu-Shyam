import { useEffect, useMemo, useState } from "react";
import { PageShell, PageHeader } from "../components/PageShell";
import { galleryGuests as fallbackGalleryGuests } from "../data/events";
import { getGalleryItems } from "../api/gallery";
import { ChevronDown } from "lucide-react";

function GuestsPage() {
  const [activeEvent, setActiveEvent] = useState("ALL");
  const [galleryGuests, setGalleryGuests] = useState(fallbackGalleryGuests);

  useEffect(() => {
    let isMounted = true;

    getGalleryItems("guest")
      .then((res) => {
        const items = res.data?.data || [];
        if (isMounted && items.length > 0) {
          setGalleryGuests(
            items.map((item) => ({
              src: item.mediaUrl,
              label: item.guestName || "अतिथि",
              event: item.title || "",
              year: String(
                item.eventDate
                  ? new Date(item.eventDate).getFullYear()
                  : new Date(item.createdAt).getFullYear()
              ),
            }))
          );
        }
      })
      .catch(() => {
        // keep the fallback static guests if the request fails
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const events = useMemo(() => {
    const uniqueEvents = new Set(galleryGuests.map((guest) => guest.event));
    return ["ALL", ...Array.from(uniqueEvents)];
  }, [galleryGuests]);

  const filtered =
    activeEvent === "ALL"
      ? galleryGuests
      : galleryGuests.filter((guest) => guest.event === activeEvent);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Gallery · Samiti Guest"
        title="Samiti Guests"
        subtitle="Distinguished guests who graced our bhajan sandhyas, yatras, bhandaras, and mahotsavs."
      />

      {/* Event Filter */}
      <div className="flex justify-center px-5 pb-4 pt-2">
        <div className="relative w-full max-w-xs">
          <select
            value={activeEvent}
            onChange={(e) => setActiveEvent(e.target.value)}
            className="w-full appearance-none rounded-full border border-yellow-400 bg-white px-6 py-2.5 text-sm font-semibold text-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
          >
            {events.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-yellow-600"
          />
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((guest, i) => (
            <figure
              key={i}
              className="group relative overflow-hidden rounded-3xl bg-card shadow-elegant"
            >
              <img
                src={guest.src}
                alt={guest.label}
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] text-yellow-300">
                  {guest.event} · {guest.year}
                </p>
                <p className="mt-1 text-lg font-semibold">{guest.label}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-6 text-center text-muted-foreground">
            No guest photos found for {activeEvent}.
          </p>
        )}
      </section>
    </PageShell>
  );
}

export default GuestsPage;

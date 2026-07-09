import { Link } from "react-router-dom";

import { PageShell, PageHeader } from "../components/PageShell";
import { useGetEventsQuery } from "../admin/api/eventApi";

import { CalendarDays, Clock, MapPin, ImageOff, Loader2 } from "lucide-react";

function formatTime(time) {
  if (!time) return null;
  const [h, m] = time.split(":");
  const hour = parseInt(h, 10);
  if (Number.isNaN(hour)) return time;
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${m} ${suffix}`;
}

function EventsPage() {
  const { data, isLoading, isError } = useGetEventsQuery();
  const events = data?.data || [];

  if (isLoading) {
    return (
      <PageShell>
        <div className="flex items-center justify-center gap-2 py-20">
          <Loader2 className="animate-spin text-muted-foreground" size={24} />
          <h2 className="text-2xl font-semibold">Loading Events...</h2>
        </div>
      </PageShell>
    );
  }

  if (isError) {
    return (
      <PageShell>
        <div className="py-20 text-center">
          <h3 className="text-2xl font-semibold text-yellow-500">Could not load events</h3>
          <p className="mt-2 text-muted-foreground">Please refresh the page or try again shortly.</p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Aagami Karyakram"
        title="Upcoming Events"
        subtitle="Join us in seva and sangat. Every devotee is welcome — bring your family and your voice."
      />

      <section className="mx-auto max-w-7xl space-y-8 px-5 py-16">
        {events.length > 0 ? (
          events.map((event, index) => (
            <article
              key={event._id}
              className={`grid overflow-hidden rounded-3xl bg-card shadow-elegant md:grid-cols-2 md:items-center ${
                index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="overflow-hidden">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full min-h-[260px] w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="h-full min-h-[260px] w-full items-center justify-center bg-secondary text-muted-foreground"
                  style={{ display: event.image ? "none" : "flex" }}
                >
                  <ImageOff size={32} aria-hidden="true" />
                </div>
              </div>

              <div className="p-8 md:p-12">
                <p className="text-xs uppercase tracking-[0.3em] text-saffron">
                  Event {String(index + 1).padStart(2, "0")}
                </p>

                <h2 className="mt-3 text-3xl text-yellow-500 md:text-4xl">{event.title}</h2>

                <p className="mt-4 leading-relaxed text-muted-foreground">{event.shortDescription}</p>

                <div className="mt-6 space-y-3">
                  <EventRow
                    icon={CalendarDays}
                    label="Date"
                    value={
                      event.eventDate
                        ? new Date(event.eventDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "—"
                    }
                  />

                  <EventRow
                    icon={Clock}
                    label="Time"
                    value={
                      [formatTime(event.startTime), formatTime(event.endTime)]
                        .filter(Boolean)
                        .join(" – ") || "—"
                    }
                  />

                  <EventRow icon={MapPin} label="Location" value={event.location || "—"} />
                </div>

                <Link
                  to="/contact"
                  className="mt-7 inline-flex rounded-full bg-linear-to-r from-yellow-200 to-yellow-500 px-6 py-3 text-sm font-medium text-black shadow-lg transition hover:scale-105"
                >
                  Register For This Event
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-semibold">No Events Found</h3>
          </div>
        )}
      </section>
    </PageShell>
  );
}

function EventRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-saffron">
        <Icon size={14} aria-hidden="true" />
      </span>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default EventsPage;

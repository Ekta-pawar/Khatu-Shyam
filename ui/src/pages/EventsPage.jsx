import { Link } from "react-router-dom";

import { PageShell, PageHeader } from "../components/PageShell";
import { useGetEventsQuery } from "../admin/api/eventApi";
import EventArticleSkeleton from "../components/EventArticleSkeleton";

import { CalendarDays, Clock, MapPin, ImageOff } from "lucide-react";

function formatTime(time) {
  if (!time) return null;
  const [h, m] = time.split(":");
  const hour = parseInt(h, 10);
  if (Number.isNaN(hour)) return time;
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${m} ${suffix}`;
}

function formatFullDate(value) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateRange(startDate, endDate) {
  const start = formatFullDate(startDate);
  const end = formatFullDate(endDate);
  if (!start) return "—";
  if (!end || start === end) return start;
  return `${start} – ${end}`;
}

// An event is "past" once its end date has fully elapsed — this is always
// derived from the stored dates, there is no manual status field.
function getEventStatus(event) {
  const end = new Date(event.endDate || event.startDate);
  end.setHours(23, 59, 59, 999);
  return end < new Date() ? "past" : "upcoming";
}

function EventsPage() {
  const { data, isLoading, isError } = useGetEventsQuery();
  const events = data?.data || [];

  if (isLoading) {
    return (
      <PageShell>
        <PageHeader
          eyebrow="Aagami Karyakram"
          title="Upcoming Events"
          subtitle="Join us in seva and sangat. Every devotee is welcome — bring your family and your voice."
        />
        <section className="mx-auto max-w-7xl space-y-8 px-5 py-16">
          {[...Array(3)].map((_, i) => (
            <EventArticleSkeleton key={i} />
          ))}
        </section>
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
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-saffron">
                    Event {String(index + 1).padStart(2, "0")}
                  </p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                      getEventStatus(event) === "upcoming"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {getEventStatus(event)}
                  </span>
                </div>

                <h2 className="mt-3 text-3xl text-yellow-500 md:text-4xl">{event.title}</h2>

                <p className="mt-4 leading-relaxed text-muted-foreground">{event.shortDescription}</p>

                <div className="mt-6 space-y-3">
                  <EventRow
                    icon={CalendarDays}
                    label="Date"
                    value={formatDateRange(event.startDate, event.endDate)}
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

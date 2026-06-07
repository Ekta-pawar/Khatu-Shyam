import React from "react";
import { Link } from "react-router-dom";
import { PageShell, PageHeader } from "../components/PageShell";
import { upcomingEvents } from "../data/events";

import {
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";

function EventsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Aagami Karyakram"
        title="Upcoming Events"
        subtitle="Join us in seva and sangat. Every devotee is welcome — bring your family and your voice."
      />

      <section className="mx-auto max-w-7xl space-y-8 px-5 py-16">
        {upcomingEvents.map((event, index) => (
          <article
            key={event.title}
            className={`grid overflow-hidden rounded-3xl bg-card shadow-elegant md:grid-cols-2 md:items-center ${
              index % 2 === 1
                ? "md:[&>div:first-child]:order-2"
                : ""
            }`}
          >
            <div className="overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.3em] text-saffron">
                Event {String(index + 1).padStart(2, "0")}
              </p>

              <h2 className="mt-3 text-3xl text-maroon md:text-4xl">
                {event.title}
              </h2>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                {event.description}
              </p>

              <div className="mt-6 space-y-3">
                <EventRow
                  icon={CalendarDays}
                  label="Date"
                  value={event.date}
                />

                <EventRow
                  icon={Clock}
                  label="Time"
                  value={event.time}
                />

                <EventRow
                  icon={MapPin}
                  label="Location"
                  value={event.location}
                />
              </div>

              <Link
                to="/contact"
                className="mt-7 inline-flex rounded-full bg-yellow-500 px-6 py-3 text-sm font-medium text-black shadow-lg transition hover:scale-105"
              >
                Register For This Event
              </Link>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}

function EventRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-saffron">
        <Icon size={14} />
      </span>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </p>

        <p>{value}</p>
      </div>
    </div>
  );
}

export default EventsPage;
import React from "react";
import { Link } from "react-router-dom";
import { PageShell } from "../components/PageShell";

import heroTemple from "../assets/hero-temple.jpg";
import deity from "../assets/shyam-deity.jpg";
import event1 from "../assets/event-1.jpg";

import { upcomingEvents } from "../data/events";
import { members, tierLabel } from "../data/members";

import {
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";
function HomePage() {
  return (
    <PageShell>
            <section className="relative min-h-[92vh] overflow-hidden">
        <img
          src={heroTemple}
          alt="Khatu Shyam Ji temple"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center px-5 py-20 text-center text-white">
          <p className="mb-5 text-2xl text-yellow-300">
            ॥ श्री श्याम शरणं मम ॥
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl">
            Sri Sri Khattu Shyam
            <span className="block text-yellow-300">
              Sabha Samiti
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base md:text-lg">
            Three decades of seva, sangat and devotion to
            Shyam Baba.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/become-member"
              className="rounded-full bg-yellow-500 px-7 py-3 text-black"
            >
              Become a Member
            </Link>

            <Link
              to="/events"
              className="rounded-full border border-white px-7 py-3"
            >
              Upcoming Events
            </Link>
          </div>
        </div>
      </section>
            <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-2 md:items-center">
        <div>
          <img
            src={deity}
            alt="Shri Khatu Shyam Ji"
            className="h-[560px] w-full rounded-3xl object-cover"
          />
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-orange-500">
            हारे का सहारा
          </p>

          <h2 className="text-4xl md:text-5xl">
            The shelter of those who feel they have
            nothing left.
          </h2>

          <p className="mt-5 text-gray-600">
            For over thirty years, our samiti has
            gathered devotees to sing the names of
            Shyam Baba and walk together on the path
            of bhakti.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { n: "30+", l: "Years of Seva" },
              { n: "5000+", l: "Families" },
              { n: "120+", l: "Events" },
            ].map((item) => (
              <div
                key={item.l}
                className="rounded-2xl bg-gray-100 p-5 text-center"
              >
                <div className="text-3xl">
                  {item.n}
                </div>

                <div className="text-xs">
                  {item.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
            <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="mb-14 text-center text-4xl">
            Pillars of the Samiti
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {members.map((m) => (
              <Link
                key={m.id}
                to={`/team/${m.id}`}
                className="group overflow-hidden rounded-3xl bg-white shadow"
              >
                <img
                  src={m.photo}
                  alt={m.name}
                  className="aspect-[4/5] w-full object-cover"
                />

                <div className="p-6">
                  <span>
                    {tierLabel[m.tier]}
                  </span>

                  <h3 className="mt-2 text-2xl">
                    {m.name}
                  </h3>

                  <p>{m.title}</p>

                  <p className="mt-4 text-orange-500">
                    View Profile →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
            <section className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="mb-12 text-4xl">
          Upcoming Events
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {upcomingEvents.map((e) => (
            <article
              key={e.title}
              className="overflow-hidden rounded-2xl bg-white shadow"
            >
              <img
                src={e.image}
                alt={e.title}
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl">
                  {e.title}
                </h3>

                <p className="mt-3 flex items-center gap-2">
                  <CalendarDays size={14} />
                  {e.date}
                </p>

                <p className="mt-2 flex items-center gap-2">
                  <MapPin size={14} />
                  {e.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      
   
          <section className="mx-auto mb-20 max-w-6xl rounded-3xl bg-yellow-500 p-16 text-center">
        <img
          src={event1}
          alt=""
          className="hidden"
        />

        <h2 className="text-4xl">
          Walk with us on the path of bhakti.
        </h2>

        <p className="mx-auto mt-4 max-w-xl">
          Join thousands of families who call this
          samiti home.
        </p>

        <Link
          to="/become-member"
          className="mt-8 inline-block rounded-full bg-red-900 px-7 py-3 text-white"
        >
          Become a Member
        </Link>
      </section>
    </PageShell>
  );
}

export default HomePage;
 

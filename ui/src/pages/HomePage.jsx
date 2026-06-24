import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PageShell } from "../components/PageShell";

import heroTemple from "../assets/hero-temple.jpg";
import deity from "../assets/shyam-deity.jpg";
import event1 from "../assets/event-1.jpg";

import {
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTierLabel = (tier) => {
  if (!tier) return "Member";

  return tier
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

function HomePage() {
  const [homeMembers, setHomeMembers] = useState([]);
  const [homeEvents, setHomeEvents] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [membersRes, eventsRes] = await Promise.all([
          axios.get(`${API_BASE}/members`),
          axios.get(`${API_BASE}/events/upcoming`),
        ]);

        const members = membersRes.data.members || membersRes.data.data || [];
        const goldenMembers = members.filter((member) =>
          String(member.tier || "").toLowerCase().includes("gold")
        );

        setHomeMembers((goldenMembers.length ? goldenMembers : members).slice(0, 3));
        setHomeEvents((eventsRes.data.data || []).slice(0, 3));
      } catch (error) {
        console.error("Error loading home page data:", error);
      }
    };

    fetchHomeData();
  }, []);

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
           Shri Shri Khatu Shyam 
            <span className="block text-yellow-300">
              Seva Samiti (Reg.)
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
            {/* <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-2 md:items-center">
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
      </section> */}

<section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-2 md:items-center">
  <div className="flex items-center justify-center">
    <img
      src={deity}
      alt="Shri Khatu Shyam Ji"
      className="h-[460px] w-full rounded-3xl object-cover"
    />
  </div>

  <div className="mb-28 flex flex-col ">
    <p className="mb-5 text-xs uppercase tracking-[0.35em] text-orange-500">
      हारे का सहारा
    </p>

    <h2 className="text-4xl md:text-5xl">
      The shelter of those who feel they have
      nothing left.
    </h2>

    <p className="mt-5 text-gray-600 pt-0 pb-5 ">
      For over thirty years, our samiti has
      gathered devotees to sing the names of
      Shyam Baba and walk together on the path
      of bhakti.
    </p>

    <div className="mt-9 grid grid-cols-3 gap-4">
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

<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">    
  
          {homeMembers.map((m) => (
              <Link
                key={m._id}
                to={`/team/${m._id}`}
                className="group overflow-hidden rounded-3xl bg-white shadow"
              >
                <img
                  src={m.profileImage || deity}
                  alt={m.fullName}
                  className="aspect-[4/5] w-full object-cover"
                />

                <div className="p-6">
                  <span>
                    {formatTierLabel(m.tier)}
                  </span>

                  <h3 className="mt-2 text-2xl">
                    {m.fullName}
                  </h3>

                  <p>{m.occupation || m.businessDetails?.businessType || "Golden Member"}</p>

                  <p className="mt-4 inline-flex items-center gap-1 text-orange-500">
                    View Profile <ArrowRight size={14} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {homeMembers.length === 0 && (
            <p className="text-center text-muted-foreground">
              Golden members will appear here soon.
            </p>
          )}
        </div>
      </section>
            <section className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="mb-12 text-4xl">
          Upcoming Events
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {homeEvents.map((e) => (
            <article
              key={e._id}
              className="overflow-hidden rounded-2xl bg-white shadow"
            >
              <img
                src={e.image || event1}
                alt={e.title}
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl">
                  {e.title}
                </h3>

                <p className="mt-3 flex items-center gap-2">
                  <CalendarDays size={14} />
                  {formatDate(e.eventDate)}
                </p>

                <p className="mt-2 flex items-center gap-2">
                  <MapPin size={14} />
                  {e.location}
                </p>
              </div>
            </article>
          ))}
        </div>
        {homeEvents.length === 0 && (
          <p className="mt-6 text-muted-foreground">
            Upcoming events will appear here soon.
          </p>
        )}
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
 

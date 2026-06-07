import React from "react";
import { PageShell, PageHeader } from "../components/PageShell";
import deity from "../assets/shyam-deity.jpg";
import mandala from "../assets/mandala.jpg";
import { Flame, HandHeart, Music, Users } from "lucide-react";

const pillars = [
  {
    icon: Music,
    title: "Bhajan & Satsang",
    text: "Weekly satsangs and grand bhajan sandhyas led by acclaimed singers.",
  },
  {
    icon: HandHeart,
    title: "Annapurna Seva",
    text: "Mahabhandaras serving warm prasad to thousands across the year.",
  },
  {
    icon: Flame,
    title: "Yatra & Darshan",
    text: "Organised yatras to Khatu Dham and partner mandirs across India.",
  },
  {
    icon: Users,
    title: "Family Sangat",
    text: "A close-knit fellowship of devotee families bound by faith and seva.",
  },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Hamari Kahani"
        title="A samiti born of devotion, sustained by sangat."
        subtitle="From a small gathering of seven families in 1995 to a pan-India sangat of thousands — the story of Sri Sri Khattu Shyam Sabha Samiti is the story of Baba's grace."
      />

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-5 md:items-center">
        <div className="relative md:col-span-2">
          <img
            src={deity}
            alt="Shri Khatu Shyam Ji"
            width={900}
            height={1100}
            loading="lazy"
            className="h-[520px] w-full rounded-3xl object-cover shadow-elegant"
          />
        </div>

        <div className="md:col-span-3">
          <h2 className="font-display text-3xl text-maroon md:text-4xl">
            Our Mission
          </h2>

          <p className="mt-5 leading-relaxed text-muted-foreground">
            To preserve and propagate the worship of Shri Khatu Shyam Ji —
            Baba Khatu Naresh, the loser's refuge — through dignified bhajan,
            transparent seva, and inclusive sangat. We believe a devotional
            community thrives when it serves quietly, sings joyfully, and
            welcomes every devotee as family.
          </p>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            The samiti was founded in 1995 by Shri Rameshwar Agarwal and six
            co-patrons in Jaipur. Today we host over 40 events each year across
            Rajasthan, Delhi NCR, Haryana, and Maharashtra, with an active
            membership of 5,000+ families.
          </p>
        </div>
      </section>

      <section className="border-y border-border/60 bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-center font-display text-3xl text-maroon md:text-4xl">
            Our Four Pillars of Seva
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl bg-card p-7 shadow-elegant"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-sun text-primary-foreground">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 font-display text-xl text-maroon">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 text-center">
        <img
          src={mandala}
          alt="Mandala"
          width={1024}
          height={1024}
          loading="lazy"
          className="mx-auto mb-8 h-32 w-32 rounded-full object-cover shadow-gold"
        />

        <p className="devanagari mb-4 text-2xl text-maroon">
          ॥ हारे का सहारा, श्याम हमारा ॥
        </p>

        <p className="italic leading-relaxed text-muted-foreground">
          "Wherever devotees gather to sing his name, Baba arrives —
          sometimes as a song, sometimes as a stranger, always as grace."
        </p>
      </section>
    </PageShell>
  );
}

export default AboutPage;
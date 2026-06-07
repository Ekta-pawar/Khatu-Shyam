import React from "react";
import { PageShell, PageHeader } from "../components/PageShell";
import { galleryItems } from "../data/events";
import { Play } from "lucide-react";

function GalleryPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Drishya · Moments"
        title="Gallery of Seva"
        subtitle="Snapshots and recordings from our bhajan sandhyas, bhandaras, yatras and mahotsavs across the years."
      />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden rounded-3xl bg-card shadow-elegant ${
                i % 5 === 0 ? "lg:row-span-2" : ""
              }`}
            >
              <img
                src={item.src}
                alt={item.title}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i % 5 === 0 ? "h-[560px]" : "h-72"
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {i % 3 === 0 && (
                <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-yellow-500 text-black shadow-lg">
                  <Play size={16} fill="currentColor" />
                </div>
              )}

              <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] text-yellow-300">
                  {item.year}
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {item.title}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

export default GalleryPage;
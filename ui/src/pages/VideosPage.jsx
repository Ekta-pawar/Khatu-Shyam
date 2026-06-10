import React from "react";
import { PageShell, PageHeader } from "../components/PageShell";
import { galleryVideos } from "../data/events";
import { Play, Clock, Calendar } from "lucide-react";

function VideosPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Gallery · Videos"
        title="Video Gallery"
        subtitle="Watch recordings from our bhajan sandhyas, yatras, bhandaras, and mahotsavs."
      />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryVideos.map((video, i) => (
            <div
              key={i}
              className="group cursor-pointer overflow-hidden rounded-3xl bg-card shadow-elegant transition-transform hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-yellow-500 text-black shadow-xl transition-transform duration-200 group-hover:scale-110">
                    <Play size={22} fill="currentColor" />
                  </div>
                </div>

                {/* Duration badge */}
                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 text-xs text-white">
                  <Clock size={11} />
                  {video.duration}
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="line-clamp-2 text-base font-semibold text-maroon">
                  {video.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                  {video.description}
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  {video.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

export default VideosPage;

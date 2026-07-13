import { useEffect, useMemo, useState } from "react";
import { PageShell, PageHeader } from "../components/PageShell";
import { getGalleryItems } from "../api/gallery";
import { Play, Clock, Calendar } from "lucide-react";

const EXTRA_YEARS = ["2026"];
for (let year = 2025; year >= 2016; year--) {
  EXTRA_YEARS.push(String(year));
}

function VideosPage() {
  const [activeYear, setActiveYear] = useState("ALL");
  const [galleryVideos, setGalleryVideos] = useState([]);

  useEffect(() => {
    let isMounted = true;

    getGalleryItems("video")
      .then((res) => {
        const items = res.data?.data || [];
        if (isMounted) {
          setGalleryVideos(
            items.map((item) => ({
              thumbnail: item.mediaUrl,
              videoUrl: item.mediaUrl,
              title: item.title,
              description: "",
              duration: "",
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
        // request failed — page just shows no videos
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const years = useMemo(() => {
    const uniqueYears = new Set([
      ...EXTRA_YEARS,
      ...galleryVideos.map((video) => video.year),
    ]);
    return ["ALL", ...Array.from(uniqueYears).sort((a, b) => b - a)];
  }, [galleryVideos]);

  const filteredVideos =
    activeYear === "ALL"
      ? galleryVideos
      : galleryVideos.filter((video) => video.year === activeYear);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Gallery · Videos"
        title="Video Gallery"
        subtitle="Watch recordings from our bhajan sandhyas, yatras, bhandaras, and mahotsavs."
      />

      {/* Year Filter */}
      <div className="flex flex-wrap justify-center gap-3 px-5 pb-4 pt-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeYear === year
                ? "bg-linear-to-r from-yellow-200 to-yellow-500 text-black shadow-lg shadow-yellow-200"
                : "border border-yellow-400 bg-white text-yellow-700 hover:bg-yellow-50"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video, i) => (
            <a
              key={i}
              href={video.videoUrl || undefined}
              target={video.videoUrl ? "_blank" : undefined}
              rel={video.videoUrl ? "noopener noreferrer" : undefined}
              className="group cursor-pointer overflow-hidden rounded-3xl bg-card shadow-elegant transition-transform hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                {video.videoUrl ? (
                  <video
                    src={video.videoUrl}
                    className="h-52 w-full object-contain transition-transform duration-700 group-hover:scale-105"
                    muted
                  />
                ) : (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-52 w-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-linear-to-r from-yellow-200 to-yellow-500 text-black shadow-xl transition-transform duration-200 group-hover:scale-110">
                    <Play size={22} fill="currentColor" />
                  </div>
                </div>

                {/* Duration badge */}
                {video.duration && (
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 text-xs text-white">
                    <Clock size={11} />
                    {video.duration}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="line-clamp-2 text-base font-semibold text-yellow-500">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {video.description}
                  </p>
                )}
                <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  {video.year}
                </p>
              </div>
            </a>
          ))}
        </div>
        {filteredVideos.length === 0 && (
          <p className="mt-6 text-center text-muted-foreground">
            No videos found for {activeYear}.
          </p>
        )}
      </section>
    </PageShell>
  );
}

export default VideosPage;

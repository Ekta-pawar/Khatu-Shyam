import { useEffect, useState } from "react";
import { PageShell, PageHeader } from "../components/PageShell";
import { galleryItems as fallbackGalleryItems } from "../data/events";
import { getGalleryItems } from "../api/gallery";
import { Play } from "lucide-react";

function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState(fallbackGalleryItems);

  useEffect(() => {
    let isMounted = true;

    Promise.all([getGalleryItems("photo"), getGalleryItems("video")])
      .then(([photoRes, videoRes]) => {
        const items = [...(photoRes.data?.data || []), ...(videoRes.data?.data || [])];
        if (isMounted && items.length > 0) {
          setGalleryItems(
            items.map((item) => ({
              src: item.mediaUrl,
              title: item.title,
              isVideo: item.type === "video",
              year: item.eventDate
                ? new Date(item.eventDate).getFullYear()
                : new Date(item.createdAt).getFullYear(),
            }))
          );
        }
      })
      .catch(() => {
        // keep the fallback static items if the request fails
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Drishya · Moments"
        title="Gallery"
        subtitle="Snapshots and recordings from our bhajan sandhyas, bhandaras, yatras and mahotsavs across the years."
      />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-5 grid-cols-2 md:grid-cols-4">
          {galleryItems.map((item, i) => (
            <figure
              key={i}
              className="group relative aspect-square overflow-hidden rounded-3xl bg-card shadow-elegant"
            >
              {item.isVideo ? (
                <video
                  src={item.src}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  muted
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

              {item.isVideo && (
                <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-linear-to-r from-yellow-200 to-yellow-500 text-black shadow-lg">
                  <Play size={16} fill="currentColor" />
                </div>
              )}

              <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] text-yellow-300">
                  {item.year}
                </p>

                <p className="mt-1 line-clamp-1 text-xl font-semibold">
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
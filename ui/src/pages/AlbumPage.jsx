import { useEffect, useMemo, useState } from "react";
import { PageShell, PageHeader } from "../components/PageShell";
import { galleryImages } from "../data/events";
import { getGalleryItems } from "../api/gallery";
import { Sparkles, Images } from "lucide-react";

const TABS = [
  { key: "highlight", label: "Highlights", icon: Sparkles },
  { key: "album", label: "Album", icon: Images },
];

const EXTRA_YEARS = ["2026"];
for (let year = 2025; year >= 2016; year--) {
  EXTRA_YEARS.push(String(year));
}

function AlbumPage() {
  const [activeTab, setActiveTab] = useState("highlight");
  const [activeYear, setActiveYear] = useState("ALL");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  useEffect(() => {
    let isMounted = true;

    getGalleryItems("photo")
      .then((res) => {
        const items = res.data?.data || [];
        if (isMounted) {
          setUploadedPhotos(
            items.map((item) => ({
              src: item.mediaUrl,
              title: item.title,
              category: item.category || "album",
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
        // no admin-uploaded photos yet / request failed — static album still renders
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const years = useMemo(() => {
    const uniqueYears = new Set([
      ...EXTRA_YEARS,
      ...galleryImages.map((img) => img.year),
      ...uploadedPhotos.map((img) => img.year),
    ]);
    return ["ALL", ...Array.from(uniqueYears).sort((a, b) => b - a)];
  }, [uploadedPhotos]);

  const filtered = [
    ...uploadedPhotos.filter(
      (img) =>
        img.category === activeTab && (activeYear === "ALL" || img.year === activeYear)
    ),
    ...galleryImages.filter(
      (img) =>
        img.category === activeTab &&
        (activeYear === "ALL" || img.year === activeYear)
    ),
  ];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Gallery · Album"
        title="Photo Album"
        subtitle="Cherished moments from our bhajan sandhyas, bhandaras, yatras and mahotsavs across the years."
      />

      {/* Tab Buttons */}
      <div className="flex justify-center gap-3 px-5 pb-4 pt-2">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeTab === key
                ? "bg-yellow-500 text-black shadow-lg shadow-yellow-200"
                : "border border-yellow-400 bg-white text-yellow-700 hover:bg-yellow-50"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Year Filter */}
      <div className="flex flex-wrap justify-center gap-3 px-5 pb-4">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeYear === year
                ? "bg-yellow-500 text-black shadow-lg shadow-yellow-200"
                : "border border-yellow-400 bg-white text-yellow-700 hover:bg-yellow-50"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
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
                  i % 5 === 0 ? "h-140" : "h-72"
                }`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] text-yellow-300">
                  {item.year}
                </p>
                <p className="mt-1 text-lg font-semibold">{item.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-6 text-center text-muted-foreground">
            No photos found for {activeYear}.
          </p>
        )}
      </section>
    </PageShell>
  );
}

export default AlbumPage;

import { useMemo, useState } from "react";
import {
  Images,
  Image as ImageIcon,
  Video,
  Plus,
  X,
  Loader2,
  Trash2,
  Check,
  Play,
  CalendarDays,
} from "lucide-react";
import {
  useGetGalleryItemsQuery,
  useCreateGalleryItemMutation,
  useDeleteGalleryItemMutation,
} from "../api/galleryApi";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";

const TYPE_TABS = [
  { key: "all", label: "All", icon: Images },
  { key: "photo", label: "Photos", icon: ImageIcon },
  { key: "video", label: "Videos", icon: Video },
];

const EMPTY_FORM = {
  type: "photo",
  category: "album",
  title: "",
  eventDate: "",
  file: null,
  preview: "",
};

// Hard caps on our Cloudinary plan — files over these are rejected by
// Cloudinary itself, so we check client-side and fail fast with a clear
// message rather than letting the upload run and error out partway through.
const MAX_FILE_SIZE_BYTES = {
  photo: 10 * 1024 * 1024,
  video: 100 * 1024 * 1024,
};

const formatMb = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors duration-150 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100";

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "-";

/* ---------- upload form ---------- */

const UploadForm = ({ onClose, onCreated }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [createGalleryItem] = useCreateGalleryItemMutation();
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("idle"); // idle | uploading | saving

  const isLoading = stage === "uploading" || stage === "saving";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");

    const limit = MAX_FILE_SIZE_BYTES[formData.type];
    if (file.size > limit) {
      e.target.value = "";
      setError(
        `That file is ${formatMb(file.size)}, but ${
          formData.type === "video" ? "videos" : "photos"
        } are limited to ${formatMb(limit)} on our current Cloudinary plan. Please compress it and try again.`
      );
      setFormData((prev) => ({ ...prev, file: null, preview: "" }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      file,
      preview: file.type.startsWith("video/") ? "" : URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.file) {
      setError("Please choose a photo or video to upload");
      return;
    }

    const limit = MAX_FILE_SIZE_BYTES[formData.type];
    if (formData.file.size > limit) {
      setError(
        `That file is ${formatMb(formData.file.size)}, but ${
          formData.type === "video" ? "videos" : "photos"
        } are limited to ${formatMb(limit)} on our current Cloudinary plan. Please compress it and try again.`
      );
      return;
    }

    try {
      setStage("uploading");
      setProgress(0);

      // Upload straight to Cloudinary from the browser — for large videos this
      // is far faster than routing the file through our own server first.
      const cloudResult = await uploadToCloudinary(formData.file, setProgress);

      setStage("saving");
      await createGalleryItem({
        type: formData.type,
        title: formData.title,
        eventDate: formData.eventDate,
        category: formData.type === "photo" ? formData.category : undefined,
        mediaUrl: cloudResult.secure_url,
        mediaType: cloudResult.resource_type,
        publicId: cloudResult.public_id,
      }).unwrap();

      onCreated();
    } catch (err) {
      console.error(err);
      setError(err?.data?.message || err?.message || "Failed to upload gallery item");
      setStage("idle");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={handleSubmit}
        className="flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Upload to gallery</h2>
            <p className="mt-0.5 text-xs text-slate-500">Add a photo or video.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Type</label>
            <div className="flex gap-2">
              {[
                { value: "photo", label: "Photo" },
                { value: "video", label: "Video" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, type: opt.value }))}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                    formData.type === opt.value
                      ? "border-transparent bg-linear-to-r from-yellow-200 to-yellow-500 text-black"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {formData.type === "photo" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Show under
              </label>
              <div className="flex gap-2">
                {[
                  { value: "highlight", label: "Highlights" },
                  { value: "album", label: "Album" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, category: opt.value }))}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                      formData.category === opt.value
                        ? "border-transparent bg-linear-to-r from-yellow-200 to-yellow-500 text-black"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Controls which tab this shows under on the public Photo Album page.
              </p>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder={
                formData.type === "video" ? "Bhajan Sandhya — Live" : "Phalgun Mela at Khatu Dham"
              }
              className={inputClass}
              value={formData.title}
              onChange={handleChange}
              maxLength={120}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Event date</label>
            <input
              type="date"
              name="eventDate"
              className={inputClass}
              value={formData.eventDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              {formData.type === "video" ? "Video file" : "Photo file"}
            </label>
            <input
              type="file"
              accept={formData.type === "video" ? "video/*" : "image/*"}
              onChange={handleFileChange}
              className={inputClass}
              required
            />
            <p className="mt-1 text-xs text-slate-400">
              Max {formatMb(MAX_FILE_SIZE_BYTES[formData.type])} — compress larger files first
              (e.g. with HandBrake) before uploading.
            </p>
          </div>

          {formData.preview && (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <img src={formData.preview} alt="Preview" className="h-40 w-full object-cover" />
            </div>
          )}

          {formData.type === "video" && formData.file && (
            <p className="text-xs text-slate-500">Selected: {formData.file.name}</p>
          )}

          {stage === "uploading" && (
            <div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                Uploading to Cloudinary… {progress}%
              </p>
            </div>
          )}

          {stage === "saving" && (
            <p className="flex items-center gap-1.5 text-xs text-slate-500">
              <Loader2 size={12} className="animate-spin" /> Saving to gallery…
            </p>
          )}

          {error && <p className="text-sm text-rose-600">{error}</p>}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg bg-linear-to-r from-yellow-200 to-yellow-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:from-yellow-300 hover:to-yellow-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {stage === "uploading" ? (
              <>
                <Loader2 size={15} className="animate-spin" /> {progress}%
              </>
            ) : stage === "saving" ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Saving…
              </>
            ) : (
              <>
                <Plus size={15} /> Upload
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

/* ---------- page ---------- */

const GalleryManagementPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmingId, setConfirmingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { data: items = [], isLoading, isFetching } = useGetGalleryItemsQuery(
    activeTab === "all" ? undefined : activeTab
  );
  const [deleteGalleryItem] = useDeleteGalleryItemMutation();

  const counts = useMemo(
    () => ({
      all: items.length,
      photo: items.filter((i) => i.type === "photo").length,
      video: items.filter((i) => i.type === "video").length,
    }),
    [items]
  );

  const handleDelete = async (id) => {
    setDeletingId(id);
    setConfirmingId(null);
    try {
      await deleteGalleryItem(id).unwrap();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Images size={16} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-yellow-500">
              Gallery
            </h1>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Upload photos and videos for the public gallery pages.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-linear-to-r from-yellow-200 to-yellow-500 px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition-colors hover:from-yellow-300 hover:to-yellow-600"
        >
          <Plus size={15} />
          Upload to gallery
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {TYPE_TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === tab.key
                  ? "border-transparent bg-linear-to-r from-yellow-200 to-yellow-500 text-black"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={13} />
              {tab.label}
              <span
                className={`rounded-full px-1.5 text-[11px] ${
                  activeTab === tab.key ? "bg-white/20" : "bg-slate-100 text-slate-500"
                }`}
              >
                {counts[tab.key] || 0}
              </span>
            </button>
          );
        })}
        {isFetching && <Loader2 size={14} className="animate-spin text-slate-400" />}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <Loader2 size={20} className="animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-6 py-14 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200">
            <Images size={20} className="text-slate-400" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-slate-700">No items yet</h3>
          <p className="mt-1 max-w-xs text-sm text-slate-500">
            Items you upload will show up here and on the public gallery pages.
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-4 flex items-center gap-2 rounded-lg bg-linear-to-r from-yellow-200 to-yellow-500 px-3.5 py-2 text-sm font-semibold text-black transition-colors hover:from-yellow-300 hover:to-yellow-600"
          >
            <Plus size={14} /> Upload your first item
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-4 lg:grid-cols-4">
          {items.map((item) => {
            const isConfirming = confirmingId === item._id;
            const isDeleting = deletingId === item._id;

            return (
              <div
                key={item._id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative h-44 w-full bg-slate-100">
                  {item.mediaType === "video" ? (
                    <video src={item.mediaUrl} className="h-full w-full object-contain" muted />
                  ) : (
                    <img
                      src={item.mediaUrl}
                      alt={item.title || "Gallery item"}
                      className="h-full w-full object-contain"
                    />
                  )}
                  {item.mediaType === "video" && (
                    <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white">
                      <Play size={14} fill="currentColor" />
                    </div>
                  )}
                </div>

                <div className="p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {item.title || "Untitled"}
                    </p>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-500">
                      {item.type === "photo" && item.category ? `photo · ${item.category}` : item.type}
                    </span>
                  </div>
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-slate-400">
                    <CalendarDays size={11} /> {formatDate(item.eventDate)}
                  </p>
                </div>

                {isConfirming ? (
                  <div className="absolute right-2 top-2 flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={isDeleting}
                      className="flex items-center gap-1 rounded-md bg-rose-600 px-2 py-1 text-xs font-semibold text-white transition-colors hover:bg-rose-700 disabled:opacity-60"
                    >
                      {isDeleting ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <Check size={12} />
                      )}
                    </button>
                    <button
                      onClick={() => setConfirmingId(null)}
                      disabled={isDeleting}
                      className="rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmingId(item._id)}
                    className="absolute right-2 top-2 rounded-lg bg-white/90 p-2 text-slate-500 opacity-0 shadow-sm transition-opacity duration-150 hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100"
                    title="Delete item"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {isModalOpen && (
        <UploadForm onClose={() => setIsModalOpen(false)} onCreated={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default GalleryManagementPage;

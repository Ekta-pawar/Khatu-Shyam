import { useState, useMemo } from "react";
import {
  CalendarDays,
  MapPin,
  Clock,
  Image as ImageIcon,
  Trash2,
  Plus,
  X,
  Loader2,
  FileText,
  Check,
  AlertCircle,
} from "lucide-react";
import {
  useCreateEventMutation,
  useGetEventsQuery,
  useDeleteEventMutation,
} from "../api/eventApi";

const EMPTY_FORM = {
  title: "",
  shortDescription: "",
  fullDescription: "",
  image: null,
  imagePreview: "",
  eventDate: "",
  startTime: "",
  endTime: "",
  location: "",
  category: "upcoming",
};

const STEPS = [
  { key: "basics", label: "Basics", icon: FileText },
  { key: "schedule", label: "Schedule", icon: CalendarDays },
  { key: "media", label: "Media", icon: ImageIcon },
];

/* ---------- small components ---------- */

const Field = ({ label, children, required = false, hint }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-slate-700">
      {label}
      {required && <span className="ml-0.5 text-slate-400">*</span>}
    </label>
    {children}
    {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
  </div>
);

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

const formatTime = (time) => {
  if (!time) return null;
  const [h, m] = time.split(":");
  const hour = parseInt(h, 10);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${m} ${suffix}`;
};

/* ---------- vertical stepper rail ---------- */

const StepRail = ({ steps, activeKey, completedUpTo }) => (
  <div className="relative w-40 shrink-0 pl-1 pt-1 sm:w-44">
    <div className="absolute bottom-3 left-[19px] top-3 w-px bg-slate-200" />
    <div className="flex flex-col gap-7">
      {steps.map((step, i) => {
        const isActive = step.key === activeKey;
        const isDone = i < completedUpTo;
        return (
          <div key={step.key} className="relative flex items-start gap-2.5">
            <span
              className={`z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors duration-150 ${
                isActive
                  ? "bg-slate-900 text-white"
                  : isDone
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 bg-white text-slate-400"
              }`}
            >
              {isDone && !isActive ? <Check size={12} /> : i + 1}
            </span>
            <span
              className={`pt-0.5 text-sm font-medium leading-[22px] ${
                isActive ? "text-slate-900" : "text-slate-400"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

/* ---------- new event modal ---------- */

const NewEventModal = ({ onClose, onCreated, createEvent, isLoading }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [activeStep, setActiveStep] = useState("basics");
  const stepIndex = STEPS.findIndex((s) => s.key === activeStep);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async () => {
    const requiredFields = [
      ["title", "Event title"],
      ["shortDescription", "Short description"],
      ["fullDescription", "Full description"],
      ["eventDate", "Event date"],
      ["startTime", "Start time"],
      ["endTime", "End time"],
      ["location", "Location"],
    ];
    const missing = requiredFields.find(([key]) => !formData[key]?.trim?.() && !formData[key]);
    if (missing) {
      alert(`${missing[1]} is required.`);
      return;
    }

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("shortDescription", formData.shortDescription);
      data.append("fullDescription", formData.fullDescription);
      data.append("eventDate", formData.eventDate);
      data.append("startTime", formData.startTime);
      data.append("endTime", formData.endTime);
      data.append("location", formData.location);
      data.append("category", formData.category);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await createEvent(data).unwrap();

      onCreated();
    } catch (error) {
      console.error(error);
      alert(error?.data?.message || "Failed to create event");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">New event</h2>
            <p className="mt-0.5 text-xs text-slate-500">Fields marked with * are required.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 gap-6 overflow-y-auto px-6 py-6">
            <StepRail steps={STEPS} activeKey={activeStep} completedUpTo={stepIndex} />

            <div className="min-w-0 flex-1">
              {activeStep === "basics" && (
                <div className="space-y-4">
                  <Field label="Event title" required>
                    <input
                      type="text"
                      name="title"
                      placeholder="Annual Charity Gala"
                      className={inputClass}
                      value={formData.title}
                      onChange={handleChange}
                      required
                      maxLength={80}
                      autoFocus
                    />
                    <p className="mt-1 text-right text-[11px] text-slate-400">
                      {formData.title.length}/80
                    </p>
                  </Field>

                  <Field label="Short description" required>
                    <textarea
                      rows="2"
                      name="shortDescription"
                      placeholder="One or two lines shown in event listings"
                      className={`${inputClass} resize-none`}
                      value={formData.shortDescription}
                      onChange={handleChange}
                      required
                    />
                  </Field>

                  <Field label="Full description" required>
                    <textarea
                      rows="5"
                      name="fullDescription"
                      placeholder="Complete event details shown on the event page"
                      className={`${inputClass} resize-none`}
                      value={formData.fullDescription}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                </div>
              )}

              {activeStep === "schedule" && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Event date" required>
                      <input
                        type="date"
                        name="eventDate"
                        className={inputClass}
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                      />
                    </Field>
                    <Field label="Status">
                      <select
                        name="category"
                        className={inputClass}
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                      </select>
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Start time" required>
                      <input
                        type="time"
                        name="startTime"
                        className={inputClass}
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                      />
                    </Field>
                    <Field label="End time" required>
                      <input
                        type="time"
                        name="endTime"
                        className={inputClass}
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                      />
                    </Field>
                  </div>

                  {formData.startTime &&
                    formData.endTime &&
                    formData.endTime <= formData.startTime && (
                      <p className="flex items-center gap-1.5 text-xs text-amber-600">
                        <AlertCircle size={13} /> End time is before the start time — double
                        check this.
                      </p>
                    )}

                  <Field label="Location" required>
                    <input
                      type="text"
                      name="location"
                      placeholder="Community Hall, Sector 12"
                      className={inputClass}
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                </div>
              )}

              {activeStep === "media" && (
                <div className="space-y-4">
                  <Field
                    label="Event Image"
                    hint="Upload an image for this event"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={inputClass}
                    />
                  </Field>

                  {formData.imagePreview ? (
                    <div className="relative overflow-hidden rounded-xl border border-slate-200">
                      <img
                        src={formData.imagePreview}
                        alt="Event preview"
                        className="h-44 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, image: null, imagePreview: "" })
                        }
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-slate-900"
                        title="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 text-sm text-slate-400">
                      <ImageIcon size={20} />
                      Image preview will appear here
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer nav */}
          <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
            >
              Cancel
            </button>

            <div className="flex items-center gap-2">
              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveStep(STEPS[stepIndex - 1].key)}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
                >
                  Back
                </button>
              )}
              {stepIndex < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep(STEPS[stepIndex + 1].key)}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Saving…
                    </>
                  ) : (
                    <>
                      <Plus size={15} /> Save event
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- page ---------- */

const EventsDataPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmingId, setConfirmingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isFetching } = useGetEventsQuery();
  const [createEvent, { isLoading }] = useCreateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  const events = data?.data || [];

  const filteredEvents = useMemo(() => {
    if (statusFilter === "all") return events;
    return events.filter((e) => e.category === statusFilter);
  }, [events, statusFilter]);

  const upcomingCount = events.filter((e) => e.category === "upcoming").length;
  const pastCount = events.filter((e) => e.category === "past").length;

  const handleCreated = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    setConfirmingId(null);
    try {
      await deleteEvent(id).unwrap();
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
              <CalendarDays size={16} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Events Management
            </h1>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Create new events and manage what's currently listed.
          </p>
        </div>

        <div className="flex items-end gap-5">
          <div className="flex gap-5">
            <div>
              <p className="text-2xl font-bold tabular-nums text-slate-900">{events.length}</p>
              <p className="text-xs font-medium text-slate-400">Total</p>
            </div>
            <div className="w-px bg-slate-200" />
            <div>
              <p className="text-2xl font-bold tabular-nums text-slate-900">{upcomingCount}</p>
              <p className="text-xs font-medium text-slate-400">Upcoming</p>
            </div>
            <div className="w-px bg-slate-200" />
            <div>
              <p className="text-2xl font-bold tabular-nums text-slate-900">{pastCount}</p>
              <p className="text-xs font-medium text-slate-400">Past</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
          >
            <Plus size={15} />
            New event
          </button>
        </div>
      </div>

      {/* ---------- Events list (now full width) ---------- */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-slate-900">All events</h2>
          <div className="flex items-center gap-2">
            {isFetching && <Loader2 size={14} className="animate-spin text-slate-400" />}
            <div className="flex rounded-lg border border-slate-200 p-0.5">
              {[
                { key: "all", label: "All" },
                { key: "upcoming", label: "Upcoming" },
                { key: "past", label: "Past" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setStatusFilter(f.key)}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-150 ${
                    statusFilter === f.key
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-6 py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200">
              <CalendarDays size={20} className="text-slate-400" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-700">
              {events.length === 0 ? "No events yet" : "No events match this filter"}
            </h3>
            <p className="mt-1 max-w-xs text-sm text-slate-500">
              {events.length === 0
                ? "Events you create will show up here."
                : "Try a different filter to see more events."}
            </p>
            {events.length === 0 && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-4 flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                <Plus size={14} /> Create your first event
              </button>
            )}
          </div>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {filteredEvents.map((event) => {
              const timeRange = [formatTime(event.startTime), formatTime(event.endTime)]
                .filter(Boolean)
                .join(" – ");
              const isConfirming = confirmingId === event._id;
              const isDeleting = deletingId === event._id;

              return (
                <div
                  key={event._id}
                  className="group relative flex items-start gap-4 rounded-xl border border-slate-100 p-3 transition-colors duration-150 hover:border-slate-200 hover:bg-slate-50/60"
                >
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-14 w-14 shrink-0 rounded-lg border border-slate-200 object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-400">
                      <CalendarDays size={18} />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate font-semibold text-slate-900">{event.title}</p>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          event.category === "upcoming"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {event.category}
                      </span>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays size={12} /> {formatDate(event.eventDate)}
                      </span>
                      {timeRange && (
                        <span className="inline-flex items-center gap-1">
                          <Clock size={12} /> {timeRange}
                        </span>
                      )}
                      {event.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={12} /> {event.location}
                        </span>
                      )}
                    </div>

                    {event.shortDescription && (
                      <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">
                        {event.shortDescription}
                      </p>
                    )}
                  </div>

                  {/* Delete control / inline confirm */}
                  {isConfirming ? (
                    <div className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
                      <button
                        onClick={() => handleDelete(event._id)}
                        disabled={isDeleting}
                        className="flex items-center gap-1 rounded-md bg-rose-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-rose-700 disabled:opacity-60"
                      >
                        {isDeleting ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Check size={12} />
                        )}
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmingId(null)}
                        disabled={isDeleting}
                        className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmingId(event._id)}
                      className="shrink-0 rounded-lg p-2 text-slate-400 opacity-70 transition-colors duration-150 hover:bg-rose-50 hover:text-rose-600 sm:opacity-0 sm:group-hover:opacity-100"
                      title="Delete event"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isModalOpen && (
        <NewEventModal
          onClose={() => setIsModalOpen(false)}
          onCreated={handleCreated}
          createEvent={createEvent}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default EventsDataPage;
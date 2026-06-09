import { useState } from "react";
import { Check, Mail, MapPin, Phone, AlertCircle } from "lucide-react";
import { PageShell, PageHeader } from "../components/PageShell";
import { useSubmitContactMutation } from "../admin/api/contactApi";
import { getErrorMessage } from "../admin/utils/errorMessage";

const INITIAL_FORM = { name: "", email: "", phone: "", subject: "", message: "" };

function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [submitContact, { isLoading }] = useSubmitContactMutation();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address";
    }
    if (form.phone && !/^\d{10,15}$/.test(form.phone.replace(/\s/g, ""))) {
      errs.phone = "Enter a valid phone number (10–15 digits)";
    }
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      await submitContact(form).unwrap();
      setSubmitted(true);
      setForm(INITIAL_FORM);
      setErrors({});
    } catch (err) {
      setErrors({ _global: getErrorMessage(err, "Failed to send message. Please try again.") });
    }
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Sampark"
        title="Contact Us"
        subtitle="Reach out to the samiti for any queries or support."
      />

      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="border-b px-5 py-4">
            <h2 className="text-xl font-semibold">Send Us a Message</h2>
            <p className="mt-1 text-sm text-gray-500">We would love to hear from you.</p>
          </div>

          <div className="p-5 md:p-6">
            {submitted && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700">
                <Check size={16} />
                <span>Jai Shree Shyam! Your message has been sent. We will get back to you soon.</span>
              </div>
            )}

            {errors._global && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle size={16} />
                <span>{errors._global}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <Field
                label="Your Name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />

              <Field
                label="Mobile Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
              />

              <Field
                label="Email Address"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                className="md:col-span-2"
              />

              <Field
                label="Subject"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                error={errors.subject}
                className="md:col-span-2"
              />

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className={`mt-1 w-full rounded-lg border p-3 text-sm outline-none transition focus:ring-2 focus:ring-yellow-500 ${
                    errors.message ? "border-red-400 bg-red-50" : ""
                  }`}
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-yellow-500 py-2.5 text-sm font-medium text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Sending…" : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-12 pt-0 md:grid-cols-3">
        <ContactCard
          icon={MapPin}
          title="Visit Us"
          lines={["Shyam Bhawan, Sector 21", "Jaipur, Rajasthan"]}
        />
        <ContactCard
          icon={Phone}
          title="Call Us"
          lines={["+91 98290 00000", "Mon – Sat · 10am – 7pm"]}
        />
        <ContactCard
          icon={Mail}
          title="Email Us"
          lines={["seva@shyamsabhasamiti.org", "info@shyamsabhasamiti.org"]}
        />
      </section>
    </PageShell>
  );
}

function ContactCard({ icon: Icon, title, lines }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
        <Icon size={18} className="text-yellow-600" />
      </div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <div className="mt-2 space-y-1 text-sm text-gray-600">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function Field({ label, className = "", error, required, ...props }) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className={`mt-1 w-full rounded-lg border p-3 text-sm outline-none transition focus:ring-2 focus:ring-yellow-500 ${
          error ? "border-red-400 bg-red-50" : ""
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default ContactPage;

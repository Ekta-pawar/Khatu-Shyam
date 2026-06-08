import React, { useState } from "react";
import { PageShell, PageHeader } from "../components/PageShell";

import {
  Check,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    e.target.reset();

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Sampark"
        title="Contact Us"
        subtitle="Reach out to the samiti for any queries or support."
      />

      {/* Contact Form */}
      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

          <div className="border-b px-5 py-4">
            <h2 className="text-xl font-semibold">
              Send Us a Message
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              We would love to hear from you.
            </p>
          </div>

          <div className="p-5 md:p-6">

            {submitted && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700">
                <Check size={16} />

                <span>
                  Jai Shree Shyam! Message sent successfully.
                </span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid gap-4 md:grid-cols-2"
            >
              <Field
                label="Your Name"
                name="name"
                required
              />

              <Field
                label="Mobile Number"
                name="mobile"
                required
              />

              <Field
                label="Email Address"
                name="email"
                type="email"
                required
                className="md:col-span-2"
              />

              <div className="md:col-span-2">
                <Label>Message</Label>

                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="Write your message..."
                  className="mt-1 w-full rounded-lg border p-3 text-sm outline-none transition focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <SubmitButton label="Send Message" />
            </form>

          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-12 pt-0 md:grid-cols-3">

        <ContactCard
          icon={MapPin}
          title="Visit Us"
          lines={[
            "Shyam Bhawan, Sector 21",
            "Jaipur, Rajasthan",
          ]}
        />

        <ContactCard
          icon={Phone}
          title="Call Us"
          lines={[
            "+91 98290 00000",
            "Mon – Sat · 10am – 7pm",
          ]}
        />

        <ContactCard
          icon={Mail}
          title="Email Us"
          lines={[
            "seva@shyamsabhasamiti.org",
            "info@shyamsabhasamiti.org",
          ]}
        />

      </section>
    </PageShell>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
}) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md">

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
        <Icon
          size={18}
          className="text-yellow-600"
        />
      </div>

      <h3 className="mt-3 text-lg font-semibold">
        {title}
      </h3>

      <div className="mt-2 space-y-1 text-sm text-gray-600">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <label className="text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

function Field({
  label,
  className = "",
  ...props
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>

      <input
        {...props}
        className="mt-1 w-full rounded-lg border p-3 text-sm outline-none transition focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
}

function SubmitButton({ label }) {
  return (
    <div className="md:col-span-2">
      <button
        type="submit"
        className="w-full rounded-full bg-yellow-500 py-2.5 text-sm font-medium text-black transition hover:bg-yellow-400"
      >
        {label}
      </button>
    </div>
  );
}

export default ContactPage;
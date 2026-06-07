import React, { useState } from "react";
import { PageShell, PageHeader } from "../components/PageShell";

import {
  Check,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { upcomingEvents } from "../data/events";
function ContactPage() {
  const [tab, setTab] = useState("contact");
  const [submittedTab, setSubmittedTab] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);

  const handleSubmit = (which) => (e) => {
    e.preventDefault();

    if (which === "verify") {
      const data = new FormData(e.currentTarget);

      const name = String(
        data.get("name") || ""
      ).trim();

      const number = String(
        data.get("number") || ""
      ).trim();

      const ok =
        name.length > 2 &&
        /^[0-9]{4,}$/.test(number);

      setVerifyResult({
        ok,
        msg: ok
          ? `Verified ✓ — ${name} is a registered member (ID #${number})`
          : "We could not verify these details.",
      });
    } else {
      setSubmittedTab(which);

      e.target.reset();

      setTimeout(() => {
        setSubmittedTab(null);
      }, 5000);
    }
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Sampark"
        title="Contact & Registration"
        subtitle="Reach the samiti, verify a member, or register for an upcoming event."
      />
            <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 md:grid-cols-3">

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
            "Mon–Sat · 10am – 7pm",
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
            <section className="mx-auto max-w-4xl px-5 pb-24">
        <div className="overflow-hidden rounded-3xl bg-card shadow-elegant">

          <div className="grid grid-cols-3 border-b">

            <button
              onClick={() => setTab("contact")}
              className={tab === "contact"
                ? "bg-yellow-500 py-4"
                : "py-4"}
            >
              Contact Us
            </button>

            <button
              onClick={() => setTab("verify")}
              className={tab === "verify"
                ? "bg-yellow-500 py-4"
                : "py-4"}
            >
              Verify Member
            </button>

            <button
              onClick={() => setTab("register")}
              className={tab === "register"
                ? "bg-yellow-500 py-4"
                : "py-4"}
            >
              Event Registration
            </button>

          </div>

                     <div className="p-8 md:p-12">

{submittedTab === tab &&
              tab !== "verify" && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border p-4">
                  <Check size={18} />
                  Jai Shree Shyam! Your
                  submission has been received.
                </div>
            )}
                        {tab === "contact" && (
              <form
                onSubmit={handleSubmit("contact")}
                className="grid gap-5 md:grid-cols-2"
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
                  label="Email"
                  name="email"
                  type="email"
                  required
                  className="md:col-span-2"
                />

                <div className="md:col-span-2">
                  <Label>Message</Label>

                  <textarea
                    name="message"
                    rows="5"
                    required
                    className="mt-2 w-full rounded-lg border p-3"
                  />
                </div>

                <SubmitButton label="Send Message" />
              </form>
            )}
                        {tab === "verify" && (
              <form
                onSubmit={handleSubmit("verify")}
                className="grid gap-5"
              >
                <p className="flex items-center gap-2 text-sm">
                  <ShieldCheck size={16} />
                  Verify member using ID.
                </p>

                <Field
                  label="Member Name"
                  name="name"
                  required
                />

                <Field
                  label="Member ID"
                  name="number"
                  required
                />

                {verifyResult && (
                  <div className="rounded-xl border p-4">
                    {verifyResult.msg}
                  </div>
                )}

                <SubmitButton
                  label="Verify Member"
                />
              </form>
            )}
                        {tab === "register" && (
              <form
                onSubmit={handleSubmit("register")}
                className="grid gap-5 md:grid-cols-2"
              >
                <div className="md:col-span-2">

                  <Label>Select Event</Label>

                  <select
                    name="event"
                    required
                    className="mt-2 w-full rounded-lg border p-3"
                  >
                    <option value="">
                      Select Event
                    </option>

                    {upcomingEvents.map(
                      (event) => (
                        <option
                          key={event.title}
                          value={event.title}
                        >
                          {event.title}
                        </option>
                      )
                    )}
                  </select>

                </div>

                <Field
                  label="Full Name"
                  name="name"
                  required
                />

                <Field
                  label="Mobile"
                  name="mobile"
                  required
                />

                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                />

                <Field
                  label="Attendees"
                  name="attendees"
                  type="number"
                  required
                />

                <div className="md:col-span-2">
                  <Label>
                    Special Requests
                  </Label>

                  <textarea
                    rows="3"
                    className="mt-2 w-full rounded-lg border p-3"
                  />
                </div>

                <SubmitButton
                  label="Register Event"
                />
              </form>
            )}

          </div>
        </div>
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
    <div className="rounded-2xl border p-6">
      <Icon size={20} />

      <h3 className="mt-4 text-xl">
        {title}
      </h3>

      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

function Label({ children }) {
  return (
    <label className="text-sm font-medium">
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
        className="mt-2 w-full rounded-lg border p-3"
      />
    </div>
  );
}

function SubmitButton({ label }) {
  return (
    <div className="md:col-span-2">
      <button
        type="submit"
        className="w-full rounded-full bg-yellow-500 py-3 font-medium"
      >
        {label}
      </button>
    </div>
  );
}

export default ContactPage;
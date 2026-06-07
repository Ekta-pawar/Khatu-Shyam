import React, { useState } from "react";
import { PageShell, PageHeader } from "../components/PageShell";
import { Check, Crown } from "lucide-react";
const tiers = [
  {
    name: "Bronze Member",
    price: "₹2,100 / year",
    perks: [
      "Member ID & welcome kit",
      "Event invitations",
      "Monthly bhajan satsang",
    ],
  },
  {
    name: "Silver Member",
    price: "₹11,000 / year",
    featured: true,
    perks: [
      "All Bronze benefits",
      "Reserved seating at sandhyas",
      "Family listing in directory",
      "Yatra priority booking",
    ],
  },
  {
    name: "Golden Patron",
    price: "₹1,11,000 / lifetime",
    perks: [
      "All Silver benefits",
      "Patron recognition",
      "Bhandara sponsorship credit",
      "Trustee voting rights",
    ],
  },
];
function BecomeMemberPage() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
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
        eyebrow="Sadasyata"
        title="Become a Member"
        subtitle="Choose a membership tier and join our growing devotional family."
      />
            <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-3">

          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 shadow-elegant ${
                tier.featured
                  ? "bg-yellow-500 text-black"
                  : "border bg-card"
              }`}
            >
              {tier.featured && (
                <Crown
                  size={20}
                  className="mb-3"
                />
              )}

              <h3 className="text-2xl">
                {tier.name}
              </h3>

              <p className="mt-2 text-3xl">
                {tier.price}
              </p>

              <ul className="mt-6 space-y-3">
                {tier.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex gap-2"
                  >
                    <Check size={16} />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </section>
            <section className="mx-auto max-w-4xl px-5 pb-24">

        <div className="rounded-3xl bg-card p-8 shadow-elegant md:p-12">

          <h2 className="text-3xl text-maroon">
            Membership Application
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Fill out the form below.
          </p>

          {submitted && (
            <div className="mt-6 flex items-center gap-3 rounded-xl border p-4">
              <Check size={18} />
              Jai Shree Shyam! Your
              application has been received.
            </div>
          )}

          <form
            onSubmit={onSubmit}
            className="mt-8 grid gap-5 md:grid-cols-2"
          ></form>
                      <Field
              label="Full Name"
              name="name"
              required
            />

            <Field
              label="Father / Husband Name"
              name="guardian"
              required
            />

            <Field
              label="Date Of Birth"
              name="dob"
              type="date"
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
            />

            <Field
              label="City"
              name="city"
              required
            />

            <Field
              label="Occupation"
              name="occupation"
            />

            <Field
              label="Family Members"
              name="family"
              type="number"
            />
                        <div className="md:col-span-2">
              <Label>
                Membership Tier
              </Label>

              <select
                name="tier"
                required
                className="mt-2 w-full rounded-lg border p-3"
              >
                <option value="">
                  Select Tier
                </option>

                <option value="bronze">
                  Bronze Member
                </option>

                <option value="silver">
                  Silver Member
                </option>

                <option value="golden">
                  Golden Patron
                </option>
              </select>
            </div>
                        <div className="md:col-span-2">
              <Label>
                Why do you want to join?
              </Label>

              <textarea
                rows="3"
                className="mt-2 w-full rounded-lg border p-3"
              />
            </div>
                        <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-full bg-yellow-500 py-3 font-medium"
              >
                Submit Application
              </button>
            </div>

          
        </div>
      </section>

    </PageShell>
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
  ...props
}) {
  return (
    <div>
      <Label>{label}</Label>

      <input
        {...props}
        className="mt-2 w-full rounded-lg border p-3"
      />
    </div>
  );
}

export default BecomeMemberPage;
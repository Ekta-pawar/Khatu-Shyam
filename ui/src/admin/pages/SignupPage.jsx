import React from "react";
import { Building2, Mail, Phone, User } from "lucide-react";
import { useGetSponsorsQuery } from "../api/sponsorApi";

const SponsorManagementPage = () => {
  const { data: sponsors = [], isLoading } = useGetSponsorsQuery();

  if (isLoading) {
    return <div>Loading sponsors...</div>;
  }
// const {
//   data: sponsors,
//   isLoading,
//   error,
// } = useGetSponsorsQuery();

// console.log("Sponsors:", sponsors);
// console.log("Error:", error);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sponsors</h1>
        <p className="text-slate-500">
          All sponsor requests submitted from website.
        </p>
      </div>

      <div className="grid gap-5">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor._id}
            className="rounded-3xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {sponsor.sponsorName}
                </h2>

                <p className="text-sm text-slate-500">
                  {sponsor.sponsorType}
                </p>
              </div>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                {sponsor.status || "Pending"}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <User size={16} />
                {sponsor.contactPerson}
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                {sponsor.phone}
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} />
                {sponsor.email}
              </div>

              <div className="flex items-center gap-2">
                <Building2 size={16} />
                {sponsor.city}, {sponsor.state}
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold">Address</p>
              <p>{sponsor.address}</p>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold">Message</p>
              <p>{sponsor.message || "No message provided"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorManagementPage;
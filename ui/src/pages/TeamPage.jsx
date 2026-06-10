import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageShell, PageHeader } from "../components/PageShell";
import {
  members,
  tierLabel,
} from "../data/members";
import { ArrowRight, Users, Star, Crown, Filter } from "lucide-react";

const tierOrder = [
  { id: "all", label: "All Members", icon: Users },
  { id: "golden", label: "Golden Members", icon: Crown },
  { id: "Diamond", label: "Diamond Members", icon: Star },
  { id: "KaryaKarani", label: "Karyakarani Members", icon: Users },
];

// Additional dummy data for more members
const dummyMembers = [
  {
    id: "dummy-1",
    name: "Shri Rajesh Khanna",
    tier: "golden",
    title: "Senior Patron & Education Seva",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
    birthday: "15 January 1965",
    joinedYear: 2005,
    city: "Jaipur, Rajasthan",
    contribution: "Education Scholarship Program",
    bio: "Shri Rajesh Ji has been sponsoring education for underprivileged children for the past 15 years and actively participates in all samiti events.",
    business: {
      company: "Khanna Educational Trust",
      position: "Chairman",
      experience: "30+ years in education sector",
      industry: "Education",
    },
    family: [
      { name: "Smt. Anita Khanna", relation: "Wife", birthday: "20 March 1968", occupation: "Teacher" },
      { name: "Shri Abhishek Khanna", relation: "Son", birthday: "10 June 1995", occupation: "Doctor" },
    ],
  },
  {
    id: "dummy-2",
    name: "Smt. Priyanka Mehta",
    tier: "golden",
    title: "Women's Wing President",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop",
    birthday: "5 May 1975",
    joinedYear: 2010,
    city: "Delhi NCR",
    contribution: "Mahila Mandal Coordinator",
    bio: "Smt. Priyanka Ji leads the women's wing and organizes monthly bhajan sessions, cooking competitions, and charitable activities for women devotees.",
    business: {
      company: "Mehta Interior Designs",
      position: "Founder",
      experience: "20+ years in interior design",
      industry: "Interior Design",
    },
    family: [
      { name: "Shri Amit Mehta", relation: "Husband", birthday: "12 August 1973", occupation: "Architect" },
      { name: "Ku. Riya Mehta", relation: "Daughter", birthday: "25 December 2005", occupation: "Student" },
    ],
  },
  {
    id: "dummy-3",
    name: "Shri Vijay Singh",
    tier: "Diamond",
    title: "Medical Camp Coordinator",
    photo: "https://images.unsplash.com/photo-1580894732931-5f6e9a8b7b3c?w=400&h=500&fit=crop",
    birthday: "8 August 1980",
    joinedYear: 2015,
    city: "Gurugram, Haryana",
    contribution: "Free Health Checkup Camps",
    bio: "Shri Vijay Ji organizes free medical camps during festivals and coordinates with doctors to provide healthcare services to needy devotees.",
    business: {
      company: "Singh Healthcare Solutions",
      position: "CEO",
      experience: "15+ years in healthcare",
      industry: "Healthcare",
    },
    family: [
      { name: "Smt. Neha Singh", relation: "Wife", birthday: "15 November 1982", occupation: "Doctor" },
      { name: "Master Arjun Singh", relation: "Son", birthday: "3 March 2012", occupation: "Student" },
    ],
  },
  {
    id: "dummy-4",
    name: "Shri Alok Sharma",
    tier: "Diamond",
    title: "Cultural Program Director",
    photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=500&fit=crop",
    birthday: "28 February 1985",
    joinedYear: 2016,
    city: "Noida, UP",
    contribution: "Janmashtami Cultural Events",
    bio: "Shri Alok Ji directs all cultural programs during Janmashtami Mahotsav, coordinating with artists and managing stage performances.",
    business: {
      company: "Sharma Events & Entertainment",
      position: "Director",
      experience: "18+ years in event management",
      industry: "Events & Entertainment",
    },
    family: [
      { name: "Smt. Pooja Sharma", relation: "Wife", birthday: "10 July 1987", occupation: "Dancer" },
      { name: "Ku. Ishita Sharma", relation: "Daughter", birthday: "22 August 2015", occupation: "Student" },
    ],
  },
  {
    id: "dummy-5",
    name: "Shri Mukesh Agarwal",
    tier: "KaryaKarani",
    title: "Transport Coordinator",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
    birthday: "12 December 1992",
    joinedYear: 2019,
    city: "Faridabad, Haryana",
    contribution: "Bus Yatra Management",
    bio: "Shri Mukesh Ji manages all transportation for monthly yatras to Khatu Shyam Ji and Salasar Balaji, ensuring safe and comfortable journeys.",
    business: {
      company: "Agarwal Travels",
      position: "Owner",
      experience: "10+ years in transport",
      industry: "Transport & Logistics",
    },
    family: [
      { name: "Smt. Kavita Agarwal", relation: "Wife", birthday: "5 February 1994", occupation: "Homemaker" },
      { name: "Master Laksh Agarwal", relation: "Son", birthday: "15 July 2019" },
    ],
  },
  {
    id: "dummy-6",
    name: "Shri Ravi Shankar",
    tier: "KaryaKarani",
    title: "Prasad Distribution Head",
    photo: "https://images.unsplash.com/photo-1580894732931-5f6e9a8b7b3c?w=400&h=500&fit=crop",
    birthday: "3 March 1990",
    joinedYear: 2018,
    city: "Ghaziabad, UP",
    contribution: "Annapurna Bhandara",
    bio: "Shri Ravi Ji coordinates the Annapurna Bhandara during festivals, managing food preparation and distribution to thousands of devotees.",
    business: {
      company: "Shankar Sweets & Catering",
      position: "Proprietor",
      experience: "12+ years in catering",
      industry: "Food & Catering",
    },
    family: [
      { name: "Smt. Sunita Shankar", relation: "Wife", birthday: "18 August 1992", occupation: "Homemaker" },
      { name: "Master Krish Shankar", relation: "Son", birthday: "25 December 2018" },
    ],
  },
  {
    id: "dummy-7",
    name: "Shri Pankaj Mittal",
    tier: "KaryaKarani",
    title: "Decoration Committee Head",
    photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=500&fit=crop",
    birthday: "20 July 1995",
    joinedYear: 2020,
    city: "Delhi NCR",
    contribution: "Festival Decoration & Lighting",
    bio: "Shri Pankaj Ji leads the decoration team, creating beautiful mandap setups and lighting arrangements for all samiti events.",
    business: {
      company: "Mittal Events & Decor",
      position: "Founder",
      experience: "8+ years in event decoration",
      industry: "Event Decoration",
    },
    family: [
      { name: "Smt. Ritu Mittal", relation: "Wife", birthday: "10 October 1996", occupation: "Fashion Designer" },
    ],
  },
];

// Merge original members with dummy data
const allMembers = [...members, ...dummyMembers];

function TeamPage() {
  const [activeTier, setActiveTier] = useState("all");

  const getFilteredMembers = () => {
    if (activeTier === "all") {
      return allMembers;
    }
    return allMembers.filter((m) => m.tier === activeTier);
  };

  const filteredMembers = getFilteredMembers();

  return (
    <PageShell>
      <PageHeader
        eyebrow="हमारी टीम"
        title="Our Team & Patrons"
        subtitle="तीन श्रेणियों के सदस्य हमारी समिति को आकार देते हैं — गोल्डन सदस्य जिनकी आजीवन सेवा ने इस संगत का निर्माण किया, और डायमंड एवं कार्यकारणी सदस्य जो हर दिन कार्य को आगे बढ़ाते हैं।"
      />

      <section className="mx-auto max-w-7xl px-5 py-12">
        {/* Filter Buttons - Responsive */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {tierOrder.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTier(id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeTier === id
                  ? id === "golden"
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-200"
                    : id === "Diamond"
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-blue-200"
                    : id === "KaryaKarani"
                    ? "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg shadow-orange-200"
                    : "bg-gradient-to-r from-maroon to-maroon/80 text-white shadow-lg"
                  : "border-2 border-gray-300 bg-white text-gray-600 hover:border-maroon hover:text-maroon"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Member Count */}
        <div className="mb-8 text-center">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-maroon">{filteredMembers.length}</span> members
          </p>
        </div>

        {/* Members Grid - Responsive: 2 columns on large, 1 on medium and small */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {filteredMembers.map((member) => (
            <Link
              key={member.id}
              to={`/team/${member.id}`}
              className="group grid gap-6 rounded-3xl bg-card p-6 shadow-elegant transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:grid-cols-[140px_1fr]"
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-col justify-center">
                {/* Tier Badge */}
                <div className="mb-2">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      member.tier === "golden"
                        ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black"
                        : member.tier === "Diamond"
                        ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white"
                        : "bg-gradient-to-r from-orange-400 to-red-500 text-white"
                    }`}
                  >
                    {tierLabel[member.tier]}
                  </span>
                </div>

                <p className="text-xs uppercase tracking-[0.3em] text-saffron">
                  {member.title}
                </p>

                <h3 className="mt-2 text-2xl text-maroon md:text-3xl">
                  {member.name}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <p className="text-xs text-muted-foreground">
                    📍 {member.city}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    📅 Joined {member.joinedYear}
                  </p>
                </div>

                <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-maroon transition-all group-hover:gap-2 group-hover:text-saffron">
                  View Full Profile
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Users size={40} className="text-gray-400" />
            </div>
            <p className="text-lg text-muted-foreground">No members found in this category.</p>
          </div>
        )}
      </section>
    </PageShell>
  );
}

export default TeamPage;
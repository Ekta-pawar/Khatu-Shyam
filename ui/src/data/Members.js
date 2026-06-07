import member1 from "../assets/member-1.jpg";
import member2 from "../assets/member-2.jpg";
import member3 from "../assets/member-3.jpg";

export const members = [
  {
    id: "rameshwar-agarwal",
    name: "Shri Rameshwar Agarwal",
    tier: "golden",
    title: "President & Founding Patron",
    photo: member1,
    birthday: "12 March 1958",
    joinedYear: 1995,
    city: "Jaipur, Rajasthan",
    contribution:
      "Lifetime Patron · Annapurna Bhandara Sponsor",

    bio:
      "A devoted servant of Shyam Baba for over three decades, Shri Rameshwar Ji has led the samiti through every Phalgun Mela and bhajan sandhya since its founding.",

    business: {
      company:
        "Agarwal Textiles & Exports Pvt. Ltd.",
      position:
        "Chairman & Managing Director",
      experience:
        "42+ years in textile manufacturing and export",
      industry:
        "Textiles · Handlooms · Global Exports",

      productsOrServices:
        "Premium cotton sarees, Rajasthani bandhej fabrics, hand-block printed home furnishings, and bulk handloom exports.",

      about:
        "Founded in 1982 in Jaipur, Agarwal Textiles is one of Rajasthan's largest family-run handloom houses.",
    },

    family: [
      {
        name:
          "Smt. Sushila Devi Agarwal",
        relation: "Wife",
        birthday:
          "5 August 1962",
        occupation:
          "Mahila Mandal Convenor",
      },
      {
        name:
          "Shri Mohit Agarwal",
        relation:
          "Elder Son",
        birthday:
          "18 November 1985",
        occupation:
          "Director, Agarwal Textiles",
      },
      {
        name:
          "Shri Rohit Agarwal",
        relation:
          "Younger Son",
        birthday:
          "2 February 1989",
        occupation:
          "Co-founder, Shyam Exports LLP",
      },
      {
        name:
          "Smt. Priyanka Agarwal",
        relation:
          "Daughter-in-law",
        birthday:
          "27 June 1988",
        occupation:
          "Architect",
      },
      {
        name:
          "Ku. Aaradhya Agarwal",
        relation:
          "Granddaughter",
        birthday:
          "14 January 2015",
      },
    ],
  },

  {
    id: "manish-sharma",
    name:
      "Shri Manish Sharma",
    tier: "silver",
    title:
      "General Secretary",
    photo: member2,

    birthday:
      "21 September 1972",

    joinedYear: 2004,

    city:
      "Delhi NCR",

    contribution:
      "Coordinator · Khatu Nishan Yatra",

    bio:
      "Shri Manish Ji coordinates all yatras, weekly satsangs, and inter-city devotee outreach.",

    business: {
      company:
        "Sharma Logistics & Cold Chain",

      position:
        "Founder & CEO",

      experience:
        "21 years in supply chain & logistics",

      industry:
        "Logistics · Cold Chain · FMCG Distribution",

      productsOrServices:
        "Temperature-controlled warehousing, last-mile delivery, and pan-India FMCG distribution.",

      about:
        "Sharma Logistics serves over 200 enterprise clients across India.",
    },

    family: [
      {
        name:
          "Smt. Rekha Sharma",
        relation: "Wife",
        birthday:
          "9 April 1976",
        occupation:
          "Homemaker · Bhajan Singer",
      },
      {
        name:
          "Ku. Anaya Sharma",
        relation:
          "Daughter",
        birthday:
          "30 May 2008",
        occupation:
          "Student",
      },
      {
        name:
          "Master Arnav Sharma",
        relation: "Son",
        birthday:
          "11 October 2012",
        occupation:
          "Student",
      },
    ],
  },

  {
    id: "vikram-mittal",

    name:
      "Shri Vikram Mittal",

    tier: "bronze",

    title:
      "Treasurer & Youth Wing Lead",

    photo: member3,

    birthday:
      "7 July 1991",

    joinedYear: 2017,

    city:
      "Gurugram, Haryana",

    contribution:
      "Digital Seva · Youth Bhajan Mandali",

    bio:
      "Shri Vikram Ji leads the youth wing and manages the samiti's transparent financial records.",

    business: {
      company:
        "MittalTech Solutions",

      position:
        "Co-Founder & CTO",

      experience:
        "9 years in software & cloud",

      industry:
        "Information Technology · SaaS",

      productsOrServices:
        "Cloud ERP, AI inventory forecasting and business automation.",

      about:
        "A bootstrapped SaaS company serving manufacturers across India.",
    },

    family: [
      {
        name:
          "Smt. Nisha Mittal",

        relation:
          "Wife",

        birthday:
          "16 December 1993",

        occupation:
          "UX Designer",
      },

      {
        name:
          "Master Kavyansh Mittal",

        relation:
          "Son",

        birthday:
          "3 March 2020",
      },

      {
        name:
          "Shri Pradeep Mittal",

        relation:
          "Father",

        birthday:
          "24 February 1962",

        occupation:
          "Retired Bank Manager",
      },
    ],
  },
];

export const getMember = (id) => {
  return members.find(
    (member) => member.id === id
  );
};

export const tierLabel = {
  golden: "Golden Member",
  silver: "Silver Member",
  bronze: "Bronze Member",
};
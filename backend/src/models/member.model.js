const mongoose = require("mongoose");

const familyMemberSchema = new mongoose.Schema(
  {
    name: String,
    relation: String,
    dob: Date,
    age: Number,
    occupation: String,
    phone: String,
  },
  { _id: false }
);

const anniversarySchema = new mongoose.Schema(
  {
    husbandName: String,
    wifeName: String,
    anniversaryDate: Date,
    note: String,
  },
  { _id: false }
);

const customDateSchema = new mongoose.Schema(
  {
    title: String,
    date: Date,
    description: String,
  },
  { _id: false }
);

const birthdaySchema = new mongoose.Schema(
  {
    personName: String,
    relation: String,
    birthDate: Date,
    note: String,
  },
  { _id: false }
);

const memberSchema = new mongoose.Schema(
  {
    // Membership
    tier: String,

    // Personal Information
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    fatherName: String,
    motherName: String,

    gender: String,

    phone: {
      type: String,
      trim: true,
    },

    alternatePhone: String,

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    birthday: Date,

    // Event / guest tracking
    eventName: String,
    eventDate: Date,
    additionalInfo: String,

    occupation: String,

    bloodGroup: String,

    profileImage: String,
    additionalImages: {
      type: [String],
      default: [],
    },
    familyImages: {
      type: [String],
      default: [],
    },

    // Address
    address: String,
    city: String,
    state: String,
    country: {
      type: String,
      default: "India",
    },
    pincode: String,

    // Professional
    hasBusiness: {
      type: Boolean,
      default: false,
    },

    hasJob: {
      type: Boolean,
      default: false,
    },

    jobDetails: {
      jobType: String,
      companyName: String,
      designation: String,
      department: String,
      governmentDepartment: String,
      jobLocation: String,
      officeAddress: String,
      otherDetails: String,
    },

    businessDetails: {
      businessName: String,
      businessType: String,
      businessAddress: String,
      businessPhone: String,
      businessEmail: String,
      businessWebsite: String,
      businessDescription: String,
      businessImages: [String],
    },

    familyMembers: [familyMemberSchema],

    anniversaries: [anniversarySchema],

    customDates: [customDateSchema],

    birthdays: [birthdaySchema],
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Member ||
  mongoose.model("Member", memberSchema);
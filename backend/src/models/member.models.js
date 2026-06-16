const mongoose = require("mongoose");

const familyMemberSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    relation: { type: String, trim: true },
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

const memberSchema = new mongoose.Schema(
  {
    // Membership
    tier: {
      type: String,
      enum: ["Diamond Members", "Golden Members", "Karyakarani Members"],
    },

    // Personal Information
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    fatherName: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    birthday: Date,

    occupation: String,

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    profileImage: String,

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
      jobType: {
        type: String,
        enum: ["Private Job", "Government Job", "Other"],
      },

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
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Member ||
  mongoose.model("Member", memberSchema);
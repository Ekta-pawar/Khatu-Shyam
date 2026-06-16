const mongoose = require("mongoose");
const { GENDERS, BLOOD_GROUPS } = require("../constants");

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const birthdaySchema = new mongoose.Schema(
  {
    personName: { type: String, required: true, trim: true },
    relation: { type: String, trim: true },
    birthDate: { type: Date, required: true },
    note: { type: String, trim: true, maxlength: 500 },
  },
  { _id: false }
);

const anniversarySchema = new mongoose.Schema(
  {
    husbandName: { type: String, required: true, trim: true },
    wifeName: { type: String, required: true, trim: true },
    anniversaryDate: { type: Date, required: true },
    note: { type: String, trim: true, maxlength: 500 },
  },
  { _id: false }
);

const customSpecialDateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    description: { type: String, trim: true, maxlength: 500 },
  },
  { _id: false }
);

/* ------------------------------------- Family details (dynamic) ------------------------------------ */

const familyMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    relation: { type: String, required: true, trim: true },
    age: { type: Number, min: 0, max: 150 },
    occupation: { type: String, trim: true },
    phone: { type: String, trim: true },
    image: { type: imageSchema, default: null },
  },
  { _id: true }
);

/* ----------------------------------------- Member schema -------------------------------------------- */

const memberSchema = new mongoose.Schema(
  {
    // A. Personal information
    firstName: { type: String,  trim: true, maxlength: 50 },
    lastName: { type: String, trim: true, maxlength: 50 },
    fatherName: { type: String, trim: true, maxlength: 100 },
    motherName: { type: String, trim: true, maxlength: 100 },
    gender: { type: String, enum: GENDERS, required: true },
    phone: { type: String, required: true, trim: true, maxlength: 15 },
    alternatePhone: { type: String, trim: true, maxlength: 15 },
    email: { type: String, trim: true, lowercase: true },
    occupation: { type: String, trim: true, maxlength: 100 },
    bloodGroup: { type: String, enum: [...BLOOD_GROUPS, ""], default: "" },

    address: { type: String, trim: true, maxlength: 250 },
    city: { type: String, trim: true, maxlength: 100 },
    state: { type: String, trim: true, maxlength: 100 },
    country: { type: String, trim: true, maxlength: 100, default: "India" },
    pincode: { type: String, trim: true, maxlength: 10 },

    profileImage: { type: imageSchema, default: null },
    additionalImages: { type: [imageSchema], default: [] },

    // B. Special dates (optional sections)
    specialDates: {
      birthdays: { type: [birthdaySchema], default: [] },
      anniversaries: { type: [anniversarySchema], default: [] },
      customDates: { type: [customSpecialDateSchema], default: [] },
    },

    // C. Family details
    familyDetails: {
      members: { type: [familyMemberSchema], default: [] },
      images: { type: [imageSchema], default: [] },
    },

    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId},
    updatedBy: { type: mongoose.Schema.Types.ObjectId},
  },
  { timestamps: true }
);

memberSchema.index({ firstName: "text", lastName: "text", phone: "text", email: "text", city: "text" });

memberSchema.path("familyDetails.images").validate(function validateFamilyImageCount(images) {
  return images.length <= 5;
}, "Family details section supports a maximum of 5 images");

memberSchema.virtual("fullName").get(function getFullName() {
  return `${this.firstName} ${this.lastName}`.trim();
});

memberSchema.set("toJSON", { virtuals: true });
memberSchema.set("toObject", { virtuals: true });

// Explicit collection name: this database is shared with another application
// that already has an unrelated 'members' collection with a different schema.
const Member = mongoose.model("Member", memberSchema, "family_members");

module.exports = Member;

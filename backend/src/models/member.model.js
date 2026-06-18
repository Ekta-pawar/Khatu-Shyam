// const mongoose = require("mongoose");
// const { GENDERS, BLOOD_GROUPS } = require("../constants");

// const imageSchema = new mongoose.Schema(
//   {
//     url: { type: String, required: true },
//     publicId: { type: String, required: true },
//   },
//   { _id: false }
// );

// const birthdaySchema = new mongoose.Schema(
//   {
//     personName: { type: String, required: true, trim: true },
//     relation: { type: String, trim: true },
//     birthDate: { type: Date, required: true },
//     note: { type: String, trim: true, maxlength: 500 },
//   },
//   { _id: false }
// );

// const anniversarySchema = new mongoose.Schema(
//   {
//     husbandName: { type: String, required: true, trim: true },
//     wifeName: { type: String, required: true, trim: true },
//     anniversaryDate: { type: Date, required: true },
//     note: { type: String, trim: true, maxlength: 500 },
//   },
//   { _id: false }
// );

// const customSpecialDateSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     date: { type: Date, required: true },
//     description: { type: String, trim: true, maxlength: 500 },
//   },
//   { _id: false }
// );

// /* ------------------------------------- Family details (dynamic) ------------------------------------ */

// const familyMemberSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     relation: { type: String, required: true, trim: true },
//     age: { type: Number, min: 0, max: 150 },
//     occupation: { type: String, trim: true },
//     phone: { type: String, trim: true },
//     image: { type: imageSchema, default: null },
//   },
//   { _id: true }
// );

// /* ----------------------------------------- Member schema -------------------------------------------- */

// const memberSchema = new mongoose.Schema(
//   {
//     // A. Personal information
//     firstName: { type: String,  trim: true, maxlength: 50 },
//     lastName: { type: String, trim: true, maxlength: 50 },
//     fatherName: { type: String, trim: true, maxlength: 100 },
//     motherName: { type: String, trim: true, maxlength: 100 },
//     gender: { type: String, enum: GENDERS, required: true },
//     phone: { type: String, required: true, trim: true, maxlength: 15 },
//     alternatePhone: { type: String, trim: true, maxlength: 15 },
//     email: { type: String, trim: true, lowercase: true },
//     occupation: { type: String, trim: true, maxlength: 100 },
//     bloodGroup: { type: String, enum: [...BLOOD_GROUPS, ""], default: "" },

//     address: { type: String, trim: true, maxlength: 250 },
//     city: { type: String, trim: true, maxlength: 100 },
//     state: { type: String, trim: true, maxlength: 100 },
//     country: { type: String, trim: true, maxlength: 100, default: "India" },
//     pincode: { type: String, trim: true, maxlength: 10 },

//     profileImage: { type: imageSchema, default: null },
//     additionalImages: { type: [imageSchema], default: [] },

//     // B. Special dates (optional sections)
//     specialDates: {
//       birthdays: { type: [birthdaySchema], default: [] },
//       anniversaries: { type: [anniversarySchema], default: [] },
//       customDates: { type: [customSpecialDateSchema], default: [] },
//     },

//     // C. Family details
//     familyDetails: {
//       members: { type: [familyMemberSchema], default: [] },
//       images: { type: [imageSchema], default: [] },
//     },

//     isActive: { type: Boolean, default: true },
//     createdBy: { type: mongoose.Schema.Types.ObjectId},
//     updatedBy: { type: mongoose.Schema.Types.ObjectId},
//   },
//   { timestamps: true }
// );

// memberSchema.index({ firstName: "text", lastName: "text", phone: "text", email: "text", city: "text" });

// memberSchema.path("familyDetails.images").validate(function validateFamilyImageCount(images) {
//   return images.length <= 5;
// }, "Family details section supports a maximum of 5 images");

// memberSchema.virtual("fullName").get(function getFullName() {
//   return `${this.firstName} ${this.lastName}`.trim();
// });

// memberSchema.set("toJSON", { virtuals: true });
// memberSchema.set("toObject", { virtuals: true });

// // Explicit collection name: this database is shared with another application
// // that already has an unrelated 'members' collection with a different schema.
// const Member = mongoose.model("Member", memberSchema, "family_members");

// module.exports = Member;
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

    gender: String,

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

    bloodGroup: String,

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
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Member ||
  mongoose.model("Member", memberSchema);
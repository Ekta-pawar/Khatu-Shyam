const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ADMIN_ROLES } = require("../constants");

const adminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, minlength: 2, maxlength: 30 },
    lastName: { type: String, required: true, trim: true, minlength: 2, maxlength: 30 },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, select: false },
    phoneNumber: { type: String, required: true, trim: true, unique: true, minlength: 10, maxlength: 15 },
    role: { type: String, enum: Object.values(ADMIN_ROLES), default: ADMIN_ROLES.ADMIN },
    profileImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

adminSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

adminSchema.methods.toSafeObject = function toSafeObject() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Explicit collection name: this database is shared with another application
// that already has an unrelated 'admins' collection with a different schema.
const Admin = mongoose.model("Admin", adminSchema, "family_admins");

module.exports = Admin;

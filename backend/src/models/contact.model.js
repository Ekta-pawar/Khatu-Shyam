const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, maxlength: 15 },
    subject: { type: String, required: true, trim: true, maxlength: 150 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },

    isRead: { type: Boolean, default: false },
    isResolved: { type: Boolean, default: false },
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
  },
  { timestamps: true }
);

contactSchema.index({ createdAt: -1 });

// Explicit collection name: this database is shared with another application
// that already has an unrelated 'contacts' collection with a different schema.
const Contact = mongoose.model("Contact", contactSchema, "family_contacts");

module.exports = Contact;

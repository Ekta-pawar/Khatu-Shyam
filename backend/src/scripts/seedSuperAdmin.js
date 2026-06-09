require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });

const mongoose = require("mongoose");
const Admin = require("../models/admin.model");
const { ADMIN_ROLES } = require("../constants");

const EMAIL = process.env.SUPER_ADMIN_EMAIL || "ssksss@gmail.com";
const PASSWORD = process.env.SUPER_ADMIN_PASSWORD || "Admin@1234";
const PHONE = process.env.SUPER_ADMIN_PHONE || "9000000000";

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const existing = await Admin.findOne({ email: EMAIL });
  if (existing) {
    console.log(`Super admin already exists: ${EMAIL}`);
    await mongoose.disconnect();
    process.exit(0);
  }

  await Admin.create({
    firstName: "Super",
    lastName: "Admin",
    email: EMAIL,
    password: PASSWORD,
    phoneNumber: PHONE,
    role: ADMIN_ROLES.SUPER_ADMIN,
    createdBy: null,
  });

  console.log(`Super admin created successfully!`);
  console.log(`  Email   : ${EMAIL}`);
  console.log(`  Password: ${PASSWORD}`);
  console.log(`  Login at: http://localhost:5173/admin/login`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

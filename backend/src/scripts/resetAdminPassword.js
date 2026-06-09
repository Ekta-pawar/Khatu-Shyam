require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });

const mongoose = require("mongoose");
const Admin = require("../models/admin.model");
const { ADMIN_ROLES } = require("../constants");

const EMAIL = process.env.SUPER_ADMIN_EMAIL || "ssksss@gmail.com";
const PASSWORD = process.env.SUPER_ADMIN_PASSWORD || "Admin@1234";
const PHONE = process.env.SUPER_ADMIN_PHONE || "9000000000";

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  let admin = await Admin.findOne({ email: EMAIL }).select("+password");

  if (!admin) {
    console.log(`No admin found with ${EMAIL}. Creating fresh super admin...`);
    admin = new Admin({
      firstName: "Super",
      lastName: "Admin",
      email: EMAIL,
      password: PASSWORD,
      phoneNumber: PHONE,
      role: ADMIN_ROLES.SUPER_ADMIN,
    });
  } else {
    console.log(`Found admin: ${EMAIL}. Resetting credentials...`);
    admin.firstName = admin.firstName || "Super";
    admin.lastName = admin.lastName || "Admin";
    admin.password = PASSWORD;
    admin.isActive = true;
    admin.role = ADMIN_ROLES.SUPER_ADMIN;
  }

  await admin.save();

  console.log("Done!");
  console.log(`  Email   : ${EMAIL}`);
  console.log(`  Password: ${PASSWORD}`);
  console.log(`  Role    : super_admin`);
  console.log(`  Login   : http://localhost:5173/admin/login`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});

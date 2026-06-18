const Member = require("../models/member.model");
const Sponsor = require("../models/sponsor.model");
const Contact = require("../models/contact.model");
const Admin = require("../models/admin.model");

const getDashboardStats = async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();

    const totalSponsors = await Sponsor.countDocuments();

    const totalMessages = await Contact.countDocuments();

    const totalAdmins = await Admin.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalMembers,
        totalSponsors,
        totalMessages,
        totalAdmins,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};

module.exports = {
  getDashboardStats,
};
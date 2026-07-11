const Team = require("../models/team.model");
const cloudinary = require("../config/cloudinary");

const uploadFileToCloudinary = async (file) => {
  const b64 = Buffer.from(file.buffer).toString("base64");
  const dataURI = `data:${file.mimetype};base64,${b64}`;
  const result = await cloudinary.uploader.upload(dataURI, {
    folder: "khatu-shyam/team",
  });
  return result.secure_url;
};

const extractCloudinaryPublicId = (url) => {
  const match = typeof url === "string" && url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
  return match ? match[1] : null;
};

const deleteCloudinaryAsset = async (url) => {
  const publicId = extractCloudinaryPublicId(url);
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId).catch((error) => {
    console.error(`Failed to delete Cloudinary asset ${publicId}:`, error.message);
  });
};

// Fields visible to anonymous public requests.
const PUBLIC_TEAM_FIELDS = "fullName tier designation profileImage occupation city state country createdAt";

exports.createTeamMember = async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.phone) {
      const existing = await Team.findOne({ phone: data.phone });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "A team member with this phone number already exists",
        });
      }
    }

    if (req.file) {
      data.profileImage = await uploadFileToCloudinary(req.file);
    }

    const teamMember = await Team.create(data);

    res.status(201).json({
      success: true,
      teamMember,
    });
  } catch (error) {
    console.error("CREATE TEAM MEMBER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    const data = { ...req.body };

    if (data.phone && data.phone !== teamMember.phone) {
      const existing = await Team.findOne({ phone: data.phone, _id: { $ne: teamMember._id } });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "A team member with this phone number already exists",
        });
      }
    }

    let staleAsset = null;

    if (req.file) {
      if (teamMember.profileImage) staleAsset = teamMember.profileImage;
      data.profileImage = await uploadFileToCloudinary(req.file);
    }

    Object.assign(teamMember, data);
    await teamMember.save();

    if (staleAsset) await deleteCloudinaryAsset(staleAsset);

    res.status(200).json({
      success: true,
      teamMember,
    });
  } catch (error) {
    console.error("UPDATE TEAM MEMBER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTeamMembers = async (req, res) => {
  try {
    const query = Team.find().sort({ createdAt: -1 });
    if (!req.admin) query.select(PUBLIC_TEAM_FIELDS);
    const teamMembers = await query;

    res.status(200).json({
      success: true,
      teamMembers,
      data: teamMembers,
    });
  } catch (error) {
    console.error("GET TEAM MEMBERS ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTeamMemberById = async (req, res) => {
  try {
    const query = Team.findById(req.params.id);
    if (!req.admin) query.select(PUBLIC_TEAM_FIELDS);
    const teamMember = await query;

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      teamMember,
      data: teamMember,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await Team.findByIdAndDelete(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    if (teamMember.profileImage) await deleteCloudinaryAsset(teamMember.profileImage);

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

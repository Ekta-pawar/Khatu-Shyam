const Member = require("../models/member.model");
const cloudinary = require("../config/cloudinary");

const JSON_FIELDS = [
  "jobDetails",
  "businessDetails",
  "familyMembers",
  "anniversaries",
  "customDates",
  "specialDates",
  "familyDetails",
];

const uploadFileToCloudinary = async (file) => {
  const b64 = Buffer.from(file.buffer).toString("base64");
  const dataURI = `data:${file.mimetype};base64,${b64}`;
  const result = await cloudinary.uploader.upload(dataURI, {
    folder: "khatu-shyam/members",
  });
  return result.secure_url;
};

// Cloudinary URLs look like: .../upload/v<version>/<folder>/<public_id>.<ext>
const extractCloudinaryPublicId = (url) => {
  const match = typeof url === "string" && url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
  return match ? match[1] : null;
};

const deleteCloudinaryAssets = async (urls = []) => {
  const publicIds = urls.map(extractCloudinaryPublicId).filter(Boolean);
  await Promise.all(
    publicIds.map((publicId) =>
      cloudinary.uploader.destroy(publicId).catch((error) => {
        console.error(`Failed to delete Cloudinary asset ${publicId}:`, error.message);
      })
    )
  );
};

const normalizeMemberPayload = (body) => {
  const data = { ...body };

  for (const field of JSON_FIELDS) {
    if (typeof data[field] === "string" && data[field]) {
      data[field] = JSON.parse(data[field]);
    }
  }

  if (typeof data.hasBusiness === "string") data.hasBusiness = data.hasBusiness === "true";
  if (typeof data.hasJob === "string") data.hasJob = data.hasJob === "true";

  if (!data.fullName && (data.firstName || data.lastName)) {
    data.fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
  }

  if (data.specialDates) {
    if (data.specialDates.anniversaries?.length) data.anniversaries = data.specialDates.anniversaries;
    if (data.specialDates.customDates?.length) data.customDates = data.specialDates.customDates;
    if (data.specialDates.birthdays?.length) data.birthdays = data.specialDates.birthdays;
    delete data.specialDates;
  }

  if (data.familyDetails?.members?.length) {
    data.familyMembers = data.familyDetails.members;
    delete data.familyDetails;
  }

  return data;
};

exports.createMember = async (req, res) => {
  try {
    const data = normalizeMemberPayload(req.body);

    if (data.phone) {
      const existing = await Member.findOne({ phone: data.phone });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Member with this phone number already exists",
        });
      }
    }

    const profileImageFile = req.files?.profileImage?.[0];
    if (profileImageFile) {
      data.profileImage = await uploadFileToCloudinary(profileImageFile);
    }

    const additionalImageFiles = req.files?.additionalImages || [];
    if (additionalImageFiles.length) {
      data.additionalImages = await Promise.all(additionalImageFiles.map(uploadFileToCloudinary));
    }

    const familyImageFiles = req.files?.familyImages || [];
    if (familyImageFiles.length) {
      data.familyImages = await Promise.all(familyImageFiles.map(uploadFileToCloudinary));
    }

    const member = await Member.create(data);

    res.status(201).json({
      success: true,
      member,
    });
  } catch (error) {
    console.error("CREATE MEMBER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const data = normalizeMemberPayload(req.body);

    if (data.phone && data.phone !== member.phone) {
      const existing = await Member.findOne({ phone: data.phone, _id: { $ne: member._id } });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Member with this phone number already exists",
        });
      }
    }

    const staleAssets = [];

    const profileImageFile = req.files?.profileImage?.[0];
    if (profileImageFile) {
      if (member.profileImage) staleAssets.push(member.profileImage);
      data.profileImage = await uploadFileToCloudinary(profileImageFile);
    }

    const additionalImageFiles = req.files?.additionalImages || [];
    if (additionalImageFiles.length) {
      staleAssets.push(...member.additionalImages);
      data.additionalImages = await Promise.all(additionalImageFiles.map(uploadFileToCloudinary));
    }

    const familyImageFiles = req.files?.familyImages || [];
    if (familyImageFiles.length) {
      staleAssets.push(...member.familyImages);
      data.familyImages = await Promise.all(familyImageFiles.map(uploadFileToCloudinary));
    }

    Object.assign(member, data);
    await member.save();

    if (staleAssets.length) await deleteCloudinaryAssets(staleAssets);

    res.status(200).json({
      success: true,
      member,
    });
  } catch (error) {
    console.error("UPDATE MEMBER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Fields visible to anonymous public requests. Full documents (including
// phone, email, address, blood group, birthday, business/job/family details)
// are only returned when the request comes from a logged-in admin.
const PUBLIC_MEMBER_FIELDS =
  "fullName profileImage tier gender occupation city state country createdAt eventName eventDate additionalInfo";

exports.getMembers = async (req, res) => {
  try {
    const query = Member.find().sort({ createdAt: -1 });
    if (!req.admin) query.select(PUBLIC_MEMBER_FIELDS);
    const members = await query;

    res.status(200).json({
      success: true,
      members,
      data: members,
    });
  } catch (error) {
    console.error("GET MEMBERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getMemberById = async (req, res) => {
  try {
    const query = Member.findById(req.params.id);
    if (!req.admin) query.select(PUBLIC_MEMBER_FIELDS);
    const member = await query;

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      member,
      data: member,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPillarMembers = async (req, res) => {
  try {
    const query = Member.find({ tier: "Samiti Pillar" }).sort({ createdAt: -1 }).limit(12);
    if (!req.admin) query.select(PUBLIC_MEMBER_FIELDS);
    const members = await query;

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


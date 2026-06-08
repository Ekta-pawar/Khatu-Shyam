const Member = require("../models/member.model");
const cloudinaryService = require("./cloudinary.service");
const env = require("../config/env");
const AppError = require("../utils/AppError");

const buildSearchQuery = (query = {}) => {
  const filter = {};

  if (query.search) {
    filter.$text = { $search: query.search };
  }
  if (query.city) filter.city = new RegExp(query.city, "i");
  if (query.state) filter.state = new RegExp(query.state, "i");
  if (query.gender) filter.gender = query.gender;
  if (query.bloodGroup) filter.bloodGroup = query.bloodGroup;
  if (query.isActive !== undefined) filter.isActive = query.isActive === "true";

  return filter;
};

const handleImageUploads = async (files = {}) => {
  const profileImageFile = files.profileImage?.[0];
  const additionalImageFiles = files.additionalImages || [];
  const familyImageFiles = files.familyImages || [];

  if (additionalImageFiles.length > env.upload.maxAdditionalImages) {
    throw new AppError(`A maximum of ${env.upload.maxAdditionalImages} additional images is allowed`, 400);
  }
  if (familyImageFiles.length > env.upload.maxFamilyImages) {
    throw new AppError(`A maximum of ${env.upload.maxFamilyImages} family images is allowed`, 400);
  }

  const [profileImage, additionalImages, familyImages] = await Promise.all([
    profileImageFile ? cloudinaryService.uploadImage(profileImageFile, "members/profile") : Promise.resolve(null),
    cloudinaryService.uploadImages(additionalImageFiles, "members/additional"),
    cloudinaryService.uploadImages(familyImageFiles, "members/family"),
  ]);

  return { profileImage, additionalImages, familyImages };
};

const createMember = async (payload, files, admin) => {
  const { profileImage, additionalImages, familyImages } = await handleImageUploads(files);

  const member = await Member.create({
    ...payload,
    profileImage,
    additionalImages,
    familyDetails: {
      members: payload.familyDetails?.members || [],
      images: familyImages,
    },
    createdBy: admin._id,
  });

  return member;
};

const updateMember = async (id, payload, files, admin) => {
  const member = await Member.findById(id);
  if (!member) throw new AppError("Member not found", 404);

  const { profileImage, additionalImages, familyImages } = await handleImageUploads(files);

  if (profileImage) {
    if (member.profileImage?.publicId) await cloudinaryService.deleteImage(member.profileImage.publicId);
    member.profileImage = profileImage;
  }

  if (additionalImages.length) {
    member.additionalImages = [...member.additionalImages, ...additionalImages];
  }

  if (familyImages.length) {
    member.familyDetails.images = [...member.familyDetails.images, ...familyImages].slice(0, 5);
  }

  const assignableFields = [
    "firstName", "lastName", "fatherName", "motherName", "gender", "phone", "alternatePhone",
    "email", "occupation", "bloodGroup", "address", "city", "state", "country", "pincode", "isActive",
  ];
  assignableFields.forEach((field) => {
    if (payload[field] !== undefined) member[field] = payload[field];
  });

  if (payload.specialDates) {
    member.specialDates = { ...member.specialDates.toObject(), ...payload.specialDates };
  }

  if (payload.familyDetails?.members) {
    member.familyDetails.members = payload.familyDetails.members;
  }

  member.updatedBy = admin._id;
  await member.save();

  return member;
};

const deleteMember = async (id) => {
  const member = await Member.findById(id);
  if (!member) throw new AppError("Member not found", 404);

  const publicIds = [
    member.profileImage?.publicId,
    ...member.additionalImages.map((img) => img.publicId),
    ...member.familyDetails.images.map((img) => img.publicId),
    ...member.familyDetails.members.map((fm) => fm.image?.publicId).filter(Boolean),
  ].filter(Boolean);

  await Promise.all(publicIds.map((publicId) => cloudinaryService.deleteImage(publicId)));
  await member.deleteOne();
};

module.exports = { buildSearchQuery, handleImageUploads, createMember, updateMember, deleteMember };
